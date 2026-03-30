import ArchiveNote from "@/components/notes/actions/ArchiveNote";
import DeleteNote from "@/components/notes/actions/DeleteNote";
import ClientNote from "@/components/notes/ClientNote";
import { SearchInput } from "@/components/Search";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ note?: string; search?: string }>;
}

const Search = async ({ searchParams }: Props) => {
  const session = await auth();
  const param = await searchParams;
  if (!session) redirect("/auth/login");

  const notes = await prisma.note.findMany({
    where: {
      userId: session.user?.id,
      OR: [
        {
          title: {
            contains: param.search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: param.search,
            mode: "insensitive",
          },
        },
        ...(param.search
          ? [
              {
                tags: {
                  hasSome: [param.search],
                },
              },
            ]
          : []),
      ],
    },
  });

  return (
    <div className="lg:hidden px-4 md:px-8 py-5 md:py-6 space-y-4">
      {!param.note && (
        <>
          <h1 className="font-bold text-2xl ">Search</h1>
          <SearchInput />
        </>
      )}

      <ClientNote isNoteActive={param.note} userNotes={notes} page="search" />
      <div className={notes.length < 1 ? "invisible" : ""}>
        <div className="hidden lg:block pl-4 py-5 space-y-3">
          <ArchiveNote userNotes={notes} archive={true} />
          <DeleteNote userNotes={notes} />
        </div>
      </div>
    </div>
  );
};

export default Search;
