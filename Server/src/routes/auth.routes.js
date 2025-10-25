import { Router } from "express"
import { verifyJWT } from "../middlewares/authMiddleware.js"
import {
    registerUser,
    loginUser,
    logoutUser,
} from "../controllers/authController.js"

const router = Router();

router.post("/register", registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
