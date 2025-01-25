import express from "express";
import cors from "cors";
import http, { METHODS } from "http";
import util from "util";
import { off } from "process";
require("dotenv").config();

const app = express();
// set CORS -> use only when necessary
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATH");
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
