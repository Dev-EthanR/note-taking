import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json([], { status: 401 });
    const body = await req.json();

    const { archive }: { archive: boolean } = body;

    const { id } = await params;

    const note = await prisma.note.findUnique({
      where: { id },
    });

    if (!note)
      return NextResponse.json({ error: "Note not found" }, { status: 404 });

    if (note?.userId !== session?.user?.id)
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 },
      );

    const archiveNote = await prisma.note.update({
      where: { id: note.id },
      data: {
        status: archive ? "Archived" : null,
      },
    });

    return NextResponse.json(archiveNote, { status: 200 });
  } catch (err) {
    console.error("GET /api/note/[id] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
