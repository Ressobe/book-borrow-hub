"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "./logout-button";
import { BookOpen, MessageCircle, SettingsIcon, User } from "lucide-react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";

type UserButtonProps = {
  className?: string;
};

export function UserButton({ className }: UserButtonProps) {
  const user = useCurrentUser();
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className={className}>
          <AvatarImage src={user.image || ""} />
          <AvatarFallback className="">
            <FaUser className={cn("w-7 h-7")} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-48">
        <DropdownMenuItem asChild className="py-3">
          <Link href="/offerts" className="flex gap-x-2 cursor-pointer">
            <BookOpen className="w-5 h-5" />
            Offerts
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="py-3 w-full">
          <Link
            href={`/profile/${user.id}`}
            className="flex gap-x-2 cursor-pointer"
          >
            <User className="w-5 h-5" />
            My profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="py-3">
          <Link href="/chats" className="flex gap-x-2 cursor-pointer">
            <MessageCircle className="w-5 h-5" />
            Chat
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="py-3">
          <Link href="/settings" className="flex gap-x-2 cursor-pointer">
            <SettingsIcon className="w-5 h-5" />
            Settings
          </Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem className="flex gap-x-2 py-3 w-full cursor-pointer">
            <ExitIcon className="w-5 h-5" /> Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
