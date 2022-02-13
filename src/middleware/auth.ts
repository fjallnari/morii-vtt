import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(' ')[1]; // ! strips the "Bearer" part

  if (!token || ! process.env.JWT_SECRET) {
    return res.status(403).redirect('/?#/auth');
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).redirect('/?#/auth');
  }
  return next();
};

export default verifyToken;
  