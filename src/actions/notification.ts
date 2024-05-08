"use server";

import {
  createNotification,
  markNotificationAsReaded,
} from "@/database/notification";
import { pusherServer } from "@/lib/pusherServer";
import { NotificationType } from "@prisma/client";

export async function sendNotificationAction(
  senderId: string,
  reciverId: string,
  type: NotificationType,
) {
  const notification = await createNotification(senderId, reciverId, type);
  pusherServer.trigger(`nt${reciverId}`, "incoming-notification", notification);
}

export async function markNotificationAsReadedAction(notificationId: string) {
  await markNotificationAsReaded(notificationId);
}
