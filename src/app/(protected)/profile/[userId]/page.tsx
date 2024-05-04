import { auth } from "@/auth";
import { BookAddButton } from "@/components/book/book-add-button";
import { BooksContainer } from "@/components/book/books-container";
import { SendMessageButton } from "@/components/send-message-button";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { getUserBooksByUserId, getUserById } from "@/database/user";
import { currentUser } from "@/lib/auth";
import { MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const authUser = await currentUser();
  if (!authUser) return null;
  if (!authUser.id) return null;

  const user = await getUserById(userId);

  if (!user) {
    return notFound();
  }

  const canEdit = authUser.id === user?.id;
  const books = await getUserBooksByUserId(user.id);

  const lookingForBooks = books?.filter(
    (item) => item.category === "LOOKING_FOR",
  );

  const exchangingBooks = books?.filter(
    (item) => item.category === "EXCHANGING",
  );

  return (
    <section className="flex flex-col gap-y-14">
      <div className="flex flex-col items-center md:flex-row gap-x-16 w-full py-8">
        <UserAvatar
          canEdit={canEdit}
          className="w-36 h-36 border p-1"
          avatarUrl={user?.image}
        />
        <div className="space-y-5 text-center md:text-left">
          <h1 className="font-bold  text-4xl">{user.name}</h1>
          <span className="text-sm text-muted-foreground">{user.email}</span>
          <p className="max-w-md text-left break-words">{user.description}</p>
          {!canEdit && (
            <SendMessageButton
              authUserId={authUser.id}
              profileUserId={userId}
            />
          )}
        </div>
      </div>
      <section className="space-y-5 w-full">
        <h2 className="font-bold text-3xl flex items-center gap-x-6">
          I'm looking for
          {canEdit && <BookAddButton bookCategory="LOOKING_FOR" />}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BooksContainer
            books={lookingForBooks}
            canEdit={canEdit}
            showLinkToProfile={false}
          />
        </div>
      </section>
      <section className="space-y-5">
        <h2 className="font-bold text-3xl flex items-center gap-x-6">
          I want to trade
          {canEdit && <BookAddButton bookCategory="EXCHANGING" />}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <BooksContainer
            books={exchangingBooks}
            canEdit={canEdit}
            showLinkToProfile={false}
          />
        </div>
      </section>
    </section>
  );
}
