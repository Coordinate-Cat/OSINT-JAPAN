"use client";

import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, useEffect } from "react";
import { inter } from "@/app/ui/fonts";
import Link from "next/link";

/**
 * @public
 * ヘッダーコンポーネント
 * サイト名と言語切り替えボタンを表示する
 * ハイドレーションエラーを防ぐためにクライアントサイドでのみ完全に表示
 * 見出しには言語に関わらずInterフォントを適用
 */
export function Header() {
  const { t } = useTranslation();
  // クライアントサイドでのレンダリングかを判定するstate
  const [mounted, setMounted] = useState(false);

  // コンポーネントがマウントされた後に表示を有効化
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full px-2 py-2 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">
          {/* 言語に関わらずInterフォントを強制適用する */}
          <Link href="/" className="text-white">
            <h1
              className={inter.className}
              style={{ fontFamily: "Inter, sans-serif !important" }}
            >
              OJ
            </h1>
          </Link>
        </div>
        {/* マウント前はLanguageSwitcherを表示しない */}
        {mounted ? <LanguageSwitcher /> : <div className="w-[100px]" />}
      </div>
    </header>
  );
}
