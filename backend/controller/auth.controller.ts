import { Request, Response } from "express";
import { generateToken } from "../util/generateToken";
import { hashPassword } from "../util/hashPassword";
import { readUsers, writeToUsers } from "../helpers";
import { User } from "../entity";
import { validatePassword } from "../util/validatePassword";

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await readUsers();

    const { username, password, rememberMe } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please enter both username and password" });
    }

    const user: User = users?.find((user: User) => user.username === username);

    if (!user) {
      return res.status(400).json({ message: "Invalid username" });
    }

    const isPasswordCorrect = await validatePassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }
    console.log(isPasswordCorrect);

    generateToken(user.id, res, rememberMe);

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await readUsers();
    console.log("Users: ", users);

    const { username, email, password, confirmPassword, rememberMe } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (confirmPassword !== password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const userByUsername = users?.find(
      (user: User) => user.username === username
    );
    if (userByUsername) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const userByEmail = users?.find((user: User) => user.email === email);
    if (userByEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
      id: users?.length + 1,
      username,
      password: hashedPassword,
      email,
    };

    users?.push(newUser);
    await writeToUsers(users);

    generateToken(newUser.id, res, rememberMe);
    res.status(201).json({
      message: "Sign up was successful",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Sign out was successful" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ id: user.id, username: user.username, email: user.email });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
