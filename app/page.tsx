import CreateNote from "@/components/notes/CreateNote";
import CreateNoteButton from "@/components/notes/CreateNoteButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface Props {
  params: {
    name: string;
  };
  searchParams: Promise<{ note?: string }>;
}

export default async function Home({ params, searchParams }: Props) {
  const session = await auth();
  const note = await searchParams;

  if (!session) redirect("/login");
  return (
    <div className="lg:pl-8 flex flex-1 min-h-[calc(100vh-var(--navheader-height))]">
      <div className="lg:border-r lg:border-neutral-300 pt-5 pr-4 min-h-[calc(100vh-var(--navheader-height))]">
        <CreateNoteButton
          style={note.note ? "invisible lg:visible" : "visible"}
        />
      </div>
      {note.note && (
        <div className="pt-5 lg:px-6 lg:border-r lg:border-neutral-300 min-h-[calc(100vh-var(--navheader-height))]">
          <CreateNote />
        </div>
      )}
    </div>
  );
}
