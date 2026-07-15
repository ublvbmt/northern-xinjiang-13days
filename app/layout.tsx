import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "北疆十三日旅行手記",
  description: "北疆十三日互動旅行手冊：每日路線、景點介紹、餐食、住宿、航班與行程路線。",
  other: {
    "theme-color": "#f6f1e7",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
