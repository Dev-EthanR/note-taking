import Link from "next/link";
import Image from "next/image";
import { NavLink } from "./navlink";

interface Props {
  linkItem: NavLink;
  isActive: boolean;
  showChevron?: boolean;
}
const NavItem = ({ linkItem, isActive, showChevron }: Props) => {
  return (
    <Link
      href={linkItem.href}
      className={`flex items-center justify-center py-1 lg:justify-between lg:py-2.5 lg:px-3 w-17 md:w-20 lg:w-full ${isActive && "bg-primary-50 text-primary-500 lg:text-neutral-950 lg:font-medium"} rounded-sm`}
    >
      <div className="flex flex-col lg:flex-row gap-x-2 items-center">
        <Image
          src={linkItem.icon}
          alt={linkItem.name}
          width={24}
          height={24}
          className={isActive ? "filter-primary" : ""}
        />
        <span className="hidden md:block lg:hidden">{linkItem.name}</span>
        <span className="hidden lg:block lg:text-sm">
          {linkItem.desktopName}
        </span>
      </div>
      {showChevron && isActive && (
        <Image
          src="/images/icon-chevron-right.svg"
          alt=""
          width={20}
          height={20}
        />
      )}
    </Link>
  );
};

export default NavItem;
