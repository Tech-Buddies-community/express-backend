import express from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/authController.js";
import { adminMiddleware, protectedMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// post /api/v1/auth/register
router.post('/register', protectedMiddleware, adminMiddleware, registerUser)

// post /api/v1/auth/login
router.post('/login', loginUser)

// get /api/v1/auth/logout
router.post('/logout', protectedMiddleware, logoutUser)

// get /api/v1/auth/getUser
router.get('/getuser', protectedMiddleware, getCurrentUser)

export default router;