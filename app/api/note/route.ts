import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  console.log(session?.user);
  try {
    const body = await req.json();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const newNote = await prisma.note.create({
      data: {
        title: body.title,
        tags: body.tags,
        content: body.note,
        status: body.status,
        userId: session?.user?.id,
      },
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create Application", err },
      { status: 500 },
    );
  }
}
