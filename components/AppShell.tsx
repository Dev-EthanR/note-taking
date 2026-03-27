"use client";
import { usePathname } from "next/navigation";
import NavHeader from "./navbar/NavHeader";
import TopBar from "./navbar/TopBar";
import { Settings } from "@/generated/prisma/client";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  navbar: React.JSX.Element;
  user: Settings | null | undefined;
}

function AppShell({ children, navbar, user }: Props) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) return <>{children}</>;

  return (
    <main
      className={clsx(
        "dark:bg-neutral-700 lg:flex",
        user?.font === "Monospace" && "font-mono",
        user?.font === "Serif" && "font-serif",
        user?.font === "Sans" && "font-sans",
        !user?.font && "font-sans",
      )}
    >
      {isAuthPage ? (
        children
      ) : (
        <>
          <NavHeader screen="mobile" />
          {navbar}
          <div className="w-full">
            <TopBar />
            {children}
          </div>
        </>
      )}
    </main>
  );
}

export default AppShell;
