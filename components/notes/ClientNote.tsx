// REFACTOR
"use client";
import { Note } from "@/generated/prisma/client";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import CreateNote from "./CreateNote";
import CreateNoteButton from "./CreateNoteButton";
import PreviewNote from "./PreviewNote";
import Link from "next/link";

interface Props {
  isNoteActive?: string | undefined;
  userNotes: Note[];
  page?: "/archived" | "/tags/" | "";
  tagSlug?: string;
}

const ClientNote = ({
  isNoteActive,
  userNotes,
  page = "",
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

    if (!noteParam && userNotes[0]) {
      router.replace(
        `${page}${tagSlug}/?note=${userNotes[0].title}-${userNotes[0].id}`,
      );
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
        <div className="w-full lg:border-r lg:border-neutral-300 px-3 py-5 md:px-8 md:py-6 lg:pt-5 lg:pl-0 lg:pr-4 min-h-[calc(100vh-var(--navheader-height))] space-y-2 lg:w-fit lg:max-w-90">
          <CreateNoteButton
            style={isNoteActive ? "invisible lg:visible" : "visible"}
          />
          {page === "/archived" && (
            <p
              className={clsx(
                "text-sm w-full lg:max-w-60 text-neutral-700",
                isNoteActive ? "hidden lg:block" : "block",
              )}
            >
              All your archived notes are stored here. You can restore or delete
              them anytime.
            </p>
          )}
          {!isNoteActive && page !== "/tags/" && (
            <h1 className="text-neutral-950 text-2xl font-bold lg:hidden">
              {page === "/archived" ? "Archived Notes" : "All Notes"}
            </h1>
          )}
          <div className="p-2 space-y-2 border border-neutral-200 rounded-md cursor-pointer w-full bg-neutral-100 lg:max-w-62.5">
            {page === "/archived" ? (
              <p className="text-sm text-neutral-950">
                No notes have been archived yet. Move notes here for
                safekeeping, or{" "}
                <Link href="?note=create" className="underline">
                  create a new note.
                </Link>
              </p>
            ) : (
              <p className="text-sm text-neutral-950">
                You don’t have any notes yet. Start a new note to capture your
                thoughts and ideas.
              </p>
            )}
          </div>
        </div>
        {isNoteActive && (
          <div className="pt-5 pr-6 md:pr-12 lg:px-6 lg:border-r lg:border-neutral-300 min-h-[calc(100vh-var(--navheader-height))] lg:w-137.5 grow">
            <CreateNote setTitle={setNewTitle} userNotes={userNotes} />
          </div>
        )}
      </>
    );
  }
  return (
    <>
      <div className="lg:border-r lg:border-neutral-300 px-3 py-5 md:px-8 md:py-6 lg:pt-5 lg:pl-0 lg:pr-4 min-h-[calc(100vh-var(--navheader-height))] space-y-2 lg:w-fit lg:max-w-90">
        {!isNoteActive && page !== "/tags/" && (
          <h1 className="text-neutral-950 text-2xl font-bold lg:hidden">
            {page === "/archived" ? "Archived Notes" : "All Notes"}
          </h1>
        )}
        <CreateNoteButton
          style={isNoteActive ? "invisible lg:visible" : "visible"}
        />
        {page === "/archived" && (
          <p
            className={clsx(
              "text-sm w-full lg:max-w-60 text-neutral-700",
              isNoteActive ? "hidden lg:block" : "block",
            )}
          >
            All your archived notes are stored here. You can restore or delete
            them anytime.
          </p>
        )}
        {page === "/tags/" && (
          <p
            className={clsx(
              "text-sm w-full lg:max-w-60 text-neutral-700",
              isNoteActive ? "hidden lg:block" : "block",
            )}
          >
            All notes with the ”{tagSlug}” tag are shown here.
          </p>
        )}
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
          <CreateNote setTitle={setNewTitle} userNotes={userNotes} />
        </div>
      )}
    </>
  );
};

export default ClientNote;
