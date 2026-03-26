"use client";
import { Note } from "@/generated/prisma/client";
import NoteAction from "./NoteAction";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface Props {
  userNotes: Note[];
}

const ArchiveNote = ({ userNotes }: Props) => {
  const searchParams = useSearchParams();
  const noteID = searchParams.get("note")?.split("-")[1];
  const router = useRouter();
  return (
    <NoteAction
      name="Archive Note"
      imageUrl="/images/icon-archive.svg"
      handleClick={async () => {
        await axios.patch(`/api/note/archive/${noteID}`, { archive: true });
        router.push(`/?note=${userNotes[1].title}-${userNotes[1].id}`);
        router.refresh();
      }}
    />
  );
};

export default ArchiveNote;
