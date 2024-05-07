import { z } from 'zod';

export const MessageSchema = z.object({
  content: z.string().min(3, 'Minimum length 3 character'),
  sentAt: z.string().datetime(),
  sender: z.string(),
});

export const ConversationSchema = z.object({
  status: z.string(),
  customer: z.string().min(3, 'Minimum length 3 character'),
  messages: z.array(MessageSchema),
});
