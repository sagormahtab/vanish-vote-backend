import { Request, Response } from "express";
import { CommentService } from "./comment.service";
import { catchAsync } from "../../utils/catchAsync";

const commentService = new CommentService();

export class CommentController {
  getComments = catchAsync(async (req: Request, res: Response) => {
    const comments = await commentService.getComments(req.params.pollId);
    res.json({ data: comments });
  });

  addComment = catchAsync(async (req: Request, res: Response) => {
    const comment = await commentService.addComment(req.params.pollId, req.body);
    res.status(201).json({ data: comment });
  });
} 