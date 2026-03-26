"use client";
import NoteAction from "./NoteAction";

const DeleteNote = () => {
  return (
    <NoteAction
      name="Delete Note"
      imageUrl="/images/icon-delete.svg"
      handleClick={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export default DeleteNote;
