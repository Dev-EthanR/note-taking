import Link from "next/link";
import { Button } from "../ui/button";
import ArchiveNote from "./actions/ArchiveNote";
import DeleteNote from "./actions/DeleteNote";
import Image from "next/image";
import { Note } from "@/generated/prisma/client";

interface Props {
  pathname: string;
  userNotes: Note[];
}

const NoteToolbar = ({ pathname, userNotes }: Props) => (
  <div className="flex justify-between border-b-2 pb-2 mb-2 border-neutral-200 dark:border-neutral-800 lg:border-t-2 lg:border-b-0 lg:py-4 lg:my-2">
    <Link
      href={pathname}
      className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300 text-sm lg:hidden"
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
      <span className="lg:hidden">
        {pathname === "/archived" ? (
          <ArchiveNote
            archive={false}
            userNotes={userNotes}
            imageUrl="/images/icon-restore.svg"
          />
        ) : (
          <ArchiveNote archive={true} userNotes={userNotes} />
        )}
      </span>
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
);

export default NoteToolbar;
