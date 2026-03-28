"use client";
import { useSearchParams } from "next/navigation";
import SettingNavItem from "./SettingNavItem";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { NavLink } from "@/utils/types/navLink";

const settingsLinks: NavLink[] = [
  {
    name: "Color Theme",
    href: "?tab=color-theme",
    icon: "/images/icon-sun.svg",
  },
  {
    name: "Font Theme",
    href: "?tab=font-theme",
    icon: "/images/icon-font.svg",
  },
  {
    name: "Change Password",
    href: "?tab=change-password",
    icon: "/images/icon-lock.svg",
  },
];

const SettingsNav = () => {
  const searchParams = useSearchParams();

  return (
    <div>
      <h1 className="text-neutral-950 dark:text-white text-2xl font-bold lg:hidden mb-3 ">
        Settings
      </h1>
      <ul className="flex flex-col gap-3 ">
        {settingsLinks.map((link) => (
          <SettingNavItem
            key={link.name}
            linkItem={link}
            isActive={searchParams.get("tab") === link.href.split("=")[1]}
            showChevron={true}
          />
        ))}
        <li className="lg:px-4 border-t pt-3 border-neutral-200 dark:border-neutral-800 w-full">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            aria-label="Logout"
          >
            <div className="flex gap-x-2 items-center">
              <Image
                src={"/images/icon-logout.svg"}
                alt=""
                width={24}
                height={24}
                className="dark:invert select-none"
              />
              <span>Logout</span>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SettingsNav;
