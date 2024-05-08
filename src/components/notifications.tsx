"use client";

import { Bell, BellDot, BellOff } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useMemo, useState } from "react";
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

  const uniqueNotifications = useMemo(() => {
    const allNotifications = [
      ...initialNotifications,
      ...incomingNotifications,
    ];
    const uniqueIds = new Set(
      allNotifications.map((notification) => notification.id),
    );
    return allNotifications.filter((notification) =>
      uniqueIds.has(notification.id),
    );
  }, [initialNotifications, incomingNotifications]);

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
        <ul className="space-y-3">
          {initialNotifications.length === 0 &&
          incomingNotifications.length === 0 ? (
            <div className="flex flex-col justify-center items-center gap-3">
              <BellOff className="w-8 h-8" />
              <span className="text-center">
                <div className="font-bold text-lg">No notification</div>
                <div className="text-sm text-muted-foreground">
                  You don't have notification
                </div>
              </span>
            </div>
          ) : (
            <>
              {uniqueNotifications.map((notification) => {
                return (
                  <NotificationBox
                    key={notification.id}
                    notifcation={notification}
                    closePopover={() => setPopoverOpen(false)}
                  />
                );
              })}
            </>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
