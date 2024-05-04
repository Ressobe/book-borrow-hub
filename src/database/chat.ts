import { db } from "@/lib/db";

export async function getChatsByUserId(userId?: string) {
  return await db.chat.findMany({
    where: { OR: [{ user1Id: userId }, { user2Id: userId }] },
    include: {
      user1: true,
      user2: true,
      messages: true,
    },
  });
}

export async function getChatById(chatId: string) {
  return await db.chat.findUnique({
    where: { id: chatId },
    include: {
      user1: true,
      user2: true,
      messages: true,
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
      user1: true,
      user2: true,
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
        user1: true,
        user2: true,
        messages: true,
      },
    });
    return chat;
  } catch {
    return null;
  }
}

export async function createMessage(
  chatId: string,
  senderId: string,
  content: string,
) {
  try {
    const message = await db.message.create({
      data: {
        chatId: chatId,
        senderId: senderId,
        content: content,
      },
    });
    return message;
  } catch {
    return null;
  }
}
