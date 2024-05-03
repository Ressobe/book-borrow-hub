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
import { useForm } from "react-hook-form";
import * as z from "zod";

type SendMessageFormProps = {
  senderId: string;
};

export function SendMessageForm({ senderId }: SendMessageFormProps) {
  const { conversationId } = useConversation();
  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof MessageSchema>) => {
    await sendMessageAction(conversationId, senderId, values.message);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-x-4">
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>
          <Send />
        </Button>
      </form>
    </Form>
  );
}
