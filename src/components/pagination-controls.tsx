"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Arrow } from "@radix-ui/react-select";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  console.log(totalPages);

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
      <Button disabled={!hasPrevPage} onClick={handlePrevPage}>
        <ArrowLeft className="w-6 h-6" />
      </Button>
      <div className="flex items-center font-bold text-xl">
        {currentPage} / {totalPages}
      </div>
      <Button disabled={!hasNextPage} onClick={handleNextPage}>
        <ArrowRight className="w-6 h-6" />
      </Button>
    </div>
  );
}
