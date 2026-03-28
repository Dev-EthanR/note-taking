import ArchiveNote from "@/components/notes/ArchiveNote";
import ClientNote from "@/components/notes/ClientNote";
import DeleteNote from "@/components/notes/DeleteNote";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ note?: string }>;
  params: { tag: string };
}

const TagPage = async ({ params, searchParams }: Props) => {
  const session = await auth();
  if (!session) redirect("/auth/login");

  const { tag } = await params;
  const note = await searchParams;

  const userNotes = await prisma.note.findMany({
    where: {
      userId: session.user?.id,
      tags: {
        has: tag,
      },
    },

    orderBy: {
      updatedAt: "desc",
    },
  });
  return (
    <div className="py-6 lg:py-0">
      {!note.note && (
        <>
          <Link
            href={"/tags"}
            className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300 text-sm lg:hidden pb-3 px-8"
          >
            <Image
              src="/images/icon-arrow-left.svg"
              alt=""
              width={18}
              height={18}
              className="dark:invert select-none"
            />
            Go Back
          </Link>
          <h1 className="text-neutral-950 dark:text-white text-2xl font-bold px-8 mb-3 lg:hidden">
            <span className="text-neutral-600 dark:text-neutral-300">
              Notes Tagged:{" "}
            </span>
            {tag}
          </h1>
        </>
      )}
      <div
        className={clsx(
          "lg:pl-5 lg:flex flex-1 fill-to-height pr-5",
          note.note && "flex ",
        )}
      >
        <ClientNote
          page="tags"
          isNoteActive={note.note}
          userNotes={userNotes}
          tagSlug={tag}
        />
        <div className="hidden lg:block pl-4 py-5 space-y-3">
          <ArchiveNote userNotes={userNotes} archive={true} />
          <DeleteNote userNotes={userNotes} />
        </div>
      </div>
    </div>
  );
};

export default TagPage;
