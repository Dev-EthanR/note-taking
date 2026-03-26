// npx tsx prisma/seed.ts
import { prisma } from "@/lib/prisma";
import data from "../data.json";

async function main() {
  const user = await prisma.user.findFirst({
    where: { id: "cmn3vf2su0000s0j20zluxp5p" },
  });
  if (!user) throw new Error("No user found — log in first to create one");

  for (const note of data.notes) {
    await prisma.note.create({
      data: {
        title: note.title,
        content: note.content,
        tags: note.tags,
        status: note.isArchived ? "Archived" : null,
        userId: user.id,
      },
    });
  }
  console.log("Seeded notes");
}

main().then(() => prisma.$disconnect());
