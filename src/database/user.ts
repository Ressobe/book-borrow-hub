import { db } from "@/lib/db";
import * as z from "zod";
import { SettingsSchema } from "@/schemas";

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({ where: { email } });
}

export async function getUserById(userId?: string) {
  return await db.user.findUnique({ where: { id: userId } });
}

export async function getUserBooksByUserId(userId: string) {
  const user = await db.user.findFirst({
    where: { id: userId },
    include: {
      books: true,
    },
  });
  return user?.books;
}

export async function createUser(
  email?: string,
  name?: string,
  password?: string,
) {
  return await db.user.create({
    data: {
      email,
      name,
      password,
    },
  });
}

export async function verifyUser(userId: string, email: string) {
  await db.user.update({
    where: { id: userId },
    data: {
      email: email,
      emailVerified: new Date(),
    },
  });
}

export async function updateUserPassword(userId: string, newPassword: string) {
  await db.user.update({
    where: { id: userId },
    data: {
      password: newPassword,
    },
  });
}

export async function updateUserImage(userId: string, newImage: string) {
  await db.user.update({
    where: { id: userId },
    data: {
      image: newImage,
    },
  });
}

export async function updateUserAvatar(userId: string, newImage: string) {
  try {
    const user = await db.user.update({
      where: { id: userId },
      data: {
        image: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${newImage}`,
      },
    });
    return user;
  } catch {
    return null;
  }
}

export async function updateUser(
  userId: string,
  values: z.infer<typeof SettingsSchema>,
) {
  await db.user.update({
    where: { id: userId },
    data: {
      ...values,
    },
  });
}

export async function searchUsers(userId: string, search: string) {
  const users = await db.user.findMany();
  return users.filter(
    (user) => user.name?.includes(search) && user.id !== userId,
  );
}
