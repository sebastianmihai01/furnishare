import cluster from "cluster";
import os from "os";
import mongoose from "mongoose";
import { config } from "./config/env";
import Logger from "./config/logger";
import app from "./app";

class Server {
  private numCPUs = os.cpus().length;

  constructor() {
    this.handleExceptions();
    
    if (cluster.isPrimary) {
      this.initializePrimaryProcess();
    } else {
      this.initializeWorkerProcess();
    }
  }

  private handleExceptions(): void {
    // Handle uncaught exceptions
    process.on("uncaughtException", (error: Error) => {
      Logger.error("Uncaught Exception:", error);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason: any) => {
      Logger.error("Unhandled Rejection:", reason);
      process.exit(1);
    });
  }

  private async initializePrimaryProcess(): Promise<void> {
    Logger.info(`Primary process ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < this.numCPUs; i++) {
      cluster.fork();
    }

    // Handle worker exits
    cluster.on("exit", (worker, code, signal) => {
      Logger.warn(`Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });

    // Graceful shutdown
    process.on("SIGTERM", () => this.handleGracefulShutdown());
    process.on("SIGINT", () => this.handleGracefulShutdown());
  }

  private async initializeWorkerProcess(): Promise<void> {
    try {
      // Connect to MongoDB
      await mongoose.connect(config.DATABASE.URL, {
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
      });
      Logger.info(`MongoDB connected successfully on worker ${process.pid}`);

      // Start Express server
      const server = app.listen(config.PORT, () => {
        Logger.info(
          `Worker ${process.pid} started. Server running on port ${config.PORT}`
        );
      });

      // Handle server errors
      server.on("error", (error: Error) => {
        Logger.error(`Server error on worker ${process.pid}:`, error);
        process.exit(1);
      });
    } catch (error) {
      Logger.error(`Failed to start worker ${process.pid}:`, error);
      process.exit(1);
    }
  }

  private async handleGracefulShutdown(): Promise<void> {
    Logger.info("Received shutdown signal. Starting graceful shutdown...");

    try {
      // Close MongoDB connection
      await mongoose.connection.close();
      Logger.info("MongoDB connection closed.");

      // Exit process
      process.exit(0);
    } catch (error) {
      Logger.error("Error during graceful shutdown:", error);
      process.exit(1);
    }
  }
}

// Initialize server
new Server();
