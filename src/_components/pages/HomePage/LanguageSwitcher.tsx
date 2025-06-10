"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Switch } from "@/_components/ui/switch";

/**
 * @public
 * 言語切り替えコンポーネント
 * 言語をスイッチで切り替え、日本語と英語を切り替える
 * ハイドレーションエラーを防ぐため、チェック状態を安定化
 */
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [checkedState, setCheckedState] = useState(false);

  // コンポーネントがマウントされた後に状態を同期
  useEffect(() => {
    setMounted(true);
    // 現在の言語状態を一度だけ同期
    setCheckedState(i18n.language === "en");

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
   * @param checked - スイッチの状態（true: 英語、false: 日本語）
   */
  const changeLanguage = (checked: boolean) => {
    if (!mounted) return;
    
    const newLanguage = checked ? "en" : "ja";
    setCheckedState(checked);
    i18n.changeLanguage(newLanguage);
    
    try {
      localStorage.setItem("i18nextLng", newLanguage);
    } catch (e) {
      console.error("言語設定の保存に失敗:", e);
    }

    if (typeof document !== "undefined") {
      const htmlElement = document.documentElement;

      // htmlのlang属性を設定
      htmlElement.setAttribute("lang", newLanguage);

      // HTML要素に言語に応じたクラスを設定
      htmlElement.classList.remove("lang-ja", "lang-en");
      htmlElement.classList.add(`lang-${newLanguage}`);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">日本語</span>
      <Switch
        checked={checkedState}
        onCheckedChange={changeLanguage}
        aria-label="言語切り替え"
        className="data-[state=checked]:bg-blue-500"
        disabled={!mounted}
      />
      <span className="text-sm font-medium">English</span>
    </div>
  );
}