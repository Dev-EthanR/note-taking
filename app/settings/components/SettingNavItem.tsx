import Link from "next/link";
import Image from "next/image";
import { NavLink } from "@/components/navbar/navlink";
import clsx from "clsx";

interface Props {
  linkItem: NavLink;
  isActive: boolean;
  showChevron?: boolean;
}
const SettingNavItem = ({ linkItem, isActive, showChevron }: Props) => {
  return (
    <Link
      href={linkItem.href}
      className={clsx(
        "flex items-center justify-between  py-2 lg:px-3 w-full rounded-sm",
        isActive && "lg:bg-neutral-100",
      )}
    >
      <div className="flex gap-x-2 items-center">
        <Image src={linkItem.icon} alt={linkItem.name} width={24} height={24} />
        <span>{linkItem.name}</span>
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

export default SettingNavItem;
