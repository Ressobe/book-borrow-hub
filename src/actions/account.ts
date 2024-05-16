"use server";

import { deleteAccountByUserId } from "@/database/account";

export async function deleteAccountAction(userId: string) {
  await deleteAccountByUserId(userId);
}
