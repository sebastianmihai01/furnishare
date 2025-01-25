import mongoose from "mongoose";
import { config } from "../config/env";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.dbUrl);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
};

import mysql from "mysql2/promise";
require("dotenv").config();

// singleton database connector
class DatabaseConnector {
  static instance: any;

  static async getInstance() {
    if (!DatabaseConnector.instance) {
      try {
        DatabaseConnector.instance = await mysql.createConnection({
          host: process.env.HOST,
          user: process.env.USER,
          password: process.env.PASSWORD,
          database: process.env.DATABASE,
          port: parseInt(process.env.SQLPORT || "3306"),
        });
      } catch (error) {
        console.log(error);
      }
    }
    return DatabaseConnector.instance;
  }
}

//database connection
let connection: any;

export const setupDatabase = async () => {
  connection = await DatabaseConnector.getInstance();
};

export const addUserQuery = async (
  email: string,
  password: string,
  clientId: string
) => {
  await connection.query(
    `INSERT INTO users (email, password, clientId) VALUES ('${email}', '${password}', '${clientId}')`
  );
};

export const getUserQuery = async (email: string) => {
  const data = await connection.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  return data[0][0];
};
