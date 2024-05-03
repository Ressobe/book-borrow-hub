"use server";

import {
  createChat,
  createMessage,
  getChatByUsersId,
  getChatsByUserId,
} from "@/database/chats";
import { searchUsers } from "@/database/user";
import { currentUser } from "@/lib/auth";
import { pusherServer } from "@/lib/pusherServer";

export async function getConversationsAction() {
  const user = await currentUser();
  if (!user) return [];

  const conversations = await getChatsByUserId(user.id);
  return conversations;
}

export async function getChatAction(user1Id: string, user2Id: string) {
  let chat = await getChatByUsersId(user1Id, user2Id);
  let wasCreated = false;
  if (!chat) {
    chat = await createChat(user1Id, user2Id);
    wasCreated = true;
  }
  if (!chat) {
    return { error: "Something went wrong!" };
  }
  return { sucess: "Chat was created!", chat: chat, wasCreated };
}

export async function sendMessageAction(
  chatId: string,
  senderId: string,
  content: string,
) {
  const message = {
    content: content,
    chatId: chatId,
    senderId: senderId,
    timestamp: new Date(),
  };

  pusherServer.trigger(chatId, "incoming-message", message);

  await createMessage(chatId, senderId, content);
}

export async function searchUsersAction(userId: string, search: string) {
  return await searchUsers(userId, search);
}
