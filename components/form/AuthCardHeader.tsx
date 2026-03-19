import Image from "next/image";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";

interface Props {
  title: string;
  description: string;
}

const AuthCardHeader = ({ title, description }: Props) => {
  return (
    <CardHeader className="mb-4">
      <Image
        className="w-23.75 h-7 lg:h-9 mx-auto mb-4 dark:hidden"
        src="/images/logo.svg"
        alt="logo"
        width={95}
        height={36}
      />
      <Image
        className="w-23.75 h-7 lg:h-9 mx-auto mb-4 hidden dark:block"
        src="/images/logo-dark.png"
        alt="logo"
        width={95}
        height={36}
      />

      <CardTitle className="text-neutral-950 dark:text-white font-bold text-2xl tracking-[-0.5px] text-center">
        {title}
      </CardTitle>
      <CardDescription className="text-neutral-600 dark:text-neutral-300 text-center text-sm tracking-[-0.2px]">
        {description}
      </CardDescription>
    </CardHeader>
  );
};

export default AuthCardHeader;
