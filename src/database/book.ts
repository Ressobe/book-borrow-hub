import { db } from "@/lib/db";
import * as z from "zod";
import { BookSchema } from "@/schemas";
import { BookCategory } from "@prisma/client";

export async function createBook(
  userId: string,
  category: BookCategory,
  values: z.infer<typeof BookSchema>,
) {
  try {
    const book = await db.book.create({
      data: {
        userId,
        category,
        ...values,
      },
    });
    return book;
  } catch {
    return null;
  }
}

export async function getBookById(bookId: string) {
  return await db.book.findUnique({ where: { id: bookId } });
}

export async function updateBook(
  bookId: string,
  values: z.infer<typeof BookSchema>,
) {
  try {
    const book = await db.book.update({
      where: { id: bookId },
      data: {
        ...values,
      },
    });
    return book;
  } catch {
    return null;
  }
}

export async function updateBookCover(bookId: string, bookCover: string) {
  try {
    const book = await db.book.update({
      where: { id: bookId },
      data: {
        coverImage: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/books/${bookCover}`,
      },
    });

    return book;
  } catch {
    return null;
  }
}

export async function deleteBook(bookId: string) {
  return await db.book.delete({ where: { id: bookId } });
}
