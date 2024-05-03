import { Book } from "@prisma/client";
import { BookCard } from "./book-card";

type BooksContainerProps = {
  books?: Book[];
  canEdit: boolean;
  showLinkToProfile: boolean;
};

export function BooksContainer({
  books,
  canEdit,
  showLinkToProfile,
}: BooksContainerProps) {
  if (!books) return null;

  return (
    <>
      {books.map((item) => {
        return (
          <BookCard
            key={item.id}
            book={item}
            canEdit={canEdit}
            showLinkToProfile={showLinkToProfile}
          />
        );
      })}
    </>
  );
}
