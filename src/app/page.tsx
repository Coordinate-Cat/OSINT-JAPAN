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
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <Header />

      <main className="relative">
        {/* ヒーローセクション */}
        <section className="px-4 pt-20 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 flex text-4xl font-bold text-white sm:text-6xl">
              <span className="block">OJ</span>
              <span className="mt-4 block text-2xl font-normal text-gray-300 sm:text-3xl">
                {t(
                  "home.subtitle",
                  "- this is a numerous collection of various OSINT tools",
                )}
              </span>
            </h1>

            <p className="mb-8 max-w-3xl text-lg text-gray-300">
              {t(
                "home.description",
                "Electronic scientific library of open access OSINT tools. The site catalog is regularly overgrown with tools of articles from various scientific publications. Grouped by journals and headings.",
              )}
            </p>

            <button
              onClick={() => {
                document.getElementById("osint-sections")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white transition-colors duration-300 hover:bg-blue-700"
            >
              {t("home.goToTools", "Go to tools")}
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
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
                <p className="text-sm text-gray-400">know@outlook.com</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
