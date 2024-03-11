import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const isValidId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (ObjectId.isValid(req.params.superHeroId)) {
    next();
  } else {
    res.status(500).json({ error: "Not valid ObjectId" });
  }
};
