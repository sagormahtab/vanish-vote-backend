import { PrismaClient, Comment } from "@prisma/client";
import { CreateCommentDto } from "../../types";
import { ApiError } from "../../utils/ApiError";

const prisma = new PrismaClient();

export class CommentService {
  async getComments(pollId: string): Promise<Comment[]> {
    const poll = await prisma.poll.findUnique({ 
      where: { id: pollId },
      include: { comments: true }
    });
    
    if (!poll) {
      throw new ApiError("Poll not found", 404);
    }

    return poll.comments;
  }

  async addComment(pollId: string, data: CreateCommentDto): Promise<Comment> {
    const poll = await prisma.poll.findUnique({ where: { id: pollId } });
    
    if (!poll) {
      throw new ApiError("Poll not found", 404);
    }

    if (new Date() > poll.expiresAt) {
      throw new ApiError("Poll has expired", 410);
    }

    return prisma.comment.create({
      data: {
        content: data.content,
        pollId
      }
    });
  }
} 