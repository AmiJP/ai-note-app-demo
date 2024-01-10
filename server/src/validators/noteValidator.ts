import { body } from "express-validator";

export const createNoteValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("note").notEmpty().withMessage("Note is required"),
];
