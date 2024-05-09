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
import { Book, User } from "@prisma/client";
import Link from "next/link";
import { ImageIcon, UserIcon } from "lucide-react";

type BookCardProps = {
  book: Book;
  canEdit: boolean;
  user: User | null;
  showLinkToProfile: boolean;
};

export function BookCard({
  book,
  canEdit,
  showLinkToProfile,
  user,
}: BookCardProps) {
  return (
    <Card className="text-center relative flex flex-col h-full">
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
      <CardContent className="flex items-center justify-center flex-1">
        <div className="w-full h-full flex items-center justify-center">
          {book.coverImage ? (
            <Image src={book.coverImage} width="200" height="100" alt="book" />
          ) : (
            <ImageIcon width="200px" height="300px" />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-center w-full">
          <p>{book.publisher}</p>
          <p>{book.publicationYear}</p>
          {showLinkToProfile && (
            <Link
              href={`/profile/${book.userId}`}
              className="text-sm flex pt-4 items-center justify-center gap-x-2 hover:underline"
            >
              <UserIcon className="w-6 h-6" />
              <span>{user?.name}</span>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
