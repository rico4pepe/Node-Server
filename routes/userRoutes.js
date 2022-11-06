import express from "express";

import {getAllUsers, createNewUser, signin, googleSignIn, updateUser} from "../controllers/userController.js";
import {verifyJwt} from "../middleware/verifyJwt.js"


const router = express.Router();

router.use(verifyJwt)

router.post("/signin", signin);
router.post("/googlesignin", googleSignIn);
router.post("/signup", createNewUser)
router.get("/allusers", getAllUsers)
router.get("/updateuser", updateUser)


  

export default router;