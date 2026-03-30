import { PageType } from "@/utils/types/pageType";
import clsx from "clsx";
import CreateNoteButton from "./CreateNoteButton";

interface Props {
  page: PageType;
  tagSlug?: string;
  isNoteActive?: string;
}

const NoteListHeader = ({ page, tagSlug, isNoteActive }: Props) => {
  return (
    <>
      {!isNoteActive && page !== "tags" && page !== "search" && (
        <h1 className="text-neutral-950 dark:text-white text-2xl font-bold lg:hidden">
          {page === "archived" ? "Archived Notes" : "All Notes"}
        </h1>
      )}
      <CreateNoteButton
        style={isNoteActive ? "invisible lg:visible" : "visible"}
      />
      {(page === "archived" || page === "tags") && (
        <p
          className={clsx(
            "text-sm w-full lg:max-w-60 text-neutral-700 dark:text-neutral-300",
            isNoteActive ? "hidden lg:block" : "block",
          )}
        >
          {page === "archived"
            ? "All your archived notes are stored here."
            : `All notes with the "${tagSlug}" tag are shown here.`}
        </p>
      )}
      {page === "search" && (
        <p
          className={clsx(
            "text-sm w-full lg:max-w-60 text-neutral-700 dark:text-neutral-300",
            isNoteActive ? "hidden lg:block" : "block",
          )}
        >
          Search results will be displayed here.
        </p>
      )}
    </>
  );
};

export default NoteListHeader;
