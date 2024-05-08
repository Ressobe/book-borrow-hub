import { db } from "@/lib/db";
import { NotificationType } from "@prisma/client";

export async function getNotificationsByUserId(userId: string) {
  return await db.notification.findMany({
    where: {
      reciverId: userId,
    },
    include: {
      sender: true,
      reciver: true,
    },
  });
}

export async function createNotification(
  senderId: string,
  reciverId: string,
  type: NotificationType,
) {
  return await db.notification.create({
    data: {
      senderId,
      reciverId,
      type,
    },
    include: {
      sender: true,
      reciver: true,
    },
  });
}

export async function deleteNorification(notificationId: string) {
  return await db.notification.delete({
    where: { id: notificationId },
  });
}

export async function markNotificationAsReaded(notificationId: string) {
  await db.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      isReaded: true,
    },
  });
}

export async function getNotificationsByReciverAndSenderId(
  senderId: string,
  reciverId: string,
) {
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
  );

  return await db.notification.findMany({
    where: {
      senderId,
      reciverId,
      type: "NEW_MESSAGE",
      timestamp: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
  });
}
