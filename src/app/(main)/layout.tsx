import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import HeaderWrapper from "@/components/ui/HeaderWrapper";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <HeaderWrapper />
      <main className="space-y-10 w-full flex flex-col items-center py-12 px-6 min-h-[100dvh]">
        {children}
      </main>
      <Footer />
    </>
  );
}