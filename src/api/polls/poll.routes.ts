import { Router } from "express";
import { PollController } from "./poll.controller";
import { validateRequest } from "../../middleware/validate";
import {
  createPollSchema,
  voteSchema,
  reactionSchema,
} from "./poll.validation";

const router = Router();
const pollController = new PollController();

router.get("/", pollController.getPolls);
router.post("/", validateRequest(createPollSchema), pollController.createPoll);
router.get("/:id", pollController.getPoll);
router.post("/:id/vote", validateRequest(voteSchema), pollController.vote);
router.post(
  "/:id/reactions",
  validateRequest(reactionSchema),
  pollController.addReaction
);

export default router;
