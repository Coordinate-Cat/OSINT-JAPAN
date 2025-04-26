"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export default function NotFound() {
  // useTranslation フックを使用して翻訳機能を利用する
  const { t, ready } = useTranslation();
  // クライアントサイドでのレンダリングかを判定するstate
  const [mounted, setMounted] = useState(false);

  // コンポーネントがマウントされた後に表示を有効化
  useEffect(() => {
    if (ready) {
      setMounted(true);
    }
  }, [ready]);

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
            {t("notFound.title")}
          </p>
          <p className="mt-2">
            {t("notFound.message")} <br />
            {t("notFound.suggestion")}
          </p>
          <div className="w-full text-center">
            <Link href="/" className="underline">
              {t("notFound.homeLink")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
