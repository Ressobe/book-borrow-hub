"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { getChatAction } from "@/actions/chat";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

type SendMessageButtonProps = {
  authUserId: string;
  profileUserId: string;
};

export function SendMessageButton({
  authUserId,
  profileUserId,
}: SendMessageButtonProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleClick = async () => {
    const response = await getChatAction(authUserId, profileUserId);
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

    router.push(`/chats/${response.chat.id}`);
  };

  return (
    <Button
      onClick={handleClick}
      variant="link"
      className="flex px-0 items-center gap-x-4"
    >
      <MessageCircle className="w-10 h-10" />
      Send a message
    </Button>
  );
}
