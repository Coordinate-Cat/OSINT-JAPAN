"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

/**
 * 工事中お知らせカードコンポーネント
 * 工事中の状態や詳細情報を表示する
 */
export function UnderConstructionCard() {
  // 翻訳フックを使用して多言語対応を実装
  const { t } = useTranslation();

  return (
    <div className="max-w-md border-2 bg-white p-2 text-left text-black">
      <p className="bg-red-600 text-center text-white">{t("homePage.title")}</p>
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
  );
}
