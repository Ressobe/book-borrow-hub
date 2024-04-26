import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { BookEditButton } from "./book-edit-button";
import { BookDeleteButton } from "./book-delete-button";
import { Book } from "@prisma/client";

type BookCardProps = {
  book: Book;
  canEdit: boolean;
};

export function BookCard({ book, canEdit }: BookCardProps) {
  return (
    <Card className="text-center relative">
      <CardHeader className="space-y-4">
        {canEdit ? (
          <div className="absolute h-4 top-1.5 right-2 flex gap-x-2 ">
            <BookEditButton book={book} />
            <BookDeleteButton bookId={book.id} />
          </div>
        ) : null}

        <CardTitle className="pt-4">{book.title}</CardTitle>
        <h2>{book.author}</h2>
        <CardDescription>{book.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {book.coverImage && (
          <Image
            src={book.coverImage}
            width="200"
            height="100"
            alt="book"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </CardContent>
      <CardFooter>
        <div className="text-center w-full">
          <p>{book.publisher}</p>
          <p>{book.publicationYear}</p>
        </div>
      </CardFooter>
    </Card>
  );
}