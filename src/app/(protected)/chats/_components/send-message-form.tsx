"use client";

import { sendMessageAction } from "@/actions/chat";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useConversation from "@/hooks/use-conversation";
import { MessageSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type SendMessageFormProps = {
  senderId: string;
};

export function SendMessageForm({ senderId }: SendMessageFormProps) {
  const { conversationId } = useConversation();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof MessageSchema>) => {
    startTransition(async () => {
      await sendMessageAction(conversationId, senderId, values.message);
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex p-2 gap-x-4">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Type your message ..."
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          <Send />
        </Button>
      </form>
    </Form>
  );
}
