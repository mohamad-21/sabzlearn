import type { Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import LocalFont from "next/font/local";
import NextTopLoader from 'nextjs-toploader';
import { Toaster as HotToaster } from 'react-hot-toast';
import "./globals.css";

const vazirFont = LocalFont({
  src: [
    {
      path: "../assets/fonts/Vazir-Medium.ttf",
      weight: "500"
    },
    {
      path: "../assets/fonts/Vazir-Bold.ttf",
      weight: "600"
    },
  ]
});

export const metadata: Metadata = {
  title: "سبزلرن",
  description: "آموزش برنامه‌نویسی، کاربردی و پروژه محور | با دوره‌های متنوع و پشتیبانی قوی | سبزلرن در کنار شما از صفر تا استخدام.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body
        className={`${vazirFont.className} antialiased bg-background text-foreground min-h-screen`}
      >
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          enableColorScheme
        >
          {children}
          <HotToaster toastOptions={{
            className: "!bg-card !text-muted-foreground"
          }} position="bottom-left" />
          <NextTopLoader showSpinner={false} color="var(--primary)" />
        </NextThemesProvider>
      </body>
    </html>
  );
}
