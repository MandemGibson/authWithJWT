import { config } from "dotenv";
import express, { Request, Response } from "express";
import morgan from "morgan";
import cookieparser from "cookie-parser"
import apiRouter from "./route/api.route";
config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieparser());


app.use("/api/v1", apiRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
