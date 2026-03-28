"use client";
import { Note } from "@/generated/prisma/client";
import { PageType } from "@/utils/types/pageType";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useLayoutEffect, useState } from "react";
import EmptyNotes from "./EmptyNotes";
import NoteEditor from "./NoteEditor";
import NoteListHeader from "./NoteListHeader";
import PreviewNote from "./PreviewNote";
import { PreviewNoteLoading } from "./PreviewNoteLoading";

interface Props {
  isNoteActive?: string | undefined;
  userNotes: Note[];
  page?: PageType;
  tagSlug?: string;
}

const ClientNote = ({
  isNoteActive,
  userNotes,
  page = "home",
  tagSlug = "",
}: Props) => {
  const [newTitle, setNewTitle] = useState("Untitled Note");
  const searchParams = useSearchParams();
  const noteParam = searchParams.get("note");
  const activeId = noteParam?.split("-")[1];
  const router = useRouter();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    if (!mediaQuery.matches) return;

    const pageUrls: Record<PageType, string> = {
      home: "/",
      archived: "/archived",
      tags: `/tags/${tagSlug}`,
    };

    const url = pageUrls[page];

    if (!noteParam && userNotes[0]) {
      router.replace(`${url}/?note=${userNotes[0].title}-${userNotes[0].id}`);
    }
  }, []);
  useLayoutEffect(() => {
    const activeNote = userNotes.find((n) => n.id === activeId);
    if (activeNote) {
      setNewTitle(activeNote.title);
    }
  }, [activeId, userNotes]);
  if (userNotes.length < 1) {
    return (
      <>
        <EmptyNotes isNoteActive={isNoteActive} page={page} />
        {isNoteActive && (
          <NoteEditor setNewTitle={setNewTitle} userNotes={userNotes} />
        )}
      </>
    );
  }
  return (
    <>
      <div className="lg:border-r lg:border-neutral-300 px-3 py-5 md:px-8 md:py-6 lg:pt-5 lg:pl-0 lg:pr-4 min-h-[calc(100vh-var(--navheader-height))] space-y-2 lg:w-fit lg:max-w-90">
        <NoteListHeader
          page={page}
          tagSlug={tagSlug}
          isNoteActive={isNoteActive}
        />
        <div
          className={clsx(
            "space-y-2 overflow-y-auto max-h-[calc(100vh-var(--navheader-height)-55px)] lg:max-h-[calc(100vh-var(--navheader-height)-100px)]",
            isNoteActive ? "hidden lg:block" : "block",
          )}
        >
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
            <Suspense key={note.id} fallback={<PreviewNoteLoading />}>
              <PreviewNote
                updatedTitle={activeId === note.id ? newTitle : undefined}
                note={note}
                activeId={activeId}
                noteParam={noteParam}
              />
            </Suspense>
          ))}
        </div>
      </div>
      {isNoteActive && (
        <NoteEditor setNewTitle={setNewTitle} userNotes={userNotes} />
      )}
    </>
  );
};

export default ClientNote;
