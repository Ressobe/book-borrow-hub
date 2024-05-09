"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function BookSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const categoryParam = searchParams.get("category") ?? "";
  const sortParam = searchParams.get("sort") ?? "";

  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSelectBookCategory = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSelectSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form className="flex justify-between">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search books..."
          className="pl-10 text-md sm:w-[300px] md:w-[200px] lg:w-[300px]"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </div>
      <div className="flex gap-x-4">
        <Select
          defaultValue={categoryParam}
          onValueChange={handleSelectBookCategory}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Book Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="want-to-trade">Want to trade</SelectItem>
            <SelectItem value="looking-for">Looking for</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue={sortParam} onValueChange={handleSelectSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a-z">A-Z</SelectItem>
            <SelectItem value="z-a">Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
