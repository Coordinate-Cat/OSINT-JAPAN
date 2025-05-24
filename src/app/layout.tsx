import { inter, notoSansJP } from "@/app/ui/fonts";
import localFont from "next/font/local";
import { Metadata } from "next";
import "@/styles/globals.css";
import I18nProvider from "@/i18n/provider";
// Header のインポート方法を変更して、名前付きインポートを使用
import { Header } from "@/_components/common/Header/Header";

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
    // サーバーサイドでは常に日本語をデフォルトとする
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} lang-ja`}
    >
      <body
        suppressHydrationWarning
        // クラス構成を変更して、tailwindのフォントファミリーを適用
        className="text-base antialiased"
      >
        <I18nProvider>
          {/* クライアントサイドでフォントをロードするコンポーネント */}
          <Header />
          <main>{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}
