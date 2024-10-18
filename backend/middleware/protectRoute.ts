import { NextFunction, Request, Response } from "express";
import { readUsers } from "../helpers";
import { User } from "../entity";
import { verifyToken } from "../util/verifyToken";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token found" });
    }
    const decoded = await verifyToken(token) as JwtPayload;
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    const users: User[] = await readUsers();

    const user = users?.find((user: User) => user.id === decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - No user found" });
    }
    req.user = user;

    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
