import "server-only";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import NavTags from "@/components/navbar/NavTags";

const Tags = async () => {
  const session = await auth();

  if (!session?.user) return redirect("/auth/login");

  const notes = await prisma.note.findMany({
    where: { userId: session.user.id },
    select: { tags: true },
  });

  const uniqueTags = [...new Set(notes.flatMap((n) => n.tags))];

  return (
    <div className="px-8 py-6">
      <h1 className="text-neutral-950 text-2xl font-bold lg:hidden mb-3">
        Tags
      </h1>
      <NavTags tags={uniqueTags} />
    </div>
  );
};

export default Tags;
