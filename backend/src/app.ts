import express, { Application } from "express";
import cors from "cors";
import http, { METHODS } from "http";
import util from "util";
import { off } from "process";
import router from "./routes";
import { rateLimitMiddleware } from "./middlewares/rateLimitMiddleware";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { corsConfig } from "./config/cors.config";
import { config } from "./config/env";
const cluster = require("cluster");
const os = require("os");
require("dotenv").config();

// Security middlewares
const helmet = require("helmet"); // Add security headers
const compression = require("compression"); // Compress responses
const morgan = require("morgan"); // HTTP request logger
const rateLimit = require("express-rate-limit"); // Rate limiting

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security middlewares
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(
      morgan(config.NODE_ENV === "development" ? "dev" : "combined")
    );
    this.app.use(rateLimitMiddleware.standard);

    // CORS
    this.app.use(cors(corsConfig));

    // Body parsing
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Rate limiting for auth routes
    this.app.use("/api/auth", rateLimitMiddleware.auth);
  }

  private initializeRoutes(): void {
    this.app.use("/api", router);

    // Health check route
    this.app.get("/health", (req, res) => {
      res
        .status(200)
        .json({ status: "ok", timestamp: new Date().toISOString() });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware.notFound);
    this.app.use(errorMiddleware.errorHandler);
  }
}

export default new App().app;

if (cluster.isMaster) {
  const numCPUs = os.cpus().length; // Get the number of CPU cores
  console.log(`Master process ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exits (restart crashed workers)
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died, restarting...`);
    cluster.fork();
  });
} else {
  const app = express();

  // Rate limiter configurations
  const standardLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });

  const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 5 login attempts per hour
  });

  // Apply middlewares
  app.use(helmet());
  app.use(compression());
  app.use(morgan("dev")); // Use 'combined' in production
  app.use(standardLimiter); // Apply standard rate limiting to all routes

  // Apply stricter rate limiting to authentication routes
  app.use("/api/auth", authLimiter);

  // Parse URL-encoded bodies (as sent by HTML forms)
  app.use(express.urlencoded({ extended: true }));

  // Sample route
  app.get("/", (req, res) => {
    res.send(`Hello from Worker ${process.pid}`);
  });

  // set CORS -> use only when necessary
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATH"
    );
    res.setHeader("Acess-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
  app.use(cors());
  app.use(express.json());
  //create SQL connectivity
  (async () => {
    await setupDatabase();
    console.log("SQL database running!");
  })();

  const httpServer = http.createServer(app);

  /**
   * @description
   * WebSocket connection = upgraded persistent HTTP connection
   */
  app.use(router);
  app.listen(process.env.PORT || 8080, () => {
    console.log("Express running");
  });

  // Simulating a memory leak / programmer error
  app.get("/crash", (req, res) => {
    throw new Error("Simulated Crash");
  });

  // Graceful Shutdown
  process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception in Worker ${process.pid}:`, err);
    process.exit(1); // Let Cluster Mode restart the process
  });

  process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection in Worker ${process.pid}:`, err);
    process.exit(1);
  });

  // Start the server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on port ${PORT}`);
  });

  // mongoose.connect("mongodb://localhost:27017/furnishare").then(() => {
  //   console.log("Connected to MongoDB");
  // });
}
