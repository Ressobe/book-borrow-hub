"use client";

import { MessageField } from "@/components/chat/message-field";
import { Messages } from "@/components/chat/messages";
import { ChatsList } from "@/components/chat/chat-list";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useChatsContext } from "@/context/chat-context";
import { MessageCircleMore, MessageCircleX } from "lucide-react";

export default async function ChatPage({
  params,
}: {
  params: { chatId: string };
}) {
  const { chatId } = params;

  const { allChats, userId } = useChatsContext();

  return (
    <div>
      <p>messages: </p>
      {/* <Messages chatId={chatId} /> */}
      {/* <MessageField chatId={chatId} /> */}
      <section className="w-3/4">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[500px] max-h-[500px] w-full rounded-lg border"
        >
          <ResizablePanel defaultSize={35} className="p-3 !overflow-y-scroll">
            <ChatsList
              chats={allChats}
              currentChatId={allChats[0].id}
              user1Id={userId}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={65}>
            <EmptySelectedChat />
          </ResizablePanel>
        </ResizablePanelGroup>
      </section>
    </div>
  );
}

function EmptySelectedChat() {
  return (
    <div className="h-full flex flex-col gap-4 justify-center items-center">
      <MessageCircleX className="w-16 h-16" />
      <h2 className="font-bold text-2xl">No chats selected</h2>
    </div>
  );
}

function EmptyChats() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <MessageCircleMore className="w-16 h-16" />
      <h2 className="font-bold text-2xl">No messages</h2>
      <p>New messages will be displayed here</p>
    </div>
  );
}
