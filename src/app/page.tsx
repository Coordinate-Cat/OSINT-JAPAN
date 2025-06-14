"use client";

import { Suspense } from "react";
import { LoadingPlaceholder, Header, ClientOnly } from "../_components/common";
import { useI18nReady } from "../hooks";
import { OSINTCategoriesSection } from "@/_components/pages/HomePage";
import { useTranslation } from "react-i18next";

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
    <div className="min-h-screen bg-[#1C1C1C] px-2 text-white">
      <Header />

      <main className="relative">
        {/* ヒーローセクション */}
        <section className="pt-20 pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-center text-center">
              <div className="flex items-center text-white sm:text-6xl">
                <img src="./icons/OJ.svg" alt="OJ" className="h-16 w-16" />
                <p className="ml-2 text-4xl text-gray-300">
                  {t(
                    "home.subtitle",
                    "- this is a numerous collection of various OSINT tools",
                  )}
                </p>
              </div>
            </div>

            <p className="mb-8 max-w-3xl text-lg text-gray-300">
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
        <footer className="border-t border-gray-800 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
