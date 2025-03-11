import { Request, Response, NextFunction } from "express";
import { PollService } from "./poll.service";
import { catchAsync } from "../../utils/catchAsync";

export class PollController {
  private pollService: PollService;

  constructor() {
    this.pollService = new PollService();
  }

  createPoll = catchAsync(async (req: Request, res: Response) => {
    const poll = await this.pollService.createPoll(req.body);
    res.status(201).json({ data: poll });
  });

  getPoll = catchAsync(async (req: Request, res: Response) => {
    const poll = await this.pollService.getPoll(req.params.id);
    res.json({ data: poll });
  });

  vote = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { optionId } = req.body;
    const result = await this.pollService.vote(id, optionId);
    res.json({ data: result });
  });

  addReaction = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { type } = req.body;
    const poll = await this.pollService.addReaction(id, type);
    res.json({ data: poll });
  });

  getPolls = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const polls = await this.pollService.getPolls();
      res.json({ data: polls });
    } catch (error) {
      next(error);
    }
  };
}
