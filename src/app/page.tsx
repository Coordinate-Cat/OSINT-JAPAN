"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

/**
 * ホームページコンポーネント
 * 工事中のお知らせを表示するページ
 */
export default function Home() {
  // 翻訳フックを使用して多言語対応を実装
  const { t, ready } = useTranslation();
  // i18nの準備状態を管理するstate
  const [isI18nReady, setIsI18nReady] = useState(false);

  // i18nの準備状態を監視
  useEffect(() => {
    if (ready) {
      setIsI18nReady(true);
    }
  }, [ready]);

  // i18nの準備ができるまでローディング表示
  if (!isI18nReady) {
    return (
      <main className="flex h-screen items-center justify-center bg-neutral-600 p-2">
        <div className="max-w-md border-2 bg-white p-2 text-center text-black">
          <p>読み込み中...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-screen items-center justify-center bg-neutral-600 p-2">
      <div className="max-w-md border-2 bg-white p-2 text-left text-black">
        <p className="bg-red-600 text-center text-white">
          {t("homePage.title")}
        </p>
        <p className="mt-2 mb-8">{t("homePage.description")}</p>
        <div className="flex w-full flex-col px-10">
          <p className="w-fit">
            <span className="w-fit bg-yellow-300">
              {t("homePage.periodLabel")}
            </span>{" "}
          </p>
        </div>
        <div className="flex w-full flex-col px-10">
          <p className="w-fit">{t("homePage.periodValue")}</p>
        </div>
        <div className="flex w-full flex-col px-10">
          <p className="w-fit">
            <span className="w-fit bg-yellow-300">
              {t("homePage.contentLabel")}
            </span>{" "}
          </p>
          <Link href={t("homePage.githubUrl")} className="underline">
            {t("homePage.linkText")}
          </Link>
        </div>
      </div>
    </main>
  );
}
