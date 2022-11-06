import express from "express";
import {loginLimiter} from "../middleware/loginLimit.js"
import {login, refresh, logout} from "../controllers/authController.js" 


const router = express.Router();

router.route('/')
.post(loginLimiter, login)
//router.post('/');

router.route('/refresh')
.get(refresh)

router.route('/logout')
.post(logout)


export default router;