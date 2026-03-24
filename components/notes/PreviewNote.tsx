import { Note } from "@/generated/prisma/client";

interface Props {
  note: Note;
}

const PreviewNote = ({ note }: Props) => {
  return (
    <div className="p-2 space-y-2 border-b border-neutral-200">
      <h3 className="text-neutral-950 font-semibold">{note.title}</h3>
      <div className="space-x-3">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="bg-neutral-200 px-1.5 py-0.5 rounded-sm w-11 h-4.5  text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-neutral-700 text-xs">
        {note.updatedAt.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
    </div>
  );
};

export default PreviewNote;
