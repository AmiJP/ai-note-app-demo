import { body } from "express-validator";

export const registerUserValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
];

export const loginUserValidator = [
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
];
