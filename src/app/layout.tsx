import { inter } from "@/app/ui/fonts";
import localFont from "next/font/local";
import { Metadata } from "next";
import "@/styles/globals.css";

// KikaiChokokuJISフォントの読み込み
const kikaiChokoku = localFont({
  src: "../../public/font/KikaiChokokuJIS-Md.otf",
  variable: "--font-kikai-chokoku",
  display: "swap",
});

// メタデータの定数定義
const META = {
  title: "Osint Japan",
  description: "Resource site for osint in Japan.",
};

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={kikaiChokoku.variable}>
      <body
        suppressHydrationWarning
        className={`${inter.className} font-kikai`}
      >
        {children}
      </body>
    </html>
  );
}
