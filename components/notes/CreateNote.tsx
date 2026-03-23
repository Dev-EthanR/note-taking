import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import CreateNoteHeader from "./CreateNoteHeader";

const CreateNote = () => {
  return (
    <form className="flex flex-col lg:flex-col-reverse h-full">
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
          <Button
            variant="link_button"
            className="text-neutral-600 lg:bg-neutral-100 lg:hover:bg-neutral-200"
          >
            Cancel
          </Button>
          <Button
            variant="link_button"
            className="text-primary-500 lg:bg-primary-500 lg:text-white lg:hover:bg-primary-700"
          >
            Save Note
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-4 h-[95%] lg:h-full flex-1">
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
          placeholder="Start typing your note here…"
          className="w-full text-xs md:text-sm border-none outline-0 resize-none flex-1 placeholder:text-neutral-950"
        />
      </div>
    </form>
  );
};

export default CreateNote;
