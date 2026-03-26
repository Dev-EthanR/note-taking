"use client";
import axios from "axios";
import NoteAction from "./NoteAction";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Note } from "@/generated/prisma/client";

interface Props {
  userNotes: Note[];
}

const DeleteNote = ({ userNotes }: Props) => {
  const searchParams = useSearchParams();
  const noteID = searchParams.get("note")?.split("-")[1];
  const router = useRouter();
  return (
    <NoteAction
      name="Delete Note"
      imageUrl="/images/icon-delete.svg"
      handleClick={async () => {
        await axios.delete(`/api/note/${noteID}`);
        router.push(`/?note=${userNotes[1].title}-${userNotes[1].id}`);
      }}
    />
  );
};

export default DeleteNote;
