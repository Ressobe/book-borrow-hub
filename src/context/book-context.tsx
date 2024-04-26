"use client";

import { Book } from "@prisma/client";
import { createContext, useContext, useOptimistic } from "react";

type BooksContextType = {
  optimisticBooks: Book[];
  addOptimisticBook: (book: Book) => void;
};

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined,
);

export default function BooksContextProvider({
  children,
  books,
}: {
  children: React.ReactNode;
  books: Book[];
}) {
  const [optimisticBooks, addOptimisticBook] = useOptimistic(
    books,
    (state: Book[], newBook: Book) => {
      return [...state, newBook];
    },
  );

  return (
    <BooksContext.Provider value={{ optimisticBooks, addOptimisticBook }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooksContext() {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error(
      "useBooksContext must be used within a BooksContextProvider",
    );
  }
  return context;
}
