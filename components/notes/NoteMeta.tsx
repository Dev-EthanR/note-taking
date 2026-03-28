import { Note } from "@/generated/prisma/client";
import { UseFormRegister } from "react-hook-form";
import CreateNoteHeader from "./CreateNoteHeader";
import { NoteEditorData } from "@/utils/types/noteEditorData";

interface Props {
  noteData: Note | null;
  date: string | null;
  register: UseFormRegister<NoteEditorData>;
}

const NoteMeta = ({ noteData, date, register }: Props) => (
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
        <span>{noteData.status}</span>
      </CreateNoteHeader>
    )}
    <CreateNoteHeader icon="/images/icon-clock.svg" title="Last edited">
      <span>{noteData?.updatedAt ? date : "Not yet saved"}</span>
    </CreateNoteHeader>
  </div>
);

export default NoteMeta;
