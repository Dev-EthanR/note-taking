import React from "react";
import { SearchInput } from "@/components/Search";

const Search = () => {
  return (
    <div className="lg:hidden px-4 md:px-8 py-5 md:py-6 space-y-4">
      <h1 className="font-bold text-2xl ">Search</h1>
      <SearchInput />
    </div>
  );
};

export default Search;
