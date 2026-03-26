"use client";
import NoteAction from "./NoteAction";

const ArchiveNote = () => {
  return (
    <NoteAction
      name="Archive Note"
      imageUrl="/images/icon-archive.svg"
      handleClick={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export default ArchiveNote;
