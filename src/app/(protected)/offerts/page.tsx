import { BookCard } from "@/components/book/book-card";
import { Input } from "@/components/ui/input";
import { getBooks } from "@/database/book";
import { Search } from "lucide-react";

export default async function OffertsPage() {
  const books = await getBooks();

  return (
    <div className="space-y-10">
      <form className="ml-auto flex-1 sm:flex-initial">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search books..."
            className="pl-10 text-md sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
        </div>
      </form>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 ">
        {books.map((book) => {
          return (
            <BookCard
              key={book.id}
              showLinkToProfile={true}
              book={book}
              canEdit={false}
            />
          );
        })}
      </section>
    </div>
  );
}
