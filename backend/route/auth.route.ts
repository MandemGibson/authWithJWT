import { Router } from "express";
import { getMe, login, logout, signup } from "../controller/auth.controller";
import { protectRoute } from "../middleware/protectRoute";

const router = Router();

router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
router.post("/signin", login);
router.post("/signout", logout)

export default router;
