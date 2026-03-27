import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SettingsNav from "./components/SettingsNav";

const Settings = async () => {
  const session = await auth();

  if (!session) return redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
  });
  return (
    <div className="flex gap-3">
      <SettingsNav />
      <div className="lg:block hidden">{user?.email}</div>
    </div>
  );
};

export default Settings;
