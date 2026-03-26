import ArchiveNote from "@/components/notes/ArchiveNote";
import ClientNote from "@/components/notes/ClientNote";
import DeleteNote from "@/components/notes/DeleteNote";
import NoteActionUi from "@/components/notes/NoteActionUi";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ note?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const session = await auth();
  const note = await searchParams;

  if (!session) redirect("/auth/login");

  const userNotes = await prisma.note.findMany({
    where: {
      userId: session.user?.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="lg:pl-8 flex flex-1 fill-to-height">
      <ClientNote isNoteActive={note.note} userNotes={userNotes} />
      <div className="hidden lg:block pl-4 py-5 space-y-3">
        <ArchiveNote />
        <DeleteNote />
      </div>
    </div>
  );
}
