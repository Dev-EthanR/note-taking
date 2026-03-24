import "server-only";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const Tags = async () => {
  const session = await auth();

  if (!session) return redirect("/auth/login");

  const data = await prisma.note.findMany({
    where: {
      id: session.user?.id,
    },
  });

  return (
    <div>
      {data.map((tag) => (
        <p key={tag.id}>{tag.tags}</p>
      ))}
    </div>
  );
};

export default Tags;
