import AppShell from "@/components/AppShell";
import Navbar from "@/components/navbar/Navbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Inter, Noto_Serif, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import clsx from "clsx";
import Providers from "@/components/ThemeProvider";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  let user;
  if (session) {
    user = await prisma.settings.findUnique({
      where: {
        userId: session.user?.id,
      },
    });
  }

  return (
    <html lang="en" className={cn(geist.variable)}>
      <body
        className={`${inter.variable} ${notoSerif.variable} ${sourceCodePro.variable} antialiased ${user?.theme === "Dark" && "dark"}`}
      >
        <AppShell user={user} navbar={<Navbar />}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
