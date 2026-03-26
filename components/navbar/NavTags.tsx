"use client";
import { checkString } from "@/utils/checkString";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

interface Props {
  tags: string[];
}

const NavTags = ({ tags }: Props) => {
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    if (mediaQuery.matches && pathname === "/tags") {
      redirect("/");
    }
  }, []);
  return (
    <div className="overflow-y-auto max-h-[calc(100vh-var(--navheader-height)-150px)]">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/tags/${tag}`}
            className={`flex items-center justify-between py-2.5 px-3 border-b border-neutral-200 lg:border-none ${pathname === "/tags/" + tag && "bg-primary-50 text-neutral-950 font-medium"} rounded-sm  `}
          >
            <div className="flex gap-x-2 items-center">
              <Image
                src={"/images/icon-tag.svg"}
                alt={""}
                width={24}
                height={24}
                className={`${pathname === "/tags/" + tag && "filter-primary"}`}
              />
              <span className="text-sm max-w-34.5 hidden lg:block">
                {checkString(tag, 18)}
              </span>
              <span className="text-sm w-full block lg:hidden ">{tag}</span>
            </div>
            {pathname === "/tags/" + tag && (
              <Image
                src="/images/icon-chevron-right.svg"
                alt=""
                width={20}
                height={20}
              />
            )}
          </Link>
        </li>
      ))}
    </div>
  );
};

export default NavTags;
