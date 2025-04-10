import { Inter, Noto_Sans_JP } from "next/font/google";
import { Metadata } from "next";
import "@/styles/globals.css";

// 英語フォントの読み込み
const inter = Inter({ subsets: ["latin"] });
// 日本語フォントの読み込み
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "トップページ",
  description: "Resource site for osint in Japan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        suppressHydrationWarning
        className={`${inter.className} ${notoSansJP.className}`}
      >
        {children}
      </body>
    </html>
  );
}
