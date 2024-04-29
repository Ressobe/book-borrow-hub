import { db } from "@/lib/db";

export async function getChatsByUserId(userId?: string) {
  return await db.chat.findMany({
    where: { user1Id: userId },
    include: {
      messages: true,
      user2: true,
    },
  });
}

export async function getChatByUsersId(user1Id: string, user2Id: string) {
  return await db.chat.findFirst({
    where: {
      user1Id,
      user2Id,
    },
    include: {
      messages: true,
    },
  });
}

export async function createChat(user1Id: string, user2Id: string) {
  try {
    const chat = await db.chat.create({
      data: {
        user1Id,
        user2Id,
      },
      include: {
        messages: true,
      },
    });
    return chat;
  } catch {
    return null;
  }
}
