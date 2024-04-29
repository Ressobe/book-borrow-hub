"use client";

import { sendMessageAction } from "@/actions/chat";
import { Input } from "../ui/input";

type MessageFieldProps = {
  chatId: string;
};

export function MessageField({ chatId }: MessageFieldProps) {
  let input = "";

  const sendMessage = async (text: string) => {
    await sendMessageAction(chatId, text);
  };

  return (
    <div className="flex gap-2">
      type a new message:
      <Input onChange={({ target }) => (input = target.value)} />
      <button onClick={() => sendMessage(input || "")}>send</button>
    </div>
  );
}
