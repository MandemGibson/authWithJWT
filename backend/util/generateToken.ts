import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (
  userId: number,
  res: Response,
  rememberMe: boolean
) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) throw new Error("Secret key is required");

  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: "2m",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 5 * 60 * 1000,
    sameSite: "strict",
    secure: true
  });

  if (rememberMe) {
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });
  }

  return token;
};
