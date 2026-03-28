import clsx from "clsx";
import Image from "next/image";

type Screen = "desktop" | "mobile";

interface Props {
  screen: Screen;
}

const NavHeader = ({ screen }: Props) => {
  return (
    <header
      className={clsx(
        `px-4 py-3 bg-neutral-100 dark:bg-neutral-800 dark:lg:bg-transparent lg:bg-transparent`,
        screen === "mobile" ? "lg:hidden" : "hidden lg:block",
      )}
    >
      <Image
        className="w-23.75 h-7 dark:hidden"
        src="/images/logo.svg"
        alt="logo"
        width={95}
        height={36}
      />
      <Image
        className="w-23.75 h-7  hidden dark:block"
        src="/images/logo-dark.png"
        alt="logo"
        width={95}
        height={36}
      />
    </header>
  );
};

export default NavHeader;
