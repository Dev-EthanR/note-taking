"use client";
import { Note } from "@/generated/prisma/client";
import NoteAction from "./NoteAction";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface Props {
  userNotes: Note[];
  name?: string;
  imageUrl?: string;
}

const ArchiveNote = ({
  name = "Archive Note",
  imageUrl = "/images/icon-archive.svg",
  userNotes,
}: Props) => {
  const searchParams = useSearchParams();
  const noteID = searchParams.get("note")?.split("-")[1];
  const router = useRouter();
  return (
    <NoteAction
      name={name}
      imageUrl={imageUrl}
      handleClick={async () => {
        await axios.patch(`/api/note/archive/${noteID}`, { archive: true });
        if (userNotes.length < 2) router.push("/");
        else router.push(`/?note=${userNotes[1].title}-${userNotes[1].id}`);
        router.refresh();
      }}
    />
  );
};

export default ArchiveNote;
