"use client";

import { Suspense } from "react";
import { LoadingPlaceholder } from "../_components/common";
// import { UnderConstructionCard } from "../_components/pages/HomePage";
import { useI18nReady } from "../hooks";
import { Card } from "@/_components/ui/card";
import LanguageSwitcher from "@/_components/pages/HomePage/LanguageSwitcher";
import { DarkModeToggle } from "@/_components/pages/HomePage/DarkModeToggle";
import { useTranslation } from "react-i18next";
import { QRCodeSVG } from "qrcode.react";

/**
 * ホームページコンポーネント
 * OSINT研究に関する情報を表示するページ
 */
export default function Home() {
  // i18nの準備が完了したかどうかを監視するカスタムフック
  const isI18nReady = useI18nReady();
  // 翻訳機能を使用するためのフック
  const { t } = useTranslation();

  return (
    <main className="flex h-screen items-start justify-center bg-[#ccc] p-2 text-stone-800 dark:bg-gray-900 dark:text-gray-100">
      {!isI18nReady ? (
        <LoadingPlaceholder />
      ) : (
        <Suspense fallback={<LoadingPlaceholder />}>
          {/* <UnderConstructionCard /> */}
          {/* Title */}
          <div className="grid w-full grid-cols-1 gap-0.5 xl:grid-cols-3">
            <Card className="w-full bg-[#EFEFEF] p-4 sm:col-span-1 xl:col-span-2 dark:bg-gray-800">
              <h1 className="text-2xl font-bold">{t("mainPage.title")}</h1>
              <div className="mt-2 text-stone-500 italic dark:text-gray-400">
                <p>{t("mainPage.description1")}</p>
                <p>{t("mainPage.description2")}</p>
              </div>
            </Card>
            <Card className="w-full justify-between bg-[#EFEFEF] p-4 dark:bg-gray-800">
              <h2 className="text-2xl font-bold">
                {t("mainPage.languageTitle")}
              </h2>
              <LanguageSwitcher />
            </Card>
            <Card className="w-full justify-between bg-[#EFEFEF] p-4 dark:bg-gray-800">
              <h2 className="text-2xl font-bold">
                {t("mainPage.darkModeTitle")}
              </h2>
              <DarkModeToggle />
            </Card>
            <Card className="w-full justify-between bg-[#EFEFEF] p-4 dark:bg-gray-800">
              <h2 className="text-2xl font-bold">Resources</h2>
            </Card>
            <Card className="w-full justify-between bg-[#EFEFEF] p-4 dark:bg-gray-800">
              <h2 className="text-2xl font-bold">
                {t("mainPage.qrCodeTitle")}
              </h2>
              <QRCodeSVG
                value="https://www.osint-japan.jp/"
                title={"QR Code for OSINT Japan"}
              />
            </Card>
            <Card className="w-full justify-between bg-[#EFEFEF] p-4 dark:bg-gray-800">
              <h2 className="text-2xl font-bold">GitHub</h2>
              <a
                href="https://github.com/Coordinate-Cat/OSINT-JAPAN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 underline hover:text-stone-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Coordinate-Cat/OSINT-JAPAN
              </a>
            </Card>
          </div>
        </Suspense>
      )}
    </main>
  );
}
