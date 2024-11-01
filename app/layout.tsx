import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

const fontSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",

 });

export const metadata: Metadata = {
  title: "Patient Management System",
  description:
    "Tutorial on how to build a patient management system from https://www.youtube.com/watch?v=lEflo_sc82g&t=47s",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable
          )}
          >
        {children}
      </body>
    </html>
  );
}
