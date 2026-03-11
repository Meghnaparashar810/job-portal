import express, { Router } from "express";
import { userprofile } from "../controller/profilecontroller.js";
import userAuth from "../middleware/Authmiddlewar.js";

const profilerouter = express.Router();

profilerouter.get("/profile",userAuth, userprofile)

export default profilerouter ;