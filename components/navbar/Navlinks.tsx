// REFACTOR
"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavItem from "./NavItem";
import { links } from "./navlink";
import { checkString } from "@/utils/checkString";

const NavLinks = ({ tags }: { tags: string[] }) => {
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed bottom-0 w-full lg:hidden">
        <ul className="flex px-4 py-3 justify-between lg:flex-col bg-white shadow-2xl shadow-neutral-700 border-t border-neutral-200">
          {links.map((link) => (
            <li
              key={link.name}
              className={`md:border-r  ${link.noBorder && "border-none"} flex flex-1 justify-center`}
            >
              <NavItem
                linkItem={link}
                isActive={
                  link.href === "/tags"
                    ? pathname.startsWith("/tags")
                    : pathname === link.href
                }
              />
            </li>
          ))}
        </ul>
      </nav>
      <nav className="hidden lg:block">
        <ul className="flex flex-col px-4 py-3 justify-between">
          {links
            .filter((link) => link.desktopName && link.href !== "/settings")
            .map((link) => (
              <li
                key={link.name}
                className={`border-b-2 ${link.noBorder ? "border-none" : "pb-4"} `}
              >
                <NavItem
                  linkItem={link}
                  isActive={pathname === link.href}
                  showChevron={true}
                />
              </li>
            ))}
          <p className="text-neutral-500 text-sm px-2">Tags</p>
          <div className="overflow-y-auto max-h-[calc(100vh-var(--navheader-height)-150px)]">
            {tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/tags/${tag.toLowerCase()}`}
                  className={`flex items-center justify-between py-2.5 px-3  ${pathname === "/tags/" + tag.toLowerCase() && "bg-primary-50 text-neutral-950 font-medium"} rounded-sm  `}
                >
                  <div className="flex gap-x-2 items-center">
                    <Image
                      src={"/images/icon-tag.svg"}
                      alt={""}
                      width={24}
                      height={24}
                      className={`${pathname === "/tags/" + tag.toLowerCase() && "filter-primary"}`}
                    />
                    <span className="text-sm max-w-34.5">
                      {checkString(tag, 18)}
                    </span>
                  </div>
                  {pathname === "/tags/" + tag.toLowerCase() && (
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
        </ul>
      </nav>
    </>
  );
};

export default NavLinks;
