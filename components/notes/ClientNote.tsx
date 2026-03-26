"use client";
import { Note } from "@/generated/prisma/client";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import CreateNote from "./CreateNote";
import CreateNoteButton from "./CreateNoteButton";
import PreviewNote from "./PreviewNote";

interface Props {
  isNoteActive?: string | undefined;
  userNotes: Note[];
}

const ClientNote = ({ isNoteActive, userNotes }: Props) => {
  const [newTitle, setNewTitle] = useState("Untitled Note");
  const searchParams = useSearchParams();
  const noteParam = searchParams.get("note");
  const activeId = noteParam?.split("-")[1];
  const router = useRouter();

  useEffect(() => {
    if (!noteParam && userNotes[0]) {
      router.replace(`/?note=${userNotes[0].title}-${userNotes[0].id}`);
    }
  }, []);
  useLayoutEffect(() => {
    const activeNote = userNotes.find((n) => n.id === activeId);
    if (activeNote) {
      setNewTitle(activeNote.title);
    }
  }, [activeId, userNotes]);
  return (
    <>
      <div className="lg:border-r lg:border-neutral-300 px-3 py-5 md:px-8 md:py-6 lg:pt-5 lg:pl-0 lg:pr-4 min-h-[calc(100vh-var(--navheader-height))] space-y-2 lg:w-fit lg:max-w-90">
        <CreateNoteButton
          style={isNoteActive ? "invisible lg:visible" : "visible"}
        />
        <div
          className={clsx(
            "space-y-2 overflow-y-auto max-h-[calc(100vh-var(--navheader-height)-55px)] lg:max-h-[calc(100vh-var(--navheader-height)-100px)]",
            isNoteActive ? "hidden lg:block" : "block",
          )}
        >
          {/* REFACTOR */}
          {noteParam === "create" && (
            <PreviewNote
              note={null}
              updatedTitle={newTitle}
              activeId={activeId}
              isNew={true}
              noteParam={noteParam}
            />
          )}

          {userNotes.map((note) => (
            <PreviewNote
              key={note.id}
              updatedTitle={activeId === note.id ? newTitle : undefined}
              note={note}
              activeId={activeId}
              noteParam={noteParam}
            />
          ))}
        </div>
      </div>
      {isNoteActive && (
        <div className="pt-5 pr-6 md:pr-12 lg:px-6 lg:border-r lg:border-neutral-300 min-h-[calc(100vh-var(--navheader-height))] lg:w-137.5 grow">
          <CreateNote setTitle={setNewTitle} />
        </div>
      )}
    </>
  );
};

export default ClientNote;
