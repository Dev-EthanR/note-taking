// REFACTOR
"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import CreateNoteHeader from "./CreateNoteHeader";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Note as dbNote } from "@/generated/prisma/client";
import ArchiveNote from "./ArchiveNote";
import DeleteNote from "./DeleteNote";

interface Note {
  title?: string;
  tags?: string;
  note?: string;
}

interface Props {
  setTitle: (title: string) => void;
  userNotes: dbNote[];
}

const CreateNote = ({ setTitle, userNotes }: Props) => {
  const [noteData, setNoteData] = useState<dbNote | null>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const noteID = searchParams.get("note")?.split("-")[1];
  useEffect(() => {
    if (!noteID || noteID === "create") {
      setNoteData(null);
      reset({ title: "", tags: "", note: "" });
      return;
    }

    async function getNote() {
      try {
        const response = await axios.get(`/api/note/${noteID}`);
        setNoteData(response.data);
      } catch (err: any) {
        if (err.response?.status === 404) return;
        console.error(err);
      }
    }
    getNote();
  }, [noteID]);

  const { handleSubmit, register, watch, reset } = useForm<Note>();

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

  const title = watch("title");

  useEffect(() => {
    setTitle(title || "Untitled Note");
  }, [title]);

  const router = useRouter();
  const date = noteData?.updatedAt
    ? new Date(noteData.updatedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  async function onSubmit(formData: Note) {
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
      <div className="flex justify-between border-b-2 pb-2 mb-2 border-neutral-200 dark:border-neutral-800 lg:border-t-2 lg:border-b-0 lg:py-4 lg:my-2">
        <Link
          href={pathname}
          className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300 text-sm lg:hidden "
        >
          <Image
            src="/images/icon-arrow-left.svg"
            alt=""
            width={18}
            height={18}
            className="dark:invert select-none"
          />
          Go Back
        </Link>
        <div className="flex lg:gap-2 items-center lg:flex-row-reverse">
          <span className="lg:hidden">
            <DeleteNote userNotes={userNotes} />
          </span>
          {pathname === "/archived" ? (
            <span className="lg:hidden">
              <ArchiveNote
                archive={false}
                userNotes={userNotes}
                imageUrl="/images/icon-restore.svg"
              />
            </span>
          ) : (
            <span className="lg:hidden">
              <ArchiveNote archive={true} userNotes={userNotes} />
            </span>
          )}
          <Link href={pathname}>
            <Button
              variant="link_button"
              className="text-neutral-600 dark:text-neutral-300 lg:bg-neutral-100 dark:lg:bg-neutral-800 lg:hover:bg-neutral-200 dark:lg:hover:bg-neutral-700"
              size="xl"
            >
              Cancel
            </Button>
          </Link>
          <Button
            variant="link_button"
            className="text-primary-500  lg:bg-primary-500 lg:text-white lg:hover:bg-primary-700"
            type="submit"
            size="xl"
          >
            Save Note
          </Button>
        </div>
      </div>
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
        <div className="min-w-0 grid grid-cols-[115px_minmax(220px,1fr)] gap-y-2 md:grid-cols-[115px_minmax(0,1fr)] border-b-2 pb-4 mb-4 border-b-neutral-200 dark:border-b-neutral-800">
          <CreateNoteHeader icon="/images/icon-tag.svg" title="Tags">
            <textarea
              id="tags"
              placeholder="Add tags separated by commas (e.g. Work, Planning)"
              className="text-xs md:text-sm border-none outline-0 resize-none w-full min-w-0 wrap-break-word"
              wrap="hard"
              {...register("tags")}
              aria-label="tags"
              style={{ height: "auto" }}
              onInput={(e) => {
                const element = e.currentTarget;
                element.style.height = "auto";
                element.style.height = element.scrollHeight + "px";
              }}
              rows={1}
            />
          </CreateNoteHeader>
          {noteData?.status && (
            <CreateNoteHeader icon="/images/icon-status.svg" title="Status">
              <span className="text-xs md:text-sm text-neutral-950 dark:text-white">
                {noteData.status}
              </span>
            </CreateNoteHeader>
          )}
          <CreateNoteHeader icon="/images/icon-clock.svg" title="Last edited">
            <span className="text-xs md:text-sm text-neutral-400 dark:text-neutral-400">
              {noteData?.updatedAt ? date : "Not yet saved"}
            </span>
          </CreateNoteHeader>
        </div>
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
