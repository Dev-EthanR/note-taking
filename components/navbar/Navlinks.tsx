import { usePathname } from "next/navigation";
import Image from "next/image";
import { getUniqueTags } from "@/app/tags/page";
import Link from "next/link";
import NavItem from "./NavItem";
import { links } from "./navlink";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed bottom-0 w-full lg:hidden">
        <ul className="flex px-4 py-3 justify-between lg:flex-col">
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
          <p className="text-neutral-500">Tags</p>
          {getUniqueTags().map((tag) => (
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
                  <span className="text-sm">{tag}</span>
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
        </ul>
      </nav>
    </>
  );
};

export default NavLinks;
