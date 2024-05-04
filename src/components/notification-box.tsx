"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { FullNotification } from "@/types";
import { useRouter } from "next/navigation";
import { getChatAction } from "@/actions/chat";
import { useToast } from "./ui/use-toast";
import { markNotificationAsReadedAction } from "@/actions/notification";

type NotificationBoxProps = {
  notifcation: FullNotification;
  closePopover: () => void;
};

function formatTimeDiff(createdAt: Date) {
  const currentTime = new Date();
  const timeDiff = Math.abs(currentTime.getTime() - createdAt.getTime());
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0) {
    if (minutes === 0) {
      return "Just now";
    } else {
      return `${minutes} ${pluralize(minutes, "minute")} ago`;
    }
  } else if (hours === 1) {
    return `1 ${pluralize(hours, "hour")} ago`;
  } else if (hours < 24) {
    return `${hours} ${pluralize(hours, "hour")} ago`;
  } else if (hours < 24 * 7) {
    const days = Math.floor(hours / 24);
    return `${days} ${pluralize(days, "day")} ago`;
  } else if (hours < 24 * 30) {
    const weeks = Math.floor(hours / (24 * 7));
    return `${weeks} ${pluralize(weeks, "week")} ago`;
  } else if (hours < 24 * 365) {
    const months = Math.floor(hours / (24 * 30));
    return `${months} ${pluralize(months, "month")} ago`;
  } else {
    const years = Math.floor(hours / (24 * 365));
    return `${years} ${pluralize(years, "year")} ago`;
  }
}

function pluralize(value: number, unit: string) {
  return value === 1 ? unit : `${unit}s`;
}

export function NotificationBox({
  notifcation,
  closePopover,
}: NotificationBoxProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleClick = async () => {
    const response = await getChatAction(
      notifcation.senderId,
      notifcation.reciverId,
    );
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
    markNotificationAsReadedAction(notifcation.id);
    closePopover();
    router.push(`/chats/${response.chat.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-fit md:w-full flex items-center gap-2 text-left p-2 pr-4 rounded hover:bg-secondary transition-all"
    >
      <Avatar className="h-12  w-12">
        <AvatarImage src={notifcation.sender.image || ""} />
        <AvatarFallback>
          <FaUser className="w-8 h-8" />
        </AvatarFallback>
      </Avatar>
      <div>
        <div>{notifcation.sender.name}</div>
        <div className="text-sm text-foreground pt-1">
          {notifcation.type === "NEW_CHAT"
            ? `New chat created by ${notifcation.sender.name}`
            : `New message sent by ${notifcation.sender.name}`}
        </div>
        <div className="text-xs text-muted-foreground">
          {formatTimeDiff(notifcation.timestamp)}
        </div>
      </div>
    </button>
  );
}
