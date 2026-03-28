import { auth } from "@/lib/auth";
import NavHeader from "./NavHeader";
import NavLinks from "./Navlinks";
import { prisma } from "@/lib/prisma";

const Navbar = async () => {
  const session = await auth();

  if (!session?.user) return null;

  const notes = await prisma.note.findMany({
    where: { userId: session.user.id },
    select: { tags: true },
  });

  const uniqueTags = [...new Set(notes.flatMap((n) => n.tags))];

  return (
    <>
      <div className="lg:border-r lg:border-neutral-300 dark:border-neutral-800 lg:min-w-58 2xl:min-w-68 lg:min-h-screen 2xl:px-3  lg:py-3 lg:gap-y-4">
        <NavHeader screen="desktop" />
        <NavLinks tags={uniqueTags} />
      </div>
    </>
  );
};

export default Navbar;
