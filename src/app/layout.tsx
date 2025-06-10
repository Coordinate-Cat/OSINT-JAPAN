import { inter, notoSansJP } from "@/app/ui/fonts";
// import localFont from "next/font/local";
import { Metadata } from "next";
import "@/styles/globals.css";
import I18nProvider from "@/i18n/provider";

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
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${inter.variable} ${notoSansJP.variable} lang-ja`}
    >
      <head>
        {/* ダークモードのフラッシュを防ぐためのスクリプト（ハイドレーション前に実行） */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('darkMode');
                  var isDark = theme !== null ? JSON.parse(theme) : 
                    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  // エラー時は何もしない（デフォルトのライトモードのまま）
                }
              })();
            `,
          }}
        />
      </head>
      <body
        // クラス構成を変更して、tailwindのフォントファミリーを適用
        className="text-base antialiased"
      >
        <I18nProvider>
          {/* クライアントサイドでフォントをロードするコンポーネント */}
          <main>{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}
