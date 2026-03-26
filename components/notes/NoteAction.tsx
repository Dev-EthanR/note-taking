"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
        "px-4 py-3 min-w-36.25 w-full 2xl:w-60.5 h-11 text-sm text-neutral-950 flex justify-start items-center ",
        noteStatusParam === "create" && "invisible",
      )}
    >
      <Image src={imageUrl} alt="" width={20} height={20} />
      <span>{name}</span>
    </Button>
  );
};

export default NoteAction;
