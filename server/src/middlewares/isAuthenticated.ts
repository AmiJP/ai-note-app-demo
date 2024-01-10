import { Request, Response, NextFunction } from "express";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.userId) {
    return res.status(401).send({
      message: "Failed to authenticate",
      success: false,
    });
  }
  next();
}
