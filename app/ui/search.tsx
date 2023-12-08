"use client";

import { BeakerIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className=" flex border-2 border-[#ffffff80] w-min px-4 py-1 rounded-[4rem] text-lg">
      <input
        type="text"
        placeholder="Search Products"
        className=" bg-inherit outline-none"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="w-6 h-6 " />
    </div>
  );
}

export default Search;
