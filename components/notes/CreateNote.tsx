import Image from "next/image";
import React from "react";
import CreateNoteHeader from "./CreateNoteHeader";
import Link from "next/link";
import { Button } from "../ui/button";

const CreateNote = () => {
  return (
    <>
      <div className="flex justify-between lg:hidden border-b-2 pb-2 mb-2 border-b-neutral-200">
        <Link
          href="/"
          className="flex items-center gap-1 text-neutral-600 text-sm "
        >
          <Image
            src="/images/icon-arrow-left.svg"
            alt=""
            width={18}
            height={18}
          />
          Go Back
        </Link>
        <div>
          <Button variant="link" className="text-neutral-600">
            Cancel
          </Button>
          <Button variant="link" className="text-primary-500">
            Save Note
          </Button>
        </div>
      </div>
      <form className="flex flex-col space-y-4 h-[95%] lg:h-full">
        <input
          defaultValue="Enter a title..."
          className="border-none outline-0 text-neutral-950 text-2xl font-bold"
        />
        <div className="grid grid-cols-[115px_minmax(220px,1fr)] gap-y-2 md:grid-cols-[115px_minmax(500,1fr)] border-b-2 pb-4 mb-4 border-b-neutral-200">
          <CreateNoteHeader icon="/images/icon-tag.svg" title="Tags">
            <textarea
              placeholder="Add tags separated by commas (e.g. Work, Planning)"
              className="text-xs md:text-sm border-none outline-0 resize-none"
            />
          </CreateNoteHeader>
          <CreateNoteHeader icon="/images/icon-clock.svg" title="Last edited">
            <span className="text-xs md:text-sm text-neutral-400">
              Not yet saved
            </span>
          </CreateNoteHeader>
        </div>
        <textarea
          defaultValue="Start typing your note here…"
          className="w-full text-xs md:text-sm border-none outline-0 resize-none flex-1 "
        />
      </form>
    </>
  );
};

export default CreateNote;
