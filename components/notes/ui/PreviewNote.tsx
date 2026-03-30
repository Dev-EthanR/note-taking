import { Note } from "@/generated/prisma/client";
import { checkString } from "@/utils/checkString";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface Props {
  note: Note | null;
  activeId: string | undefined;
  noteParam: string | null;
  updatedTitle?: string;
  isNew?: boolean;
}

const PreviewNote = ({
  note,
  updatedTitle,
  activeId,
  isNew,
  noteParam,
}: Props) => {
  const router = useRouter();
  const isActive = isNew ? noteParam === "create" : activeId === note?.id;

  const formattedDate = note?.updatedAt
    ? new Date(note.updatedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const handleClick = () => {
    if (isNew) return;
    router.push(`?note=${note?.title}-${note?.id}`);
  };

  const title = isActive ? (updatedTitle ?? note?.title) : note?.title;

  return (
    <div
      className={clsx(
        "p-2 space-y-2 border-b border-neutral-200 dark:border-neutral-800 rounded-md cursor-pointer w-full",
        isActive && "lg:bg-neutral-100 dark:lg:bg-neutral-800 ",
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      onClick={handleClick}
    >
      <h3 className="text-neutral-950 font-semibold dark:text-white">
        {checkString(title as string, 31)}
      </h3>
      <div className="space-x-3">
        {note?.tags.map((tag) => (
          <span
            key={tag}
            className="bg-neutral-200 dark:bg-neutral-600 px-1.5 py-0.5 rounded-sm w-11 h-4.5  text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-neutral-700 dark:text-neutral-300 text-xs">
        {formattedDate}
      </p>
    </div>
  );
};

export default PreviewNote;
