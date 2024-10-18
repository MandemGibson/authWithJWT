import { Router } from "express";
import router from "./auth.route";

const apiRouter = Router()
apiRouter.use("/auth", router)

export default apiRouter