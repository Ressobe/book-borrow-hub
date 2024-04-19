"use client";

import { Book } from "@prisma/client";
import { BookCard } from "./book-card";

type BooksContainerProps = {
  books?: Book[];
  canEdit: boolean;
};

export function BooksContainer({ books, canEdit }: BooksContainerProps) {
  if (!books) return null;

  return (
    <>
      {books.map((item) => {
        return <BookCard key={item.id} book={item} canEdit={canEdit} />;
      })}
    </>
  );
}
