import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  const password = await bcrypt.hash("123", 10);
  await prisma.user.create({
    data: {
      email: "text@gmail.com",
      password,
    },
  });
}

main();
