"use client";
import clsx from "clsx";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  name: string;
  imageUrl: string;
  handleClick: () => void;
}

const NoteAction = ({ name, imageUrl, handleClick }: Props) => {
  const searchParams = useSearchParams();
  const noteStatusParam = searchParams.get("note");

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className={clsx(
        "w-9 h-9 lg:px-4 lg:py-3 lg:min-w-36.25 lg:w-full 2xl:w-60.5 lg:h-11 text-sm text-neutral-950 flex justify-center items-center border-0 lg:border lg:justify-start",
        noteStatusParam === "create" && "invisible",
      )}
    >
      <Image src={imageUrl} alt="" width={20} height={20} />
      <span className="hidden lg:block">{name}</span>
    </Button>
  );
};

export default NoteAction;
