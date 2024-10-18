import jwt from "jsonwebtoken";

export const verifyToken = async (token: string) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) throw new Error("Secret key is required");
    const decoded = await jwt.verify(token, secretKey);
    return decoded;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
