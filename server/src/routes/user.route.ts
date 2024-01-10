import express, { NextFunction, Request, Response } from "express";
import {
  registerUser,
  getUser,
  checkUserCredentials,
} from "../controllers/user";
import { validationResult } from "express-validator";
import {
  registerUserValidator,
  loginUserValidator,
} from "../validators/userValidator";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.post(
  "/register",
  registerUserValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send({
          message: "Validation error",
          errors: errors.array(),
        });
      }

      const result = await registerUser(name, email, password);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  loginUserValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send({
          message: "Validation error",
          errors: errors.array(),
        });
      }

      const user = await checkUserCredentials(email, password);

      if (!user) {
        return res.status(400).send({
          message: "Invalid credentials",
          success: false,
        });
      }

      req.session.userId = user.id;

      res.send({
        message: "Login successful",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/logout", isAuthenticated, (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({
        message: "Logout failed",
        success: false,
      });
    }
  });

  res.send({
    message: "Logout successful",
    success: true,
  });
});

router.get("/account", isAuthenticated, async (req: Request, res: Response) => {
  const userId = req.session.userId;
  const user = await getUser(userId);
  res.send(user);
});

export { router as userRouter };
