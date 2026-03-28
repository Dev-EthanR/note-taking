// refactor
"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    {
      id: "system-theme",
      value: "System",
      imageSrc: "/images/icon-system-theme.svg",
      title: "System",
      description: "Adapts to your device’s theme",
    },
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
            <FieldLabel htmlFor={item.id} key={item.id}>
              <Field orientation="horizontal">
                <FieldContent>
                  <span className="bg-white dark:bg-neutral-950 min-w-10 h-10 rounded-xl flex justify-center items-center border border-neutral-200 dark:border-neutral-700">
                    <Image
                      src={item.imageSrc}
                      alt=""
                      width={24}
                      height={24}
                      className="dark:invert select-none"
                    />
                  </span>
                  <div>
                    <FieldTitle className="text-neutral-950 dark:text-white">
                      {item.title}
                    </FieldTitle>
                    <FieldDescription className="text-neutral-700 text-xs lg:text-sm dark:text-neutral-400">
                      {item.description}
                    </FieldDescription>
                  </div>
                </FieldContent>
                <RadioGroupItem
                  value={item.value}
                  id={item.id}
                  className="self-center"
                />
              </Field>
            </FieldLabel>
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
