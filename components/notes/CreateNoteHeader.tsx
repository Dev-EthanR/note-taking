import { PropsWithChildren } from "react";
import Image from "next/image";

interface Props extends PropsWithChildren {
  icon: string;
  title: string;
}

const CreateNoteHeader = ({ icon, title, children }: Props) => {
  return (
    <>
      <div className="flex md:block text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
        <div className="flex items-center  gap-1">
          <Image
            src={icon}
            alt=""
            width={16}
            height={16}
            className="dark:invert select-none"
          />
          <span>{title}</span>
        </div>
      </div>
      {children}
    </>
  );
};

export default CreateNoteHeader;
