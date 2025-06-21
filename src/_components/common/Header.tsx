"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DarkModeToggle } from "@/_components/pages/HomePage/DarkModeToggle";
import LanguageSwitcher from "@/_components/pages/HomePage/LanguageSwitcher";
import { useI18nReady } from "@/hooks";

/**
 * メインヘッダーコンポーネント
 * ナビゲーション、検索、設定機能を含む
 */
export function Header() {
  const { t } = useTranslation();
  const isI18nReady = useI18nReady();
  const [showQR, setShowQR] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollOpacity, setScrollOpacity] = useState(1);

  // スクロール位置を監視して透明度を連続的に制御
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const startFade = 250; // フェード開始位置
      const endFade = 350; // フェード完了位置

      if (scrollY <= startFade) {
        setScrollOpacity(1); // 完全に表示
      } else if (scrollY >= endFade) {
        setScrollOpacity(0); // 完全に非表示
      } else {
        // 段階的に透明度を変更
        const progress = (scrollY - startFade) / (endFade - startFade);
        setScrollOpacity(1 - progress);
      }
    };

    // 初期値の設定
    handleScroll();

    // スクロールイベントの監視
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    // クリーンアップ
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1C1C1C] px-2 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* ロゴ */}
          <h1 className="flex items-center">
            <div className="flex items-center gap-3">
              {/* OJロゴ - 常に表示 */}
              <img src="OJ.svg" alt="OJ" className="h-8 w-8" />
              {/* OSINTJAPANテキスト - スクロールに応じて透明度変更 */}
              <p
                className="text-xl font-bold whitespace-nowrap transition-all duration-300 ease-out"
                style={{
                  opacity: scrollOpacity,
                  transform: `translateX(${(1 - scrollOpacity) * 20}px)`,
                  width: scrollOpacity < 0.1 ? "0px" : "auto",
                  overflow: scrollOpacity < 0.1 ? "hidden" : "visible",
                }}
              >
                OSINT JAPAN
              </p>
            </div>
          </h1>

          {/* 中央の検索バー */}
          {/* <div className="mx-8 hidden max-w-lg flex-1 md:block">
            <div className="relative">
              <input
                type="text"
                placeholder={t(
                  "header.searchPlaceholder",
                  "Search OSINT tools...",
                )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pr-4 pl-10 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div> */}

          {/* 右側のメニュー */}
          <div className="flex items-center space-x-4">
            {/* 言語切り替え */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            {/* ダークモード切り替え */}
            <div className="hidden sm:block">
              <DarkModeToggle />
            </div>
            {/* GitHubリンク */}
            <a
              href="https://github.com/Coordinate-Cat/OSINT-JAPAN"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 transition-colors hover:bg-white hover:text-[#1c1c1c]"
              title="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
