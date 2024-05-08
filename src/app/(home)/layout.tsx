import LoginButton from "@/components/auth/login-button";
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { Book } from "lucide-react";
import Link from "next/link";

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const user = await currentUser();

  return (
    <>
      <header className="px-6  mx-auto lg:px-6 pt-10 flex flex-col gap-y-4 sm:flex-row w-full justify-between items-center">
        <Link className="flex items-center justify-cente" href="/">
          <Book className="sm:w-12 sm:h-12 w-7 h-7  text-indigo-500 " />
          <h1 className="pl-4 font-bold text-2xl sm:text-3xl  text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            BookBorrowHub
          </h1>
        </Link>
        {user ? (
          <>
            <UserButton className="w-20 h-20 border border-primary" />
          </>
        ) : (
          <LoginButton mode="redirect" asChild>
            <Button variant="default" className="rounded px-4">
              Sign In
            </Button>
          </LoginButton>
        )}
      </header>
      {children}
    </>
  );
}
