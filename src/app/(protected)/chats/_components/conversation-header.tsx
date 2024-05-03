import { User } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

type ConversationHeaderProps = {
  user: User;
};

export function ConversationHeader({ user }: ConversationHeaderProps) {
  return (
    <header className="flex w-full items-center gap-x-4 border-b border-secondary shadow-lg pb-2">
      <Avatar className="h-16  w-16">
        <AvatarImage src={user.image || ""} />
        <AvatarFallback>
          <FaUser className="w-8 h-8" />
        </AvatarFallback>
      </Avatar>
      <Link href={`/profile/${user.id}`} className="text-xl font-bold">
        {user.name}
      </Link>
    </header>
  );
}
