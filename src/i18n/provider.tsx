"use client";

import React, { useState, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/config";

/**
 * i18n設定を初期化するためのプロバイダーコンポーネント
 * クライアントサイドでのみ実際の翻訳を提供し、ハイドレーションエラーを防止する
 * @param children - 子要素
 */
export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // クライアントサイドでのレンダリングかを判定するstate
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでの初期化処理
  useEffect(() => {
    // マウント時に言語設定を復元
    try {
      const savedLang = localStorage.getItem("i18nextLng");
      if (savedLang && savedLang !== i18n.language) {
        i18n.changeLanguage(savedLang);
      }
    } catch (e) {
      console.error("言語設定の読み込みに失敗しました:", e);
    }

    // 言語変更を検知してHTMLのlang属性を更新
    const handleLanguageChange = () => {
      document.documentElement.lang = i18n.language;
      try {
        localStorage.setItem("i18nextLng", i18n.language);
      } catch (e) {
        console.error("言語設定の保存に失敗しました:", e);
      }
    };

    // 言語変更イベントのリスナーを設定
    i18n.on("languageChanged", handleLanguageChange);

    // 初期lang属性の設定
    document.documentElement.lang = i18n.language;

    // マウント完了フラグを設定
    setMounted(true);

    // クリーンアップ関数
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {mounted ? (
        children
      ) : (
        <div style={{ visibility: "hidden" }}>{children}</div>
      )}
    </I18nextProvider>
  );
}
