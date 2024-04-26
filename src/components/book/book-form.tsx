"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
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
import {
  createBookAction,
  updateBookAction,
  updateBookCoverAction,
} from "@/actions/book";
import { Book, BookCategory } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { isFileExtensionAllowed } from "@/lib/utils";

type BookFormProps = {
  closeModal: () => void;
  category: BookCategory;
  type: "create" | "update";
  book?: Book;
};

export function BookForm({ closeModal, category, type, book }: BookFormProps) {
  const supabase = createClientComponentClient();
  const user = useCurrentUser();

  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      title: book?.title || "",
      author: book?.author || "",
      publisher: book?.publisher || "",
      publicationYear: book?.publicationYear || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof BookSchema>) => {
    startTransition(async () => {
      if (file && !isFileExtensionAllowed(file.name)) {
        toast({
          variant: "destructive",
          title: "Invalid file format. Please upload a valid image file.",
        });
        return;
      }

      let response = null;
      if (type === "create") {
        response = await createBookAction(user?.id, category, values);
      } else if (type === "update") {
        response = await updateBookAction(book?.id, values);
      }

      if (!response) {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
        });
        return;
      }

      if (response.error) {
        toast({
          variant: "destructive",
          title: response.error,
        });
      }
      if (response.sucess) {
        if (file) {
          if (!isFileExtensionAllowed(file.name)) {
            toast({
              variant: "destructive",
              title: "Invalid file format. Please upload a valid image file.",
            });
            return;
          }

          const timestamp = Date.now();
          const fileName = `${timestamp}-${file.name}`;

          const { data, error } = await supabase.storage
            .from("books")
            .upload(fileName, file);

          if (error) {
            toast({
              variant: "destructive",
              title: "Book cover was not uploaded to the server!",
            });
            return;
          }

          const book = await updateBookCoverAction(
            user?.id,
            response.bookId,
            data.path,
          );
          if (book) {
            toast({
              variant: "default",
              title: response.sucess,
            });
            closeModal();
          }
          return;
        }

        toast({
          variant: "default",
          title: response.sucess,
        });
        closeModal();
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    } else {
      setFileUrl(undefined);
    }
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
            <FormItem>
              <FormLabel>Cover image</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  type="file"
                  onChange={handleChange}
                  className="block border-none w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:hover:cursor-pointer file:text-xs file:bg-muted file:text-foreground hover:file:bg-muted/50 "
                  accept="image/jpeg, image/png, image/gif, image/webp"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
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
