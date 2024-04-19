"use server";

import {
  createBook,
  deleteBook,
  getBookById,
  updateBook,
  updateBookCover,
} from "@/database/book";
import { BookCategory } from "@prisma/client";
import { BookSchema } from "@/schemas";
import * as z from "zod";
import { getUserById } from "@/database/user";
import { revalidatePath } from "next/cache";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function createBookAction(
  userId: string | undefined,
  category: BookCategory,
  values: z.infer<typeof BookSchema>,
) {
  if (!userId) {
    return { error: "User not authorized! " };
  }

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return { error: "User does not exist!" };
  }

  const book = await createBook(userId, category, values);
  if (book) {
    revalidatePath(`/profile/${userId}`);
    return { sucess: "Book was created sucessful!", bookId: book.id };
  }
  return { error: "Something went wrong!" };
}

export async function updateBookCoverAction(
  userId: string | undefined,
  bookId: string,
  bookCover: string,
) {
  if (!userId) {
    return { error: "Something went wrong!" };
  }

  const existingBook = await getBookById(bookId);
  if (!existingBook) {
    return { error: "Something went wrong!" };
  }

  if (existingBook.coverImage) {
    const splited = existingBook.coverImage.split("/");
    const imgSrc = splited[splited.length - 1];
    removeBookCover(imgSrc);
  }

  const book = await updateBookCover(bookId, bookCover);
  if (book) {
    revalidatePath(`/profile/${userId}`);
    return { sucess: "Book cover image was updated sucessful!" };
  }

  return { error: "Something went wrong!" };
}

export async function updateBookAction(
  bookId: string | undefined,
  values: z.infer<typeof BookSchema>,
) {
  if (!bookId) {
    return { error: "Something went wrong!" };
  }

  const existingBook = await getBookById(bookId);
  if (!existingBook) {
    return { error: "Something went wrong!" };
  }

  if (existingBook.coverImage) {
    removeBookCover(existingBook.id);
  }

  const book = await updateBook(bookId, values);

  if (book) {
    revalidatePath(`/profile/${book.userId}`);
    return { sucess: "Book was updated sucessful!", bookId: bookId };
  }
  return { error: "Something went wrong!" };
}

function removeBookCover(coverImage: string) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  supabase.storage.from("books").remove([`${coverImage}`]);
}

export async function deleteBookAction(bookId: string) {
  const existingBook = await getBookById(bookId);
  if (!existingBook) {
    return { error: "Something went wrong!" };
  }

  if (existingBook.coverImage) {
    const splited = existingBook.coverImage.split("/");
    const imgSrc = splited[splited.length - 1];
    removeBookCover(imgSrc);
  }

  const book = await deleteBook(bookId);
  revalidatePath(`/profile/${book.userId}`);
}
