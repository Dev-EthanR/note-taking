import { Note } from "@/generated/prisma/client";
import { SetStateAction, Suspense } from "react";
import CreateNote from "./CreateNote";
import { CreateNoteLoading } from "./CreateNoteLoading";

const NoteEditor = ({
  setNewTitle,
  userNotes,
}: {
  setNewTitle: React.Dispatch<SetStateAction<string>>;
  userNotes: Note[];
}) => (
  <div className="pt-5 pr-6 md:pr-12 lg:px-6 lg:border-r lg:border-neutral-300 dark:lg:border-neutral-800 min-h-[calc(100vh-var(--navheader-height))] lg:w-137.5 grow">
    <Suspense fallback={<CreateNoteLoading />}>
      <CreateNote setTitle={setNewTitle} userNotes={userNotes} />
    </Suspense>
  </div>
);

export default NoteEditor;
