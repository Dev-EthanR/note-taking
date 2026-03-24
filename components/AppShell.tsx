"use client";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import Navbar from "./navbar/Navbar";
import NavHeader from "./navbar/NavHeader";
import TopBar from "./navbar/TopBar";

interface Props {
  children: React.ReactNode;
  navbar: React.JSX.Element;
}

function AppShell({ children, navbar }: Props) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) return <>{children}</>;

  return (
    <main className="dark:bg-neutral-700 font-sans lg:flex">
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
