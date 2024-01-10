import express, { Request, Response, NextFunction } from "express";
import {
  createNote,
  getNotes,
  getNoteDetails,
  updateNote,
  deleteNote,
} from "../controllers/note";
import { createNoteValidator } from "../validators/noteValidator";
import { validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/create",
  createNoteValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, note } = req.body;
      const userId = req.session.userId as number;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({
          message: "Validation error",
          errors: errors.array(),
        });
      }

      const result = await createNote(title, note, userId);

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.session.userId as number;

    const result = await getNotes(userId);

    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.session.userId as number;
    const noteId = Number(req.params.id);

    const result = await getNoteDetails(noteId, userId);

    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.session.userId as number;
    const noteId = Number(req.params.id);
    const { title, note, image } = req.body;

    const noteData = {
      title,
      note,
      image,
    };

    const result = await updateNote(noteId, userId, noteData);

    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.session.userId as number;
      const noteId = Number(req.params.id);

      const result = await deleteNote(noteId, userId);

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router as noteRouter };
