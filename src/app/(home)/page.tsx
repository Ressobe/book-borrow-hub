import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <section className="w-full px-5 py-6 md:py-12 lg:py-24 xl:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
            <div className="flex flex-col justify-center space-y-2">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Exchange your books with the community
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Share your favorite stories and discover new ones by trading
                  books with fellow readers.
                </p>
              </div>
              {!session?.user && (
                <Button variant="default" asChild>
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              )}
            </div>
            <Image
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              height="310"
              src="/book.jpeg"
              width="550"
            />
          </div>
        </div>
      </section>
    </>
  );
}
