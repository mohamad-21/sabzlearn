import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="space-y-10 w-full grid place-items-center py-12 px-6">
        {children}
      </main>
      <Footer />
    </>
  );
}