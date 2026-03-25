import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json([], { status: 401 });
    const { id } = await params;

    const note = await prisma.note.findUnique({
      where: { id },
    });

    if (!note)
      return NextResponse.json({ error: "Note not found" }, { status: 404 });

    return NextResponse.json(note, { status: 200 });
  } catch (err) {
    console.error("GET /api/note/[id] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json([], { status: 401 });

    const { title, tags, content } = body;

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

    const updatedNote = await prisma.note.update({
      where: { id: note.id },
      data: {
        title,
        tags,
        content,
      },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (err) {
    console.error("GET /api/note/[id] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
