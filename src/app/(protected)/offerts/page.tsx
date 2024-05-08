import { BookCard } from "@/components/book/book-card";
import { BookSearch } from "@/components/book/book-search";
import { getBooks } from "@/database/book";

type OffertsPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function OffertsPage({ searchParams }: OffertsPageProps) {
  const books = await getBooks();

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";
  const query = searchParams["query"] ?? "";

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  let entries = books.splice(start, end);
  if (query) {
    entries = entries.filter((value) => value.title.includes(query));
  }

  return (
    <div className="space-y-10">
      <BookSearch />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 ">
        {entries.map((book) => {
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
