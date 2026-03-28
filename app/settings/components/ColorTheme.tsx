// refactor
"use client";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import axios from "axios";
import { useRouter } from "next/navigation";
import RadioInput from "./RadioInput";

const ColorTheme = ({ currentTheme }: { currentTheme: string | undefined }) => {
  const groups = [
    {
      id: "light-theme",
      value: "Light",
      imageSrc: "/images/icon-sun.svg",
      title: "Light Mode",
      description: "Pick a clean and classic light theme",
    },
    {
      id: "dark-theme",
      value: "Dark",
      imageSrc: "/images/icon-moon.svg",
      title: "Dark Mode",
      description: "Select a sleek and modern dark theme",
    },
    // {
    //   id: "system-theme",
    //   value: "System",
    //   imageSrc: "/images/icon-system-theme.svg",
    //   title: "System",
    //   description: "Adapts to your device’s theme",
    // },
  ];
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    const theme = formData.get("theme");
    await axios.patch("/api/settings", { theme });
    router.refresh();
  }
  return (
    <div>
      <h2 className="text-neutral-950 font-bold dark:text-white">
        Color Theme
      </h2>
      <p className="text-neutral-950 dark:text-neutral-300 mb-7">
        Choose your Color Theme
      </p>
      <form className="flex flex-col gap-4" action={onSubmit}>
        <RadioGroup
          defaultValue={currentTheme || "Light"}
          className="w-full"
          name="theme"
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

export default ColorTheme;
