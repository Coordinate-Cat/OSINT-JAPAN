import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * i18nの準備状態を監視するカスタムフック
 * SSRとハイドレーションの問題を回避するため、クライアントサイドでのみtrue状態を管理
 * @returns i18nの準備が完了したかどうかを示すブール値
 */
export function useI18nReady(): boolean {
  const { ready } = useTranslation();
  const [isI18nReady, setIsI18nReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  // クライアントサイドのマウント状態を管理
  useEffect(() => {
    setMounted(true);
  }, []);

  // i18nの準備状態を監視（クライアントサイドでのみ）
  useEffect(() => {
    if (mounted && ready) {
      setIsI18nReady(true);
    }
  }, [mounted, ready]);

  // SSR時は常にfalse、クライアント時のみ実際の状態を返す
  return mounted && isI18nReady;
}