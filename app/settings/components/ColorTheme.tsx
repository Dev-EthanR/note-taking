"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import SettingsCard from "./SettingsCard";

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
    <SettingsCard
      title="Color Theme"
      description="Choose your preferred color theme"
      groups={groups}
      currentValue={{ currentValue: currentTheme, fallback: "Light" }}
      onSubmit={onSubmit}
    />
  );
};

export default ColorTheme;
