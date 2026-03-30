"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  style: string;
}

const CreateNoteButton = ({ style }: Props) => {
  const router = useRouter();
  return (
    <Button
      variant="primary"
      className={cn(
        "size-12 md:size-16 rounded-full lg:rounded-2xl lg:w-60.5 lg:h-10.25 absolute bottom-20 right-5 md:bottom-25 md:right-10 lg:static flex items-center lg:text-base lg:font-semibold",
        style,
      )}
      onClick={() => {
        router.push("?note=create");
      }}
    >
      <Image
        className="invert lg:hidden select-none"
        src={"/images/icon-plus.svg"}
        alt="create a new note"
        width={32}
        height={32}
      />
      <span className="hidden lg:block">+ Create New Note</span>
    </Button>
  );
};

export default CreateNoteButton;
