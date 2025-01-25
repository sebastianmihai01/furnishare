import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateUUID } from "../utils/generate-uuid";
import {
  addUserQuery,
  getUserQuery,
  loginUserQuery as loginUserQuery,
  getStatsQuery,
  postStatsQuery,
} from "../database/connector";
require("dotenv").config();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await loginUser(email, password);
  res.json({ token });
};

export const register = async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  res.status(201).json(user);
};

//@Post
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extract data from the request
    const { email, password } = req.body;

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // generate first-time unique UUID
    const clientId = generateUUID();

    // add user to SQL database
    await addUserQuery(email, hashedPassword, clientId);

    // confirm and send status 200 + clientId back to the client side
    return res.status(200).send({ clientId });
  } catch (error) {
    console.log("Error createUser: " + error);
    return res.status(403).send("Error User Create!");
  }
};

//@Get
export const fetchOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // by email since it is UNIQUE PRIMARY KEY in the SQL database
    const { email } = req.body;
    const query = await getUserQuery(email);
    // no body, we just need the code
    if (query?.clientId) {
      return res.status(200).json({});
    } else {
      return res.status(204).json({});
    }
  } catch (error) {
    console.log("Error getOneUser:" + error);
    res.status(304);
    return res.json({ message: "Duplicate email!" });
  }
};

//@Post
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const data: any = await loginUserQuery(email);

    // compare stored password (salted) with the body password
    const matchingPasswords = await bcrypt.compare(password, data.password);

    if (!data?.clientId || !matchingPasswords) {
      res.status(403).json("Invalid Credentials");
      return;
    }

    //jwt recurrent token with 2h span time
    const token = jwt.sign(
      { clientId: data.clientId, email: data.email },
      process.env.KEY!,
      {
        expiresIn: "2h",
      }
    );

    res.status(200);
    return res.json({ token: token, clientId: data.clientId });
  } catch (error) {
    console.log("Error getOneUser:" + error);
    res.status(304);
    return res.json({ message: "Error fetching user!" });
  }
};

//@Get
export const getStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // '/stats/:id'
    const clientId = req.params.id;
    const data: any = await getStatsQuery(clientId);
    // games = total games
    // wins = won games
    // created = games the user has created manually
    const { games, wins, created } = data;
    res.status(200);
    return res.json({ games, wins, created });
  } catch (error) {
    console.log("Error getStats: " + error);
    return res.status(403).send("Error Get Stats!");
  }
};

//@Post
export const postStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // destructure the body and update sql table

    /**
     * winner = is the current player winner? if so, +1 wins +1 games
     * else, +0 wins, +1 games
     *
     * if winner == undefined => only used for create game variable append
     * */

    const { winner, clientId } = req.body;
    // get the db data for the specific user
    const queryData = await getStatsQuery(clientId);
    let data: any = {};

    // if the post request is not for a created game, but for a game stat update
    if (winner == false || winner == true) {
      // set payload based on current games and wins (+1)
      data =
        winner == true
          ? await postStatsQuery(
              clientId,
              queryData.games + 1,
              queryData.wins + 1,
              queryData.created
            )
          : await postStatsQuery(
              clientId,
              queryData.games + 1,
              queryData.wins,
              queryData.created
            );
    } else {
      // only created game, winner=undefined
      data = await postStatsQuery(
        clientId,
        queryData.games,
        queryData.wins,
        queryData.created + 1
      );
    }

    res.status(200);
    return res.json({
      wins: data.wins,
      games: data.games,
      created: data.created,
    });
  } catch (error) {
    console.log("Error postStats: " + error);
    return res.status(403).send("Error postStats!");
  }
};

export const getSession = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { email, token, user_id } = req.body;
  if (!token || !email || !user_id)
    return res.status(403).send("Invalid Token");
  let user: any = {};
  //user = await connection.query("SELECT * FROM users WHERE clientId = $1",
  //   [user_id])

  try {
    const verifiedJWT = jwt.verify(token, process.env.KEY!);
    if (verifiedJWT && user.rows[0]) {
      console.log("Session HIT");
      return res.status(200).send("Valid Token");
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  console.log("Session MISS");
  return res.status(403).send("Invalid Token");
};
