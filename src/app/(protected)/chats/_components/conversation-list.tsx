"use client";

import useConversation from "@/hooks/use-conversation";
import { FullChat } from "@/types";
import { useEffect, useRef, useState } from "react";
import { ConversationBox } from "./conversation-box";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { searchUsersAction } from "@/actions/chat";
import { User } from "@prisma/client";
import { UserBox } from "./user-box";
import { ScrollArea } from "@/components/ui/scroll-area";

type ConversationListProps = {
  initialItems: FullChat[];
  userId: string;
};

export function ConversationList({
  initialItems,
  userId,
}: ConversationListProps) {
  const [items, setItems] = useState(initialItems);
  const { conversationId } = useConversation();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debounedSearch = useDebounce(search);
  const [users, setUsers] = useState<User[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);

      const users = await searchUsersAction(userId, debounedSearch);
      setUsers(users);

      setLoading(false);
    };
    if (debounedSearch === "") {
      setUsers([]);
    } else {
      loadUsers();
    }
  }, [debounedSearch]);

  const addNewChat = (chat: FullChat) => {
    setItems((prev) => [...prev, chat]);
  };

  const clearInput = () => {
    setSearch("");
    const { current } = inputRef;
    if (current) {
      current.value = "";
    }
  };

  return (
    <aside className="flex flex-col gap-y-4 p-4">
      <form className="flex-1 sm:flex-initial">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search users..."
            className="pl-10 text-md sm:w-[100px] md:w-[200px] lg:w-[300px]"
            ref={inputRef}
          />
        </div>
      </form>
      <ScrollArea>
        {search === "" ? (
          <ul className="space-y-4">
            {items.map((chat) => {
              return (
                <ConversationBox
                  userId={userId}
                  key={chat.id}
                  conversation={chat}
                  selected={chat.id === conversationId}
                />
              );
            })}
          </ul>
        ) : (
          <>
            {loading && <div>Loading ....</div>}

            <ul className="space-y-4">
              {users.map((user) => {
                return (
                  <UserBox
                    addNewChat={addNewChat}
                    clearSearch={clearInput}
                    authUserId={userId}
                    key={user.id}
                    user={user}
                  />
                );
              })}
            </ul>
          </>
        )}
      </ScrollArea>
    </aside>
  );
}
