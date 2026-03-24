import type { Metadata } from "next";
import { Inter, Noto_Serif, Source_Code_Pro, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/Navbar";
import NavHeader from "@/components/navbar/NavHeader";
import TopBar from "@/components/navbar/TopBar";
import AppShell from "@/components/AppShell";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Note",
  description: "note taking application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${inter.variable} ${notoSerif.variable} ${sourceCodePro.variable} antialiased  `}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
