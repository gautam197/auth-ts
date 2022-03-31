import { Request, Response, Router } from "express";
import { validateRequest, requiresUser } from "../middleware";
import { createUserHandler } from "../controller/user.controller";
import {
  createUserSchema,
  createUserSessionSchema,
} from "../schema/user.schema";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "../controller/session.controller";

const router = Router();

router.post("/users", validateRequest(createUserSchema), createUserHandler);
// Login
router.post(
  "/sessions",
  validateRequest(createUserSessionSchema),
  createUserSessionHandler
);

// Get the user's sessions
router.get("/sessions", requiresUser, getUserSessionsHandler);

router.post("/posts", (req: Request, res: Response) =>
  res.status(200).json({
    message: `this is a posts /post route`,
  })
);
router.get("/posts", (req: Request, res: Response) =>
  res.status(200).json({
    message: `this is a posts get route`,
  })
);
router.get("/posts/{id}", (req: Request, res: Response) =>
  res.status(200).json({
    message: `this is a posts get /api/posts/{id} route`,
  })
);
router.put("/posts/:postId", (req: Request, res: Response) =>
  res.status(200).json({
    message: `this is a posts put /api/posts/{id} route`,
  })
);
router.delete("/posts/:postId", (req: Request, res: Response) =>
  res.status(200).json({
    message: `this is a posts put /api/posts/{id} route`,
  })
);

export default router;
