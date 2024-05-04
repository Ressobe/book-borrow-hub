"use client";

import { Bell, BellDot } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusherClient";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FullNotification } from "@/types";
import { NotificationBox } from "./notification-box";

type NotificationsProps = {
  userId: string;
  initialNotifications: FullNotification[];
};

export function Notifications({
  userId,
  initialNotifications,
}: NotificationsProps) {
  const [incomingNotifications, setIncomingNotifications] = useState<
    FullNotification[]
  >([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    pusherClient.subscribe(`nt${userId}`);

    console.log(`nt${userId}`);

    pusherClient.bind("incoming-notification", (nt: FullNotification) => {
      console.log(nt);
      setIncomingNotifications((prev) => [...prev, nt]);
    });

    return () => {
      pusherClient.unsubscribe(`nt${userId}`);
    };
  }, []);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          {initialNotifications.length > 0 ||
          incomingNotifications.length > 0 ? (
            <BellDot className="w-7 h-7" />
          ) : (
            <Bell className="w-7 h-7" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <ul>
          {initialNotifications.map((notification) => {
            return (
              <NotificationBox
                key={notification.id}
                notifcation={notification}
                closePopover={() => setPopoverOpen(false)}
              />
            );
          })}
          {incomingNotifications.map((notification) => {
            return (
              <NotificationBox
                key={notification.id}
                notifcation={notification}
                closePopover={() => setPopoverOpen(false)}
              />
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
