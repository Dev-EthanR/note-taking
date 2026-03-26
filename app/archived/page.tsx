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

async function Archive({ searchParams }: Props) {
  const session = await auth();
  const note = await searchParams;

  if (!session) redirect("/auth/login");

  const userNotes = await prisma.note.findMany({
    where: {
      userId: session.user?.id,
      status: "Archived",
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
      <ClientNote
        page="/archived"
        isNoteActive={note.note}
        userNotes={userNotes}
      />
      <div className={userNotes.length < 1 ? "invisible" : ""}>
        <div className="hidden lg:block pl-4 py-5 space-y-3">
          <ArchiveNote
            name="Restore Note"
            imageUrl="/images/icon-restore.svg"
            userNotes={userNotes}
            archive={false}
          />
          <DeleteNote userNotes={userNotes} />
        </div>
      </div>
    </div>
  );
}

export default Archive;
