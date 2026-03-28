import { NavLink } from "@/utils/types/navLink";

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
