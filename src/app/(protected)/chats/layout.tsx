"use client";
import ChatsContextProvider from "@/context/chat-context";
import { getChatsByUserId } from "@/database/chats";
import { currentUser } from "@/lib/auth";

type ChatsLayoutProps = {
  children: React.ReactNode;
};

export default async function ChatsLayoutProps({ children }: ChatsLayoutProps) {
  const user = await currentUser();

  if (!user) return null;
  if (!user.id) return null;

  const chats = await getChatsByUserId(user.id);

  return (
    <ChatsContextProvider userId={user.id} chats={chats}>
      {children}
    </ChatsContextProvider>
  );
}
