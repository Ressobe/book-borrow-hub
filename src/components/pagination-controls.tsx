"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type PaginationControlsProps = {
  hasPrevPage: boolean;
  hasNextPage: boolean;
  currentPage: number;
  totalPages: number;
};

export function PaginationControls({
  hasPrevPage,
  hasNextPage,
  currentPage,
  totalPages,
}: PaginationControlsProps) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get("page") ?? "1";
  if (Number(page) < 1) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  }

  if (Number(page) > totalPages) {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${totalPages}`);
    replace(`${pathname}?${params.toString()}`);
  }

  const handlePrevPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${currentPage - 1}`);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleNextPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${currentPage + 1}`);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex w-full justify-center gap-x-10 py-6">
      <Button
        variant="default"
        disabled={!hasPrevPage}
        onClick={handlePrevPage}
        className="bg-white"
      >
        Previous Page
      </Button>
      <div className="flex items-center font-bold text-xl">
        {currentPage} / {totalPages}
      </div>
      <Button disabled={!hasNextPage} onClick={handleNextPage}>
        Next page
      </Button>
    </div>
  );
}
