"use client";

import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BookSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateBookAction } from "@/actions/book";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Book } from "@prisma/client";

type BookFormProps = {
  closeModal: () => void;
  book: Book;
};

export function BookEditForm({ closeModal, book }: BookFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      title: book.title,
      author: book.author,
      publisher: book.publisher || "",
      publicationYear: book.publicationYear || 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof BookSchema>) => {
    startTransition(async () => {
      const response = await updateBookAction(book.id, values);
      if (response.error) {
        toast({
          variant: "destructive",
          title: response.error,
        });
      }
      if (response.sucess) {
        toast({
          variant: "default",
          title: response.sucess,
        });
        closeModal();
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Build second brain"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Tiago Forte"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publicationYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publication year</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="1999"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publisher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publsher</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Profile Books"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>Cover image</FormLabel>
            <Input
              disabled={isPending}
              type="file"
              className="block border-none w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:hover:cursor-pointer file:text-xs file:bg-muted file:text-foreground hover:file:bg-muted/50 "
            />
          </div>
          <div className="flex w-full items-center justify-end gap-x-6">
            <Button
              onClick={closeModal}
              variant="secondary"
              type="button"
              className="px-6"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              type="submit"
              className="px-6"
              disabled={isPending}
            >
              Add
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
