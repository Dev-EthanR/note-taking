import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) redirect("/login");
  return (
    <div>
      <Button size="lg" variant="primary">
        <span className="select-none">+</span>Create New Note
      </Button>
    </div>
  );
}
