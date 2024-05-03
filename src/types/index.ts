import { Prisma } from "@prisma/client";

export type FullChat = Prisma.ChatGetPayload<{
  include: {
    user1: true;
    user2: true;
    messages: true;
  };
}>;

export type TemporaryMessage = {
  content: string;
  chatId: string;
  senderId: string;
  timestamp: Date;
};
