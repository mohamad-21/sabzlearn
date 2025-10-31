import type { Metadata } from "next";
import LocalFont from "next/font/local";
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes"

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
  title: "آکادمی آموزشی برنامه نویسی سبزلرن",
  description: "آموزش برنامه‌نویسی، کاربردی و پروژه محور | با دوره‌های متنوع و پشتیبانی قوی | سبزلرن در کنار شما از صفر تا استخدام.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl" suppressHydrationWarning>
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
        </NextThemesProvider>
      </body>
    </html>
  );
}
