"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import SettingsCard from "./SettingsCard";

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
    <SettingsCard
      title={"Font Theme"}
      description={"Choose your preferred font theme"}
      groups={groups}
      currentValue={{ currentValue: currentFont, fallback: "Sans" }}
      onSubmit={onSubmit}
    />
  );
};

export default FontTheme;
