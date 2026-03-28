// REFACTOR
"use client";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";
import { links } from "./navlink";
import NavTags from "./NavTags";
import clsx from "clsx";

const NavLinks = ({ tags }: { tags: string[] }) => {
  const pathname = usePathname();
  return (
    <>
      <nav className="fixed bottom-0 w-full lg:hidden">
        <ul className="flex px-4 py-3 justify-between lg:flex-col bg-white dark:bg-neutral-950 shadow-2xl shadow-neutral-700 dark:shadow-neutral-600 border-t border-neutral-200 dark:border-neutral-800">
          {links.map((link) => (
            <li
              key={link.name}
              className={clsx(
                `md:border-r  flex flex-1 justify-center`,
                link.noBorder && "border-none",
              )}
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
                className={clsx(
                  `border-b-2 dark:border-b-neutral-800 `,
                  link.noBorder ? "border-none" : "pb-4",
                )}
              >
                <NavItem
                  linkItem={link}
                  isActive={pathname === link.href}
                  showChevron={true}
                />
              </li>
            ))}
          {tags.length !== 0 && (
            <p className="text-neutral-500  text-sm px-2">Tags</p>
          )}
          <NavTags tags={tags} />
        </ul>
      </nav>
    </>
  );
};

export default NavLinks;
