import { Prisma } from "@prisma/client";

export type ChatWithUsers = Prisma.ChatGetPayload<{
  include: {
    messages: true;
    user2: true;
  };
}>;
