import { useState, useEffect } from "react";

/**
 * ダークモードの状態を管理するカスタムフック
 * SSRに対応し、ハイドレーション問題を完全に回避する
 */
export const useDarkMode = () => {
  // 初期状態はfalseで統一してハイドレーション問題を回避
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // クライアントサイドでのみ実行
    try {
      const savedTheme = localStorage.getItem("darkMode");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      // 保存された設定があればそれを使用、なければシステム設定を使用
      const initialDarkMode =
        savedTheme !== null ? JSON.parse(savedTheme) : systemPrefersDark;

      setIsDarkMode(initialDarkMode);
      updateDocumentClass(initialDarkMode);

      // システムのダークモード設定変更を監視
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        // 手動設定がない場合のみシステム設定に従う
        if (localStorage.getItem("darkMode") === null) {
          setIsDarkMode(e.matches);
          updateDocumentClass(e.matches);
        }
      };

      mediaQuery.addEventListener("change", handleSystemThemeChange);
      setMounted(true);

      return () => {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      };
    } catch (error) {
      // エラー時はデフォルト状態を維持し、マウント状態のみ更新
      setMounted(true);
    }
  }, []);

  /**
   * ダークモードの状態を切り替える
   */
  const toggleDarkMode = () => {
    if (!mounted) return;

    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    try {
      localStorage.setItem("darkMode", JSON.stringify(newMode));
    } catch (e) {
      console.error("ダークモード設定の保存に失敗:", e);
    }

    updateDocumentClass(newMode);
  };

  /**
   * HTMLのdocumentElementにdarkクラスを追加/削除する
   * @param darkMode - ダークモードが有効かどうか
   */
  const updateDocumentClass = (darkMode: boolean) => {
    if (typeof document !== "undefined") {
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  return {
    isDarkMode,
    toggleDarkMode,
    isLoaded: mounted, // マウント状態を読み込み完了として扱う
  };
};
