import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

const Settings = async () => {
  const session = await auth();

  if (!session) return redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
  });
  return <div>{user?.email}</div>;
};

export default Settings;
