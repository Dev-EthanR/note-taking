import ClientNote from "@/components/notes/ClientNote";
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
      <ClientNote isNoteActive={note.note} userNotes={userNotes} />
    </div>
  );
}
