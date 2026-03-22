import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import ChatWidgetLoader from "@/components/chat/ChatWidgetLoader";
import Footer from "@/src/components/ui/Footer";
import Navbar from "@/components/Navbar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "drooov - Industrial Rapid Roller Doors",
  description:
    "Professional rapid roller door systems for Australian warehouses, cold storage, and distribution centres",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-background font-body text-text-primary antialiased"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
        <ChatWidgetLoader />
      </body>
    </html>
  );
}
