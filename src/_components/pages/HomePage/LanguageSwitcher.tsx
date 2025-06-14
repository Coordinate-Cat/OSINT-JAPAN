"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Switch } from "@/_components/ui/switch";
import { ClientOnly } from "@/_components/common/ClientOnly";
import { useI18nReady } from "@/hooks";

/**
 * 言語切り替えコンポーネント（内部実装）
 */
const LanguageSwitcherInner = () => {
  const { i18n } = useTranslation();
  const isI18nReady = useI18nReady();
  const [mounted, setMounted] = useState(false);
  const [checkedState, setCheckedState] = useState(false);

  // コンポーネントがマウントされた後に状態を同期
  useEffect(() => {
    setMounted(true);

    // i18n準備完了後に言語状態を同期
    if (isI18nReady) {
      setCheckedState(i18n.language === "en");
    }

    // 言語設定に基づいてフォントを設定
    if (typeof document !== "undefined") {
      const htmlElement = document.documentElement;

      // htmlのlang属性を設定
      htmlElement.setAttribute("lang", i18n.language);

      // HTML要素に言語に応じたクラスを設定
      htmlElement.classList.remove("lang-ja", "lang-en");
      htmlElement.classList.add(`lang-${i18n.language}`);
    }
  }, [i18n, isI18nReady]);

  // 言語変更イベントを監視
  useEffect(() => {
    const updateLanguageState = () => {
      if (isI18nReady) {
        setCheckedState(i18n.language === "en");
      }
    };

    i18n.on("languageChanged", updateLanguageState);

    return () => {
      i18n.off("languageChanged", updateLanguageState);
    };
  }, [i18n, isI18nReady]);

  /**
   * 言語を切り替える関数
   * @param checked - スイッチの状態（true: 英語、false: 日本語）
   */
  const changeLanguage = (checked: boolean) => {
    if (!mounted || !isI18nReady) return;

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
        disabled={!mounted || !isI18nReady}
      />
      <span className="text-sm font-medium">English</span>
    </div>
  );
};

/**
 * @public
 * 言語切り替えコンポーネント
 * 言語をスイッチで切り替え、日本語と英語を切り替える
 * SSR対応のためClientOnlyでラップしている
 */
export default function LanguageSwitcher() {
  return (
    <ClientOnly
      fallback={
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium opacity-50">日本語</span>
          <div className="bg-input inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent opacity-50 shadow-xs" />
          <span className="text-sm font-medium opacity-50">English</span>
        </div>
      }
    >
      <LanguageSwitcherInner />
    </ClientOnly>
  );
}
