import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  console.log('I did smth!');
  const token =
    req.body.token || req.query.token || req.headers["x-auth-token"];

  if (!token || ! process.env.JWT_SECRET) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
  