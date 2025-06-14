import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * i18nの準備状態を監視するカスタムフック
 * SSRとハイドレーションの問題を回避するため、クライアントサイドでのみtrue状態を管理
 * @returns i18nの準備が完了したかどうかを示すブール値
 */
export function useI18nReady(): boolean {
  const { ready, i18n } = useTranslation();
  const [isI18nReady, setIsI18nReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  // クライアントサイドのマウント状態を管理
  useEffect(() => {
    setMounted(true);
  }, []);

  // i18nの準備状態を監視（クライアントサイドでのみ）
  useEffect(() => {
    if (!mounted) return;

    const checkI18nReady = () => {
      // i18nが準備完了かつ言語リソースが読み込まれているかを確認
      const isReady =
        ready &&
        i18n.hasResourceBundle(i18n.language, "translation") &&
        i18n.isInitialized;

      setIsI18nReady(isReady);
    };

    // 初期チェック
    checkI18nReady();

    // 言語変更時の再チェック
    i18n.on("languageChanged", checkI18nReady);
    i18n.on("loaded", checkI18nReady);

    return () => {
      i18n.off("languageChanged", checkI18nReady);
      i18n.off("loaded", checkI18nReady);
    };
  }, [mounted, ready, i18n]);

  // SSR時は常にfalse、クライアント時のみ実際の状態を返す
  return mounted && isI18nReady;
}
