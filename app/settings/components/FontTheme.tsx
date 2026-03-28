// refactor
"use client";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import axios from "axios";
import { useRouter } from "next/navigation";
import RadioInput from "./RadioInput";

const FontTheme = ({ currentFont }: { currentFont: string | undefined }) => {
  const groups = [
    {
      id: "sans-serif",
      value: "Sans",
      imageSrc: "/images/icon-font-sans-serif.svg",
      title: "Sans-serif ",
      description: "Clean and modern, easy to read.",
    },
    {
      id: "serif",
      value: "Serif",
      imageSrc: "/images/icon-font-serif.svg",
      title: "Serif",
      description: "Classic and elegant for a timeless feel.",
    },
    {
      id: "monospace",
      value: "Monospace",
      imageSrc: "/images/icon-font-monospace.svg",
      title: "Monospace",
      description: "Code-like, great for a technical vibe.",
    },
  ];
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    const font = formData.get("font");
    await axios.patch("/api/settings", { font });
    router.refresh();
  }
  return (
    <div>
      <h2 className="text-neutral-950 font-bold dark:text-white">Font Theme</h2>
      <p className="text-neutral-950 dark:text-neutral-300 mb-7">
        Choose your font theme:
      </p>
      <form className="flex flex-col gap-4" action={onSubmit}>
        <RadioGroup
          defaultValue={currentFont || "Sans"}
          className="w-full"
          name="font"
        >
          {groups.map((item) => (
            <RadioInput item={item} key={item.id} />
          ))}
        </RadioGroup>
        <Button variant="primary" size="xl" className="self-end">
          Apply Changes
        </Button>
      </form>
    </div>
  );
};

export default FontTheme;
