import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {User,AuthenticatedUser} from '../types'

const secret = process.env.JWT_SECRET || "";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, secret) as AuthenticatedUser;
    req.user = decoded;
    if (req.query.type == "verify") {
      if (decoded) {
        res.status(200).json({authenticated:true,user: decoded});
      } else {
        res.status(400).json(false);
      }
      return;
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({ message: `Invalid token. ${error}` });
  }
};

export default auth;
