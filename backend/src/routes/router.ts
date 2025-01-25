import express from "express";
const router = express.Router();
import * as users_api from "../api/Users";
import * as game_api from "../api/Game";
import * as utils_api from "../api/Utils";

const API_VERSIONING = "/api/v1";

//create user
router.post(API_VERSIONING + "/users", users_api.createUser);

//log in an user
router.post(API_VERSIONING + "/login", users_api.loginUser);

//get one user (with multiple fields as req body -> e.g. fetch by email + clientId)
router.post(API_VERSIONING + "/users/list", users_api.fetchOneUser);

//create game instance
router.post(API_VERSIONING + "/create", game_api.createGame);

// get requests for stats upon useEffect hook session for every player
router.get(API_VERSIONING + "/stats/:id", users_api.getStats);

// update stats
router.post(API_VERSIONING + "/stats", users_api.postStats);

// get /
router.get("/", utils_api.hello);

// get *
router.get("/*", utils_api.error404);

export default router;
