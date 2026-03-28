"use client";
import { usePathname } from "next/navigation";
import { links } from "./navlink";
import { SearchInput } from "../Search";
import Image from "next/image";
import Link from "next/link";

const TopBar = () => {
  const pathname = usePathname();
  let title = links.find((n) => n.href === pathname)?.desktopName;

  const isTagsPage = pathname.startsWith("/tags/");
  if (isTagsPage) {
    title = pathname.split("/")[2];
  }
  return (
    <div className="w-full hidden lg:flex justify-between items-center  px-8 h-(--navheader-height) lg:border-b lg:border-neutral-300 dark:lg:border-neutral-800">
      <span className="text-neutral-950 dark:text-white text-2xl font-bold">
        {isTagsPage && <span className="text-neutral-600">Notes Tagged: </span>}
        {title}
      </span>
      <div className="flex gap-2">
        <SearchInput />
        <Link href="/settings" className="flex px-4">
          <Image
            src="/images/icon-settings.svg"
            alt="settings"
            width={24}
            height={24}
            className={"dark:invert select-none"}
          />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
