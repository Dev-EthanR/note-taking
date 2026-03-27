import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json([], { status: 401 });
    const body = await req.json();

    const { theme, font } = body;

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const updatedSetting = await prisma.settings.upsert({
      where: { userId: user.id },
      update: {
        theme,
        font,
      },
      create: {
        userId: user.id,
        theme,
        font,
      },
    });

    return NextResponse.json(updatedSetting, { status: 200 });
  } catch (err) {
    console.error("PATCH /api/settings/theme error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
