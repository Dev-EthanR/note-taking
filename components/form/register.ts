"use server";
import { signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function register(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) return { error: "Email already exists" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  await signIn("credentials", { email, password, redirectTo: "/" });
}
