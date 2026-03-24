import CreateNote from "@/components/notes/CreateNote";
import CreateNoteButton from "@/components/notes/CreateNoteButton";
import PreviewNote from "@/components/notes/PreviewNote";
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
      <div className="lg:border-r lg:border-neutral-300 px-4 py-5 md:px-8 md:py-6 lg:pt-5 lg:pl-0 lg:pr-4 min-h-[calc(100vh-var(--navheader-height))] space-y-2 w-full lg:w-fit">
        <CreateNoteButton
          style={note.note ? "invisible lg:visible" : "visible"}
        />
        {userNotes.map((note) => (
          <PreviewNote key={note.id} note={note} />
        ))}
      </div>
      {note.note && (
        <div className="pt-5 lg:px-6 lg:border-r lg:border-neutral-300 min-h-[calc(100vh-var(--navheader-height))]">
          <CreateNote />
        </div>
      )}
    </div>
  );
}
