import ArchiveNote from "@/components/notes/ArchiveNote";
import ClientNote from "@/components/notes/ClientNote";
import DeleteNote from "@/components/notes/DeleteNote";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import clsx from "clsx";
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
      status: null,
    },

    orderBy: {
      updatedAt: "desc",
    },
  });
  return (
    <div
      className={clsx(
        "lg:pl-5 lg:flex flex-1  fill-to-height pr-5",
        note.note && "flex ",
      )}
    >
      <ClientNote isNoteActive={note.note} userNotes={userNotes} />
      <div className={userNotes.length < 1 ? "invisible" : ""}>
        <div className="hidden lg:block pl-4 py-5 space-y-3">
          <ArchiveNote userNotes={userNotes} />
          <DeleteNote userNotes={userNotes} />
        </div>
      </div>
    </div>
  );
}
