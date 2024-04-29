"use client";

import { pusherClient } from "@/lib/pusherClient";
import { useEffect, useState } from "react";

type MessagesProps = {
  chatId: string;
};

export function Messages({ chatId }: MessagesProps) {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);

  useEffect(() => {
    // subscribe the current room to listen for pusher events.
    pusherClient.subscribe(chatId);

    // when an "incoming-message" event is triggered
    // (shown in the previous code block)
    // make sure to update the messages state in real-time for all users.
    pusherClient.bind("incoming-message", (text: string) => {
      setIncomingMessages((prev) => [...prev, text]);
    });

    // unsubscribe on component unmount.
    return () => {
      pusherClient.unsubscribe(chatId);
    };
  }, []);

  return <div>{incomingMessages?.map((text, i) => <p key={i}>{text}</p>)}</div>;
}
