"use client";

import { getChatAction } from "@/actions/chat";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { FullChat } from "@/types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

type UserBoxProps = {
  addNewChat: (chat: FullChat) => void;
  clearSearch: () => void;
  authUserId: string;
  user: User;
};

export function UserBox({
  authUserId,
  user,
  addNewChat,
  clearSearch,
}: UserBoxProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleClick = async () => {
    const response = await getChatAction(authUserId, user.id);
    if (response.error) {
      toast({
        variant: "destructive",
        title: response.error,
      });
      return;
    }
    if (!response.chat) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
      });
      return;
    }

    if (response.wasCreated) {
      addNewChat(response.chat);
    }

    clearSearch();
    router.push(`/chats/${response.chat.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-fit md:w-full flex items-center gap-x-2  text-left p-2 pr-4 rounded hover:bg-secondary transition-all"
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
