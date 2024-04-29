"use server";

import { createChat, getChatByUsersId } from "@/database/chats";
import { searchUsers } from "@/database/user";
import { pusherServer } from "@/lib/pusherServer";

export async function getChatAction(user1Id: string, user2Id: string) {
  let chat = await getChatByUsersId(user1Id, user2Id);
  if (!chat) {
    chat = await createChat(user1Id, user2Id);
  }
  if (!chat) {
    return { error: "Something went wrong!" };
  }
  return { sucess: "Chat was created!", chat: chat };
}

export async function sendMessageAction(chatId: string, text: string) {
  pusherServer.trigger(chatId, "incoming-message", text);
}

export async function searchUsersAction(userId?: string, search: string) {
  if (!userId) return;
  return await searchUsers(userId, search);
}
