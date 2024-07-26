import { Request, Response } from "express";
import crypto from "crypto";
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
import { User } from "../../model";
import authService from "../../services/v1/auth.service";
import authenticateToken from "../../helper/jwt.helper";

const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");

  // Hashing salt and password with 100 iterations, 64 length and sha512 digest
  return crypto.pbkdf2Sync(password, salt, 100, 64, `sha512`).toString(`hex`);
};

const register = async (req: Request, res: Response) => {
  try {
    const { email, userName, password, confirmPassword } = req.body as {
      email: string;
      userName: string;
      password: string;
      confirmPassword: string;
    };
    if (!email || !userName || !password || !confirmPassword) {
      return res.status(422).json({
        message:
          "The fields email, userName, password, confirmPassword are required",
      });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirmPassword not match" });
    }
    const alreadyExist = await User.findOne({ where: { email: email } });
    if (alreadyExist) {
      return res.status(303).json({ message: "Email address already exits" });
    } else {
      const alreadyUserNameExist = await User.findOne({
        where: { username: userName },
      });
      if (alreadyUserNameExist) {
        return res.status(303).json({ message: "Username already exits" });
      } else {
        const userInput = {
          username: userName,
          email: email,
          password: await hashPassword(password),
          access_token: "",
          refresh_token: "",
        };
        const userCreated = await authService.registerService(userInput);
        return res.status(201).json({
          data: {
            userCreated,
          },
          message: "Register Successfully.",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Something was wrong" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ message: "The fields email, password are required" });
    }
    // Find user by email
    let user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Your email address is not valid." });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Your password is not valid." });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, "abcdefghijklmnopqrstuv", {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
      { userId: user.id },
      "abcdefghijklmnopqrstuv",
      { expiresIn: "3d" }
    );
    user.access_token = token;
    user.refresh_token = refreshToken;
    User.update(
      { access_token: token, refresh_token: refreshToken },
      {
        where: {
          id: user.id,
        },
      }
    );
    return res.status(200).json({
      data: {
        user,
      },
      message: "Login Successfully.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something was wrong" });
  }
};

const getAccesstoken = async (req: Request, res: Response) => {
  try {
    if (!req.params.refreshToken) {
      return res
        .status(422)
        .json({ message: "The fields refresh_token are required" });
    }
    // Find user by email
    let user = await User.findOne({
      where: {
        refresh_token: req.params.refreshToken,
      },
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Your refresh_token is not valid." });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, "abcdefghijklmnopqrstuv", {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
      { userId: user.id },
      "abcdefghijklmnopqrstuv",
      { expiresIn: "3d" }
    );
    user.access_token = token;
    user.refresh_token = refreshToken;
    User.update(
      { access_token: token, refresh_token: refreshToken },
      {
        where: {
          id: user.id,
        },
      }
    );
    return res.status(200).json({
      data: {
        user,
      },
      message: "Access Token Get Successfully.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something was wrong" });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const authtoken = req.headers.authorization;
    const token = authtoken && authtoken.split(" ")[1];
    if (token) {
      const userId = authenticateToken.getIDFromToken(token);
      console.log(userId)
      // Find user by email
      let user = await User.findOne({
        where: {
          id: userId.userId,
        },
      });
      if (!user) {
        return res.status(401).json({ message: "User is not valid." });
      }
      return res.status(200).json({
        data: {
          user,
        },
        message: "User Details Successfully.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something was wrong" });
  }
};

export default { register, login, getAccesstoken, getById };
