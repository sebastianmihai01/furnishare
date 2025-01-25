import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";
require("dotenv").config();

const redisClient = require("redis").createClient();
const redisGetAsync = promisify(redisClient.get).bind(redisClient);

const cache = async (req: Request, res: Response, next: NextFunction) => {
  let data;
  try {
    const url = req.url;
    data = await redisGetAsync(url);
  } catch (error) {
    console.log(error);
  }

  // cache hit
  if (data) {
    return res.status(200).json(data);
    //no next
  }
};

module.exports = cache;
