"use client";

import { deleteBookAction } from "@/actions/book";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type BookDeleteButtonProps = {
  bookId: string;
};

export function BookDeleteButton({ bookId }: BookDeleteButtonProps) {
  const { toast } = useToast();

  const handleClick = async () => {
    toast({
      variant: "default",
      title: "Book was deleted sucesful!",
    });
    await deleteBookAction(bookId);
  };
  return (
    <AlertDialog>
      <Button asChild variant="ghost" className="py-0.5 px-2">
        <AlertDialogTrigger>
          <Trash className="w-6 h-6 cursor-pointer" />
        </AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            book.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={handleClick}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
