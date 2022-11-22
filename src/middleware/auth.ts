import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

declare global {
  namespace Express {
    interface User {
      _id: ObjectId,
      username: string
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(' ')[1]; // ! strips the "Bearer" part

  if (! token || ! process.env.JWT_SECRET) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const jwtObj = jwt.verify(token, process.env.JWT_SECRET);
    // don't think this should ever happen but alas types are screaming otherwise
    if (typeof jwtObj === "string") {
      return res.status(401).send("Invalid token"); 
    }

    req.user = Object.assign(jwtObj?.user, { _id: new ObjectId(jwtObj?.user._id)});
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
  return next();
};

export default verifyToken;
  