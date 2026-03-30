"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchInput() {
  const [input, setInput] = useState("");
  const { debounceValue } = useDebounce(input);

  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();

    if (debounceValue) {
      params.set("search", debounceValue);
    }

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : "/");
    router.refresh();
  }, [debounceValue]);

  return (
    <InputGroup className="w-full lg:w-80 px-4 py-3 bg-neutral-50 dark:bg-neutral-800 dark:lg:bg-transparent lg:bg-transparent">
      <InputGroupInput
        aria-label="Search by title, content, or tags"
        placeholder="Search by title, content, or tags..."
        onChange={(e) => setInput(e.target.value)}
      />
      <InputGroupAddon className="pr-2">
        <Image
          src={"/images/icon-search.svg"}
          alt=""
          width={20}
          height={20}
          className="dark:invert"
        />
      </InputGroupAddon>
    </InputGroup>
  );
}
