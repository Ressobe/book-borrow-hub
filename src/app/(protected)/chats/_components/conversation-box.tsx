"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { FullChat } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaUser } from "react-icons/fa";

type ConversationBoxProps = {
  conversation: FullChat;
  selected: boolean;
  userId: string;
};

export function ConversationBox({
  conversation,
  selected,
  userId,
}: ConversationBoxProps) {
  const router = useRouter();
  const user =
    conversation.user1.id === userId ? conversation.user2 : conversation.user1;

  const handleClick = useCallback(() => {
    router.push(`/chats/${conversation.id}`);
  }, [conversation, router]);

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full flex items-center gap-x-4 text-left p-2 rounded hover:bg-secondary transition-all ",
        selected ? "bg-secondary" : "",
      )}
    >
      <Avatar className="h-12  w-12">
        <AvatarImage src={user.image || ""} />
        <AvatarFallback>
          <FaUser className="w-8 h-8" />
        </AvatarFallback>
      </Avatar>
      <div className="hidden md:block">
        <div>{user.name}</div>
        <span className="text-sm text-muted-foreground">{user.email}</span>
      </div>
    </button>
  );
}
