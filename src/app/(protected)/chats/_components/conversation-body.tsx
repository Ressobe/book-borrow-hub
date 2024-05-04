"use client";

import { Message } from "@prisma/client";
import { MessageBox } from "./message-box";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusherClient";
import useConversation from "@/hooks/use-conversation";

type ConversationBodyProps = {
  initialMessages: Message[];
  userId: string;
};

export function ConversationBody({
  initialMessages,
  userId,
}: ConversationBodyProps) {
  const { conversationId } = useConversation();
  const [incomingMessages, setIncomingMessages] = useState<Message[]>([]);
  const divRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = () => {
    const { current } = divRef;
    if (current) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollTo();
    pusherClient.subscribe(conversationId);

    pusherClient.bind("incoming-message", (message: Message) => {
      setIncomingMessages((prev) => [...prev, message]);
      scrollTo();
    });

    return () => {
      pusherClient.unsubscribe(conversationId);
    };
  }, []);

  return (
    <ul className="py-4 px-6 space-y-2">
      {initialMessages.map((message) => {
        return (
          <MessageBox
            key={message.id}
            isOwn={message.senderId === userId}
            message={message}
          />
        );
      })}
      {incomingMessages.map((message) => {
        return (
          <MessageBox
            key={message.id}
            isOwn={message.senderId === userId}
            message={message}
          />
        );
      })}
      <div ref={divRef}></div>
    </ul>
  );
}
