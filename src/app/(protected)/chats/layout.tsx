import { getConversationsAction } from "@/actions/chat";
import { ConversationList } from "./_components/conversation-list";
import { currentUser } from "@/lib/auth";

type ConversationLayoutProps = {
  children: React.ReactNode;
};

export default async function ConversationLayout({
  children,
}: ConversationLayoutProps) {
  const user = await currentUser();
  if (!user) return null;

  const conversations = await getConversationsAction();

  return (
    <div className="flex w-full min-h-[400px] h-fit max-h-[800px] border rounded">
      <ConversationList userId={user.id || ""} initialItems={conversations} />
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
