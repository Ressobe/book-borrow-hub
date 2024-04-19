"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookCategory } from "@prisma/client";

type BookAddButtonProps = {
  bookCategory: BookCategory;
};

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BookForm } from "@/components/book/book-form";

export function BookAddButton({ bookCategory }: BookAddButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
      <Button asChild variant="ghost">
        <AlertDialogTrigger>
          <CirclePlus className="w-8 h-8 cursor-pointer" />
        </AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">Add book</AlertDialogTitle>
        </AlertDialogHeader>
        <span className="text-sm text-muted-foreground text-center">
          {bookCategory === "LOOKING_FOR"
            ? "Looking for category"
            : "I want to trade category"}
        </span>
        <BookForm
          type="create"
          closeModal={() => setModalOpen(false)}
          category={bookCategory}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
