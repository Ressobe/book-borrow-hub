import { getChatById } from "@/database/chats";
import { EmptyState } from "../_components/empty-state";
import { ConversationHeader } from "../_components/conversation-header";
import { ConversationBody } from "../_components/conversation-body";
import { SendMessageForm } from "../_components/send-message-form";
import { currentUser } from "@/lib/auth";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function ConverationPage({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversationId } = params;
  const conversation = await getChatById(conversationId);
  const authUser = await currentUser();
  if (!authUser) return null;

  if (!conversation) {
    return <EmptyState />;
  }

  const user =
    authUser.id === conversation.user1.id
      ? conversation.user2
      : conversation.user1;

  return (
    <section className="p-4">
      <ConversationHeader user={user} />
      <ScrollArea className="h-96 mb-5">
        <ConversationBody
          initialMessages={conversation.messages}
          userId={authUser.id || ""}
        />
      </ScrollArea>
      <SendMessageForm senderId={authUser.id || ""} />
    </section>
  );
}
