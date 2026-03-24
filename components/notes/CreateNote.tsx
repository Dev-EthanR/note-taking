"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import CreateNoteHeader from "./CreateNoteHeader";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Note {
  title?: string;
  tags?: string;
  note?: string;
}

const CreateNote = () => {
  const { handleSubmit, register } = useForm<Note>();
  const router = useRouter();

  async function onSubmit(noteData: Note) {
    const title = noteData.title;
    const tags = noteData.tags
      ?.split(",")
      .map((tag) => tag.trim())
      .filter((tag) => (tag === "" ? null : tag));
    const note = noteData.note;

    await axios.post("/api/note", { title, tags, note });
    router.refresh();
  }
  return (
    <form
      className="flex flex-col lg:flex-col-reverse h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between border-b-2 pb-2 mb-2 border-neutral-200 lg:border-t-2 lg:border-b-0 lg:py-4 lg:my-2">
        <Link
          href="/"
          className="flex items-center gap-1 text-neutral-600 text-sm lg:hidden "
        >
          <Image
            src="/images/icon-arrow-left.svg"
            alt=""
            width={18}
            height={18}
          />
          Go Back
        </Link>
        <div className="lg:flex flex-row-reverse gap-2">
          <Link href="/">
            <Button
              variant="link_button"
              className="text-neutral-600 lg:bg-neutral-100 lg:hover:bg-neutral-200"
            >
              Cancel
            </Button>
          </Link>
          <Button
            variant="link_button"
            className="text-primary-500 lg:bg-primary-500 lg:text-white lg:hover:bg-primary-700"
            type="submit"
          >
            Save Note
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-4 h-[95%] lg:h-full flex-1">
        <input
          id="title"
          placeholder="Enter a title..."
          className="border-none outline-0 text-neutral-950 text-2xl font-bold placeholder:text-neutral-950"
          {...register("title")}
          aria-label="title"
        />
        <div className="grid grid-cols-[115px_minmax(220px,1fr)] gap-y-2 md:grid-cols-[115px_minmax(500,1fr)] border-b-2 pb-4 mb-4 border-b-neutral-200">
          <CreateNoteHeader icon="/images/icon-tag.svg" title="Tags">
            <textarea
              id="tags"
              placeholder="Add tags separated by commas (e.g. Work, Planning)"
              className="text-xs md:text-sm border-none outline-0 resize-none"
              {...register("tags")}
              aria-label="tags"
            />
          </CreateNoteHeader>
          <CreateNoteHeader icon="/images/icon-clock.svg" title="Last edited">
            <span className="text-xs md:text-sm text-neutral-400">
              Not yet saved
            </span>
          </CreateNoteHeader>
        </div>
        <textarea
          id="note"
          placeholder="Start typing your note here…"
          className="w-full text-xs md:text-sm border-none outline-0 resize-none flex-1 placeholder:text-neutral-950"
          aria-label="note"
          {...register("note")}
        />
      </div>
    </form>
  );
};

export default CreateNote;
