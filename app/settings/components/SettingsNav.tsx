"use client";
import { NavLink } from "@/components/navbar/navlink";
import { useSearchParams } from "next/navigation";
import SettingNavItem from "./SettingNavItem";
import Image from "next/image";
import { signOut } from "next-auth/react";

const SettingsNav = () => {
  const searchParams = useSearchParams();
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
      icon: "/images/icon-sun.svg",
    },
  ];
  return (
    <div className="min-h-[calc(100vh-var(--navheader-height))] lg:border-r border-neutral-200 pl-8 py-5 pr-4 w-full lg:w-70">
      <h1 className="text-neutral-950 text-2xl font-bold lg:hidden mb-3 ">
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
        <li className="border-t pt-3 border-neutral-200 w-full">
          <button onClick={() => signOut({ callbackUrl: "/" })}>
            <div className="flex gap-x-2 items-center">
              <Image
                src={"/images/icon-logout.svg"}
                alt=""
                width={24}
                height={24}
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
