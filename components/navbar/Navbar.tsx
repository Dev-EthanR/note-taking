"use client";
import { usePathname } from "next/navigation";
import NavHeader from "./NavHeader";
import NavLinks from "./Navlinks";
import TopBar from "./TopBar";

export interface NavLink {
  name: string;
  href: string;
  icon: string;
  noBorder?: boolean;
  desktopName?: string;
}

export const links: NavLink[] = [
  {
    name: "Home",
    desktopName: "All Notes",
    href: "/",
    icon: "/images/icon-home.svg",
    noBorder: true,
  },
  { name: "Search", href: "/search", icon: "/images/icon-search.svg" },
  {
    name: "Archived",
    desktopName: "Archived Notes",
    href: "/archived",
    icon: "/images/icon-archive.svg",
  },
  { name: "Tags", href: "/tags", icon: "/images/icon-tag.svg" },
  {
    name: "Settings",
    desktopName: "Settings",
    href: "/settings",
    icon: "/images/icon-settings.svg",
    noBorder: true,
  },
];

const Navbar = () => {
  return (
    <>
      <div className="lg:border-r lg:border-neutral-300  lg:w-68 lg:h-screen lg:px-4 lg:py-3 lg:gap-y-4">
        <NavHeader screen="desktop" />
        <NavLinks links={links} />
      </div>
    </>
  );
};

export default Navbar;
