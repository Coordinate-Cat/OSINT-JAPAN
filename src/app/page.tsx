"use client";

import { Suspense } from "react";
import { LoadingPlaceholder, Header, ClientOnly } from "../_components/common";
import { useI18nReady } from "../hooks";
import { OSINTCategoriesSection } from "@/_components/pages/HomePage";
import { useTranslation } from "react-i18next";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import { ClipboardCopy } from "lucide-react";

/**
 * ホームページコンポーネント
 * OSINT研究に関する情報を表示するページ
 */
export default function Home() {
  // i18nの準備が完了したかどうかを監視するカスタムフック
  const isI18nReady = useI18nReady();
  // 翻訳機能を使用するためのフック
  const { t } = useTranslation();

  // SSR時とクライアント時の一貫性を保つため、常にレンダリングする
  // ただし、i18nが準備できていない場合はフォールバックを表示

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <Header />

      <main className="relative px-2">
        {/* ヒーローセクション */}
        <section className="pt-20 pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-center text-center">
              <div className="flex items-center text-white sm:text-6xl">
                <img src="OJ.svg" alt="OJ" className="h-16 w-16" />
                <p className="ml-2 text-4xl text-gray-300">
                  {t(
                    "home.subtitle",
                    "- this is a numerous collection of various OSINT tools",
                  )}
                </p>
              </div>
            </div>

            <p className="mb-8 text-lg text-gray-300">
              {t(
                "home.description",
                "Electronic scientific library of open access OSINT tools. The site catalog is regularly overgrown with tools of articles from various scientific publications. Grouped by journals and headings.",
              )}
            </p>
          </div>
        </section>

        {/* OSINTカテゴリセクション */}
        <section id="osint-sections" className="pb-20">
          <Suspense fallback={<LoadingPlaceholder />}>
            <OSINTCategoriesSection />
          </Suspense>
        </section>

        {/* フッター情報 */}
        <footer className="py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  {t("footer.about", "About OSINT Japan")}
                </h3>
                <p className="text-sm text-gray-400">
                  {t(
                    "footer.description",
                    "A comprehensive collection of OSINT tools and resources for investigation and research purposes.",
                  )}
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  {t("footer.stats", "Statistics")}
                </h3>
                <p className="text-sm text-gray-400">
                  {t("footer.totalCategories", "46 Categories")}
                </p>
                <p className="text-sm text-gray-400">
                  {t("footer.totalTools", "1000+ Tools")}
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  {t("footer.contact", "Contact")}
                </h3>
                <p className="text-sm text-gray-400">tetrapasta02@gmail.com</p>
              </div>

              {/* このサイトのurlとqr */}
              <div className="">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  このサイトのQRとURL
                </h3>
                <div className="flex flex-col space-y-2">
                  <div className="mr-1 flex w-fit rounded bg-white p-1">
                    <ClientOnly
                      fallback={
                        <div className="h-32 w-32 animate-pulse bg-gray-200" />
                      }
                    >
                      <QRCodeSVG
                        value="https://www.osint-japan.jp/"
                        title="QR Code for OSINT Japan"
                        size={128}
                      />
                    </ClientOnly>
                  </div>
                  <div className="flex items-start space-x-2">
                    <p className="underline select-all">
                      https://www.osint-japan.jp/
                    </p>
                    <div className="ml-1 flex items-center">
                      <button
                        className="rounded bg-white px-2 py-1 text-sm text-[#1c1c1c] hover:cursor-pointer hover:bg-[#1c1c1c] hover:text-white"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            "https://www.osint-japan.jp/",
                          )
                        }
                      >
                        <ClipboardCopy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
