import { ChatWithUsers } from "@/types";
import { createContext, useContext, useState } from "react";

type ChatContextType = {
  allChats: ChatWithUsers[];
  selectedChat: string;
  userId: string;
  addChat: (chat: ChatWithUsers) => void;
};

export const ChatsContext = createContext<ChatContextType | undefined>(
  undefined,
);

export default function ChatsContextProvider({
  children,
  chats,
}: {
  children: React.ReactNode;
  chats: ChatWithUsers[];
  userId: string;
}) {
  const [allChats, setChats] = useState(chats);
  const [selectedChat, setSelectedChat] = useState("");

  const addChat = (chat: ChatWithUsers) => {
    setChats((prev) => [...prev, chat]);
  };

  return (
    <ChatsContext.Provider value={{ allChats, addChat, userId, selectedChat }}>
      {children}
    </ChatsContext.Provider>
  );
}

export function useChatsContext() {
  const context = useContext(ChatsContext);
  if (context === undefined) {
    throw new Error(
      "useChatsContext must be used within a ChatsContextProvider",
    );
  }
  return context;
}
