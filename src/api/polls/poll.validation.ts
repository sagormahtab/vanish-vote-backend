import { z } from 'zod';

export const createPollSchema = z.object({
  body: z.object({
    question: z.string().min(1),
    options: z.array(z.string())
      .min(2)
      .max(10)
      .refine(
        (options) => 
          options.length === 2 && 
          options.every(opt => ['Yes', 'No'].includes(opt)) || 
          options.length >= 2, 
        {
          message: "Poll must be either Yes/No or have multiple options"
        }
      ),
    expiresIn: z.number()
      .positive()
      .refine(hours => [1, 12, 24].includes(hours), {
        message: "Expiry time must be 1, 12, or 24 hours"
      }),
    hideResults: z.boolean().optional(),
    isPrivate: z.boolean().optional()
  })
});

export const voteSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    optionId: z.string()
  })
});

export const reactionSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    type: z.enum(['trending', 'like'])
  })
}); 