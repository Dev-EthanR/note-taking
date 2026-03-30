import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SettingsNav from "./components/SettingsNav";
import ColorTheme from "./components/ColorTheme";
import clsx from "clsx";
import FontTheme from "./components/FontTheme";
import ChangePassword from "./components/ChangePassword";

interface Props {
  searchParams: Promise<{ tab?: string }>;
}

const Settings = async ({ searchParams }: Props) => {
  const session = await auth();
  if (!session) return redirect("/auth/login");

  const tab = await searchParams;
  const activeTab = tab.tab ?? null;

  const user = await prisma.settings.findUnique({
    where: {
      userId: session.user?.id,
    },
  });

  return (
    <div className="flex gap-3">
      <div
        className={clsx(
          "min-h-[calc(100vh-var(--navheader-height))] lg:border-r border-neutral-200 dark:border-neutral-800 pl-8 py-5 pr-4 w-full lg:w-70",
          activeTab && "hidden lg:block",
        )}
      >
        <SettingsNav />
      </div>

      <div
        className={clsx(
          "py-6 px-4 w-full max-w-137.5",
          !activeTab && "hidden lg:block",
        )}
      >
        {activeTab === "color-theme" && (
          <ColorTheme currentTheme={user?.theme} />
        )}
        {activeTab === "font-theme" && <FontTheme currentFont={user?.font} />}
        {activeTab === "change-password" && <ChangePassword />}
      </div>
    </div>
  );
};

export default Settings;
