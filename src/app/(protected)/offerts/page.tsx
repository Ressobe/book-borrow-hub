import { BookCard } from "@/components/book/book-card";
import { BookSearch } from "@/components/book/book-search";
import { PaginationControls } from "@/components/pagination-controls";
import { searchBooks } from "@/database/book";
import { BookCategory } from "@prisma/client";

type OffertsPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function OffertsPage({ searchParams }: OffertsPageProps) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "4";

  const query = searchParams["query"] ?? "";
  const category = searchParams["category"] ?? "";
  const sort = searchParams["sort"] ?? "";

  const start = (Number(page) - 1) * Number(per_page);
  const take = Number(per_page);

  let sortType: string | undefined = undefined;
  if (sort) {
    sortType = sort === "a-z" ? "asc" : "desc";
  }

  let bookCategory: BookCategory | undefined = undefined;
  if (category) {
    bookCategory = category === "want-to-trade" ? "EXCHANGING" : "LOOKING_FOR";
  }

  const { books, totalCount } = await searchBooks(
    start,
    take,
    query,
    bookCategory,
    sortType,
  );

  return (
    <div className="space-y-10">
      <BookSearch />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
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
      <PaginationControls
        hasPrevPage={start > 0}
        hasNextPage={start + take < totalCount}
        currentPage={Number(page)}
        totalPages={Math.ceil(totalCount / Number(per_page))}
      />
    </div>
  );
}
