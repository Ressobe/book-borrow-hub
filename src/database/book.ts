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

export async function searchBooks(
  start: number,
  take: number,
  query?: string,
  category?: BookCategory,
  sort?: string,
) {
  let where = {};

  if (category) {
    where = {
      category,
    };
  }

  let orderBy = {};
  if (sort) {
    orderBy = {
      title: sort,
    };
  }

  const books = await db.book.findMany({
    where,
    include: {
      user: true,
    },
    orderBy,
  });

  if (query) {
    const filtredBooks = books.filter(({ title, author, user }) => {
      const includeTitle = title.toLowerCase().includes(query.toLowerCase());
      const includeAuthor = author.toLowerCase().includes(query.toLowerCase());
      const includeUser = user?.name
        ?.toLowerCase()
        .includes(query.toLowerCase());
      return includeTitle || includeAuthor || includeUser;
    });
    return {
      totalCount: books.length,
      books: filtredBooks.splice(start, take),
    };
  }

  return {
    totalCount: books.length,
    books: books.splice(start, take),
  };
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

export async function getBooks() {
  return await db.book.findMany();
}
