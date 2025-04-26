"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * エラーページコンポーネント
 * ランタイムエラーが発生した際に表示される
 * @param error - 発生したエラーオブジェクト
 * @param reset - エラーからの回復を試みる関数
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // 翻訳フックを呼び出し
  const { t, ready } = useTranslation();
  // クライアントサイドでのレンダリングかを判定するstate
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // エラーをコンソールに出力
    console.error(error);

    // i18nの準備ができたらマウント状態を更新
    if (ready) {
      setMounted(true);
    }
  }, [error, ready]);

  // i18nの準備ができるまでローディング表示
  if (!mounted) {
    return (
      <main className="flex h-screen items-center justify-center bg-neutral-600 p-2">
        <div className="font-kikai max-w-md border-2 bg-white p-2 text-center text-black">
          <p>読み込み中...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-screen items-center justify-center bg-neutral-600 p-2">
      <div className="font-kikai max-w-md border-2 bg-white p-2 text-left text-black">
        <div>
          <p className="bg-red-600 text-center text-white">
            {t("error.title")}
          </p>
          <p className="mt-2">{t("error.message")}</p>
          <div className="mt-4 flex justify-around">
            <Link href="/" className="underline">
              {t("error.homeLink")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
