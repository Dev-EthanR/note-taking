"use client";
import React, { useEffect, useRef, useState } from "react";
import CreateNoteButton from "./CreateNoteButton";
import PreviewNote from "./PreviewNote";
import CreateNote from "./CreateNote";
import { Note } from "@/generated/prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

interface Props {
  isNoteActive?: string | undefined;
  userNotes: Note[];
}

const ClientNote = ({ isNoteActive, userNotes }: Props) => {
  const [newTitle, setNewTitle] = useState("Untilted Note");
  const searchParams = useSearchParams();
  const noteParam = searchParams.get("note");
  const activeId = noteParam?.split("-")[1];
  const router = useRouter();

  useEffect(() => {
    if (!noteParam && userNotes[0]) {
      router.replace(`/?note=${userNotes[0].title}-${userNotes[0].id}`);
    }
  }, []);

  return (
    <>
      <div className="lg:border-r lg:border-neutral-300 px-3 py-5 md:px-8 md:py-6 lg:pt-5 lg:pl-0 lg:pr-4 min-h-[calc(100vh-var(--navheader-height))] space-y-2 lg:w-fit">
        <CreateNoteButton
          style={isNoteActive ? "invisible lg:visible" : "visible"}
        />
        <div
          className={clsx(
            "space-y-2 overflow-y-auto max-h-[calc(100vh-var(--navheader-height)-100px)]",
            isNoteActive ? "hidden lg:block" : "block",
          )}
        >
          <>
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
                note={note}
                activeId={activeId}
                noteParam={noteParam}
              />
            ))}
          </>
        </div>
      </div>
      {isNoteActive && (
        <div className="pt-5 lg:px-6 lg:border-r lg:border-neutral-300 min-h-[calc(100vh-var(--navheader-height))]">
          <CreateNote setTitle={setNewTitle} />
        </div>
      )}
    </>
  );
};

export default ClientNote;
