"use client";
import { usePathname } from "next/navigation";
import { links } from "./navlink";
import { SearchInput } from "../Search";
import Image from "next/image";
import Link from "next/link";

const TopBar = () => {
  const pathname = usePathname();
  const title = links.find((n) => n.href === pathname)?.desktopName;
  return (
    <div className="w-full hidden lg:flex justify-between items-center  px-8 h-(--navheader-height) lg:border-b lg:border-neutral-300">
      <span className="text-neutral-950 text-2xl font-bold">{title}</span>
      <div className="flex gap-2">
        <SearchInput />
        <Link href="/settings" className="flex px-4">
          <Image
            src="/images/icon-settings.svg"
            alt="settings"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
