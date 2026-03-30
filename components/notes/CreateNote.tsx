// REFACTOR
"use client";
import { Note as dbNote } from "@/generated/prisma/client";
import { useNote } from "@/hooks/useNote";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import NoteMeta from "./NoteMeta";
import NoteToolbar from "./NoteToolbar";
import { NoteEditorData } from "@/utils/types/noteEditorData";
import { CreateNoteLoading } from "./ui/CreateNoteLoading";

interface Props {
  setTitle: (title: string) => void;
  userNotes: dbNote[];
}

const CreateNote = ({ setTitle, userNotes }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const noteID = searchParams.get("note")?.split("-")[1];
  const { noteData, setNoteData } = useNote(noteID);

  const { handleSubmit, register, watch, reset } = useForm<NoteEditorData>();

  useEffect(() => {
    if (!noteData) {
      reset({ title: "", tags: "", note: "" });
      setNoteData(null);
      return;
    }
    reset({
      title: noteData?.title,
      tags: noteData?.tags.join(", "),
      note: noteData?.content,
    });
  }, [noteData]);

  useEffect(() => {
    setTitle(watch("title") || "Untitled Note");
  }, [watch("title")]);

  const router = useRouter();
  const date = noteData?.updatedAt
    ? new Date(noteData.updatedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  async function onSubmit(formData: NoteEditorData) {
    const title = formData.title || "Untitled Note";
    const tags = formData.tags
      ?.split(",")
      .map((tag) => tag.trim())
      .filter((tag) => (tag === "" ? null : tag));
    const note = formData.note;
    if (noteData?.id) {
      const DB_Data = await axios.patch(`/api/note/${noteData.id}`, {
        title,
        tags,
        note,
      });
      setNoteData(DB_Data.data);
    } else {
      const archiveStatus = pathname === "/archived" ? "Archived" : null;
      const DB_data = await axios.post("/api/note", {
        title,
        tags,
        note,
        status: archiveStatus,
      });
      router.push(`?note=${DB_data.data.title}-${DB_data.data.id}`);
    }
    router.refresh();
  }

  return (
    <form
      className="flex flex-col lg:flex-col-reverse h-full pb-8 lg:pb-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <NoteToolbar pathname={pathname} userNotes={userNotes} />
      <div className="flex flex-col space-y-4 h-[95%] lg:h-full flex-1">
        <textarea
          id="title"
          placeholder="Enter a title..."
          className="border-none outline-0 text-neutral-950 dark:text-white text-2xl font-bold placeholder:text-neutral-950 dark:placeholder:text-white resize-none"
          {...register("title")}
          aria-label="title"
          rows={1}
          style={{ height: "auto" }}
          onInput={(e) => {
            const element = e.currentTarget;
            element.style.height = "auto";
            element.style.height = element.scrollHeight + "px";
          }}
        />
        <NoteMeta noteData={noteData} date={date} register={register} />
        <textarea
          id="note"
          placeholder="Start typing your note here…"
          className="w-full text-xs md:text-sm border-none outline-0 resize-none flex-1 placeholder:text-neutral-950 dark:placeholder:text-white "
          aria-label="note"
          {...register("note")}
        />
      </div>
    </form>
  );
};

export default CreateNote;
