// REFACTOR
"use client";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";
import { links } from "./navlink";
import NavTags from "./NavTags";

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
          <NavTags tags={tags} />
        </ul>
      </nav>
    </>
  );
};

export default NavLinks;
