import { Note } from "@/generated/prisma/client";
import axios from "axios";
import { useState, useEffect } from "react";

export function useNote(noteID: string | undefined) {
  const [noteData, setNoteData] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!noteID || noteID === "create") {
      setNoteData(null);
      return;
    }
    async function getNote() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/note/${noteID}`);
        setNoteData(response.data);
      } catch (err: any) {
        if (err.response?.status === 404) return;
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getNote();
  }, [noteID]);

  return { noteData, setNoteData, loading };
}
