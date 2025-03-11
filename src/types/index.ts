export interface CreatePollDto {
  question: string;
  options: string[];
  expiresIn: number; // hours
  hideResults?: boolean;
  isPrivate?: boolean;
}

export interface VoteDto {
  optionId: string;
}

export interface ReactionDto {
  type: 'trending' | 'like';
}

export interface CreateCommentDto {
  content: string;
}

export interface ApiError extends Error {
  statusCode: number;
} 