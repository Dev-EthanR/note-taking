import Link from "next/link";
import clsx from "clsx";
import { PageType } from "@/utils/types/pageType";
import CreateNoteButton from "./CreateNoteButton";

interface Props {
  isNoteActive?: string;
  page?: PageType;
}

const pageConfig = {
  archived: {
    title: "Archived Notes",
    description:
      "All your archived notes are stored here. You can restore or delete them anytime.",
    emptyMessage: (
      <p className="text-sm text-neutral-950 dark:text-white">
        No notes have been archived yet. Move notes here for safekeeping, or{" "}
        <Link href="?note=create" className="underline">
          create a new note.
        </Link>
      </p>
    ),
  },
  tags: {
    title: null,
    description: null,
    emptyMessage: null,
  },
  home: {
    title: "All Notes",
    description: null,
    emptyMessage: (
      <p className="text-sm text-neutral-950 dark:text-white">
        You don't have any notes yet. Start a new note to capture your thoughts
        and ideas.
      </p>
    ),
  },
};

const EmptyNotes = ({ isNoteActive, page = "home" }: Props) => {
  const config = pageConfig[page];

  return (
    <div className="w-full lg:border-r lg:border-neutral-300 dark:lg:border-neutral-800 px-3 py-5 md:px-8 md:py-6 lg:pt-5 lg:pl-0 lg:pr-4 min-h-[calc(100vh-var(--navheader-height))] space-y-2 lg:w-fit lg:max-w-90">
      <CreateNoteButton
        style={isNoteActive ? "invisible lg:visible" : "visible"}
      />

      {!isNoteActive && config.title && (
        <h1 className="text-neutral-950 dark:text-white text-2xl font-bold lg:hidden">
          {config.title}
        </h1>
      )}

      {config.description && (
        <p
          className={clsx(
            "text-sm w-full lg:max-w-60 text-neutral-700 dark:text-neutral-300",
            isNoteActive ? "hidden lg:block" : "block",
          )}
        >
          {config.description}
        </p>
      )}

      {!isNoteActive && (
        <div className="p-2 space-y-2 border border-neutral-200 dark:border-neutral-800 rounded-md w-full bg-neutral-100 dark:bg-neutral-800 lg:max-w-62.5">
          <p className="text-sm text-neutral-950 dark:text-white">
            No notes with this tag yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmptyNotes;
