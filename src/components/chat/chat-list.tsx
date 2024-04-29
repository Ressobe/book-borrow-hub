"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Chat, User } from "@prisma/client";
import { getChatAction, searchUsersAction } from "@/actions/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import { ChatWithUsers } from "@/types";
import { cn } from "@/lib/utils";

type ChatsListProps = {
  chats: ChatWithUsers[];
  user1Id: string;
  currentChatId?: string;
};

export function ChatsList({ chats, user1Id, currentChatId }: ChatsListProps) {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debounedSearch = useDebounce(search);
  const [users, setUsers] = useState<User[]>([]);

  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);

      const users = await searchUsersAction(user1Id, debounedSearch);
      setUsers(users);

      setLoading(false);
    };
    if (debounedSearch === "") {
      setUsers([]);
    } else {
      loadUsers();
    }
  }, [debounedSearch]);

  const handleSelectedUser = async (user2Id: string) => {
    const chat = await getChatAction(user1Id, user2Id);
    if (chat.error) {
      toast({
        variant: "destructive",
        title: chat.error,
      });
      return;
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <aside className="flex flex-col gap-4">
      <section>
        <h1 className="font-bold text-2xl pb-2">Chats</h1>
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chats..."
              className="pl-10 text-md sm:w-[300px] md:w-[200px] lg:w-[300px]"
              ref={inputRef}
            />
          </div>
        </form>
      </section>
      {loading && <div>Loading...</div>}
      <ul className="space-y-6">
        {!loading &&
          users.map((user) => {
            return (
              <li key={user.id}>
                <button
                  onClick={() => handleSelectedUser(user.id)}
                  className="w-full flex items-center gap-x-4 text-left p-2 rounded hover:bg-secondary transition-all "
                >
                  <Avatar className="h-12  w-12">
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback>
                      <FaUser className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{user.name}</div>
                    <span className="text-sm text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
      </ul>
      {chats.map(({ id, user2 }) => {
        return (
          <button
            key={user2.id}
            onClick={() => handleSelectedUser(user2.id)}
            className={cn(
              "w-full flex items-center gap-x-4 text-left p-2 rounded hover:bg-secondary transition-all",
              id === currentChatId ? "bg-secondary" : "",
            )}
          >
            <Avatar className="h-12  w-12">
              <AvatarImage src={user2.image || ""} />
              <AvatarFallback>
                <FaUser className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div>{user2.name}</div>
              <span className="text-sm text-muted-foreground">
                {user2.email}
              </span>
            </div>
          </button>
        );
      })}
    </aside>
  );
}

function ChatButton() {}
