"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { supportedLngs } from "@/i18n/config";

/**
 * @public
 * 言語切り替えコンポーネント
 * 現在の言語を表示し、クリックすると言語切り替えドロップダウンを表示する
 * 言語切り替え時にフォントも自動的に切り替える
 */
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // コンポーネントがマウントされた後に表示を有効化
  useEffect(() => {
    setMounted(true);

    // 言語設定に基づいてフォントを設定
    if (typeof document !== "undefined") {
      const htmlElement = document.documentElement;

      // htmlのlang属性を設定
      htmlElement.setAttribute("lang", i18n.language);

      // HTML要素に言語に応じたクラスを設定
      htmlElement.classList.remove("lang-ja", "lang-en");
      htmlElement.classList.add(`lang-${i18n.language}`);
    }
  }, [i18n.language]);

  /**
   * 言語を切り替える関数
   * @param lng - 切り替える言語コード
   */
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);

    if (typeof document !== "undefined") {
      const htmlElement = document.documentElement;

      // htmlのlang属性を設定
      htmlElement.setAttribute("lang", lng);

      // HTML要素に言語に応じたクラスを設定
      htmlElement.classList.remove("lang-ja", "lang-en");
      htmlElement.classList.add(`lang-${lng}`);
    }

    setIsOpen(false);
  };

  // 現在の言語を取得
  const currentLanguage =
    supportedLngs[i18n.language as keyof typeof supportedLngs] ||
    supportedLngs.ja;

  // サーバーサイドレンダリング時はコンテンツを表示しない
  if (!mounted) {
    return (
      <div className="relative">
        <button
          className="flex items-center rounded border border-gray-600 px-4 py-2 transition-colors hover:bg-neutral-700"
          aria-expanded={false}
          aria-haspopup="true"
        >
          <span className="opacity-0">placeholder</span>
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded border border-white px-4 py-0.5 transition-colors hover:bg-neutral-700"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-languages-icon lucide-languages"
        >
          <path d="m5 8 6 6" />
          <path d="m4 14 6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="m22 22-5-10-5 10" />
          <path d="M14 18h6" />
        </svg>
        <span>{currentLanguage}</span>
      </button>

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 rounded-md bg-neutral-800 py-1 shadow-lg">
          {Object.entries(supportedLngs).map(([code, name]) => (
            <button
              key={code}
              onClick={() => changeLanguage(code)}
              className={`block w-full px-4 py-2 text-left transition-colors hover:bg-neutral-700 ${
                i18n.language === code ? "bg-neutral-700" : ""
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
