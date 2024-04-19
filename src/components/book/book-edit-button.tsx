"use client";

import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Book } from "@prisma/client";
import { BookForm } from "./book-form";

type BookEditButtonProps = {
  book: Book;
};

export function BookEditButton({ book }: BookEditButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
      <Button asChild variant="ghost" className="py-0.5 px-2">
        <AlertDialogTrigger>
          <PencilIcon className="w-6 h-6 cursor-pointer" />
        </AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add book</AlertDialogTitle>
        </AlertDialogHeader>
        <BookForm
          category={book.category}
          closeModal={() => setModalOpen(false)}
          book={book}
          type="update"
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
