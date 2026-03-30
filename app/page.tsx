import ArchiveNote from "@/components/notes/actions/ArchiveNote";
import ClientNote from "@/components/notes/ClientNote";
import DeleteNote from "@/components/notes/actions/DeleteNote";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import clsx from "clsx";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ note?: string; search?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const session = await auth();
  const param = await searchParams;
  if (!session) redirect("/auth/login");

  const notes = param.search
    ? await prisma.note.findMany({
        where: {
          userId: session.user?.id,
          OR: [
            {
              title: {
                contains: param.search,
                mode: "insensitive",
              },
            },
            {
              content: {
                contains: param.search,
                mode: "insensitive",
              },
            },
            {
              tags: {
                hasSome: [param.search],
              },
            },
          ],
        },
      })
    : await prisma.note.findMany({
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
        param.note && "flex ",
      )}
    >
      <ClientNote isNoteActive={param.note} userNotes={notes} />
      <div className={notes.length < 1 ? "invisible" : ""}>
        <div className="hidden lg:block pl-4 py-5 space-y-3">
          <ArchiveNote userNotes={notes} archive={true} />
          <DeleteNote userNotes={notes} />
        </div>
      </div>
    </div>
  );
}
