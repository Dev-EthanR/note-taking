import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import Image from "next/image";

export function SearchInput() {
  return (
    <InputGroup className="w-full lg:w-80 px-4 py-3 bg-neutral-50 lg:bg-transparent">
      <InputGroupInput
        aria-label="Search by title, content, or tags"
        placeholder="Search by title, content, or tags..."
      />
      <InputGroupAddon className="pr-2">
        <Image src={"/images/icon-search.svg"} alt="" width={20} height={20} />
      </InputGroupAddon>
    </InputGroup>
  );
}
