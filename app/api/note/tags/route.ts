import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json([], { status: 401 });

  const notes = await prisma.note.findMany({
    where: { userId: session.user.id },
    select: { tags: true },
  });

  const uniqueTags = [...new Set(notes.flatMap((n) => n.tags))];
  return NextResponse.json(uniqueTags);
}
