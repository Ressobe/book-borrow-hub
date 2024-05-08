"use server";

import {
  createChat,
  createMessage,
  getChatById,
  getChatByUsersId,
  getChatsByUserId,
} from "@/database/chat";
import { searchUsers, userNotificationsEnabled } from "@/database/user";
import { currentUser } from "@/lib/auth";
import { pusherServer } from "@/lib/pusherServer";
import { sendNotificationAction } from "./notification";
import { getNotificationsByReciverAndSenderId } from "@/database/notification";

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

  const enabledNotifications = await userNotificationsEnabled(user2Id);
  if (wasCreated && enabledNotifications) {
    sendNotificationAction(user1Id, user2Id, "NEW_CHAT");
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

  createMessage(chatId, senderId, content);

  const chat = await getChatById(chatId);
  if (chat) {
    const reciverId = chat.user1Id === senderId ? chat.user2Id : chat.user1Id;
    const notification = await getNotificationsByReciverAndSenderId(
      senderId,
      reciverId,
    );
    if (notification.length === 0) {
      sendNotificationAction(senderId, reciverId, "NEW_MESSAGE");
    }
  }
}

export async function searchUsersAction(userId: string, search: string) {
  return await searchUsers(userId, search);
}
