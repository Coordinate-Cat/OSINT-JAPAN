import { Inter, Noto_Sans_JP } from "next/font/google";

// Interフォントを変数として設定（英語用）
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Noto Sans Japaneseフォントを変数として設定（日本語用）
export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-notosans-jp",
  display: "swap",
});
