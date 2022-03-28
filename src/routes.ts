import { Express, Request, Response } from "express";
import { validateRequest, requiresUser } from "./middleware";
import { createUserHandler } from "./controller/user.controller";
import { createUserSchema, createUserSessionSchema } from "./schema/user.schema";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";

export default function (app: Express) {
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);
 // Login
 app.post(
  "/api/sessions",
  validateRequest(createUserSessionSchema),
  createUserSessionHandler
);

// Get the user's sessions
app.get("/api/sessions", requiresUser, getUserSessionsHandler);


  app.post("/api/posts", (req: Request, res: Response) =>
    res.status(200).json({
      message: `this is a posts /post route`,
    })
  );
  app.get("/api/posts", (req: Request, res: Response) =>
    res.status(200).json({
      message: `this is a posts get route`,
    })
  );
  app.get("/api/posts/{id}", (req: Request, res: Response) =>
    res.status(200).json({
      message: `this is a posts get /api/posts/{id} route`,
    })
  );
  app.put("/api/posts/:postId", (req: Request, res: Response) =>
  res.status(200).json({
    message: `this is a posts put /api/posts/{id} route`,
  }));
  app.delete("/api/posts/:postId", (req: Request, res: Response) =>
  res.status(200).json({
    message: `this is a posts put /api/posts/{id} route`,
  }));
  
}


//for get /api/session
// requiresUser, getUserSessionsHandler

//for post /api/posts
//validateRequest(createUserSchema), createUserHandler;

// app.get(“/api/posts/:postId”, getPostHandler);

//requiresUser, validateRequest(updatePostSchema)], updatePostHandler

// requiresUser, validateRequest(deletePostSchema)], deletePostHandler