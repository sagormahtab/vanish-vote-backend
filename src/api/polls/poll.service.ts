import { PrismaClient, Poll, Option } from "@prisma/client";
import { CreatePollDto } from "../../types";
import { ApiError } from "../../utils/ApiError";

const prisma = new PrismaClient();

export class PollService {
  async createPoll(data: CreatePollDto): Promise<Poll> {
    const expiresAt = new Date(Date.now() + data.expiresIn * 60 * 60 * 1000);

    return prisma.poll.create({
      data: {
        question: data.question,
        expiresAt,
        hideResults: data.hideResults || false,
        isPrivate: data.isPrivate || false,
        options: {
          create: data.options.map((text) => ({ text })),
        },
        reactions: {
          create: {
            trending: 0,
            like: 0,
          },
        },
      },
      include: {
        options: true,
        reactions: true,
      },
    });
  }

  async getPoll(id: string): Promise<Poll> {
    const poll = await prisma.poll.findUnique({
      where: { id },
      include: {
        options: true,
        reactions: true,
        comments: true,
      },
    });

    if (!poll) {
      throw new ApiError("Poll not found", 404);
    }

    if (new Date() > poll.expiresAt) {
      throw new ApiError("Poll has expired", 410);
    }

    // Hide vote counts if results are hidden and poll hasn't expired
    if (poll.hideResults && new Date() < poll.expiresAt) {
      poll.options = poll.options.map((option) => ({
        ...option,
        votes: 0,
      }));
    }

    return poll;
  }

  async vote(pollId: string, optionId: string): Promise<Option> {
    const poll = await this.getPoll(pollId);
    if (!poll) {
      throw new ApiError("Poll not found", 404);
    }

    const option = await prisma.option.update({
      where: { id: optionId },
      data: { votes: { increment: 1 } },
    });

    return option;
  }

  async addReaction(pollId: string, type: "trending" | "like"): Promise<Poll> {
    // Verify poll exists and is valid
    await this.getPoll(pollId);

    return prisma.poll.update({
      where: { id: pollId },
      data: {
        reactions: {
          update: {
            [type]: { increment: 1 },
          },
        },
      },
      include: {
        options: true,
        reactions: true,
        comments: true,
      },
    });
  }

  async getPolls(): Promise<Poll[]> {
    return prisma.poll.findMany({
      where: {
        isPrivate: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        options: true,
        reactions: true,
      },
      orderBy: [
        {
          reactions: {
            trending: "desc",
          },
        },
        {
          reactions: {
            like: "desc",
          },
        },
      ],
    });
  }
}
