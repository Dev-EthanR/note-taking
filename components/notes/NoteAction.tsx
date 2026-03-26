"use client";
import Image from "next/image";
import { Button } from "../ui/button";

interface Props {
  name: string;
  imageUrl: string;
  handleClick: () => void;
}

const NoteAction = ({ name, imageUrl, handleClick }: Props) => {
  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className="px-4 py-3 w-60.5 h-11 text-sm text-neutral-950 flex justify-start items-center"
    >
      <Image src={imageUrl} alt="" width={20} height={20} />
      <span>{name}</span>
    </Button>
  );
};

export default NoteAction;
