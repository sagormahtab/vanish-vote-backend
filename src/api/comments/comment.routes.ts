import { Router } from "express";
import { CommentController } from "./comment.controller";
import { validateRequest } from "../../middleware/validate";
import { createCommentSchema } from "./comment.validation";

const router = Router({ mergeParams: true });
const commentController = new CommentController();

router.get("/", commentController.getComments);
router.post(
  "/",
  validateRequest(createCommentSchema),
  commentController.addComment
);

export default router;
