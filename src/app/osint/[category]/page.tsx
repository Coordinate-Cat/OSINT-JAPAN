"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Card } from "@/_components/ui/card";
import {
  type OSINTSection,
  type OSINTSubsection,
  type OSINTTool,
  type OSINTCategory,
  OSINT_CATEGORIES,
} from "@/types/osint";
import { LoadingPlaceholder } from "@/_components/common";
import { useI18nReady } from "@/hooks";

/**
 * OSINTカテゴリ詳細ページ
 */
export default function OSINTCategoryPage() {
  const { t } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const isI18nReady = useI18nReady();

  const [sectionData, setSectionData] = useState<OSINTSection | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const category = params.category as OSINTCategory;

  /**
   * カテゴリ名を日本語に変換
   */
  const getCategoryDisplayName = (category: OSINTCategory): string => {
    const categoryNames: Record<OSINTCategory, string> = {
      "maps-geolocation-transport": "地図・位置情報・交通",
      "social-media": "ソーシャルメディア",
      "domain-ip-links": "ドメイン・IP・リンク",
      "text-analyze": "テキスト分析",
      "sound-identification-analyze": "音声識別・分析",
      "sound-search-analyze": "音声検索・分析",
      "video-editing-analyze": "動画編集・分析",
      "image-search-identification": "画像検索・識別",
      cryptocurrencies: "暗号通貨",
      messengers: "メッセンジャー",
      code: "コード",
      "search-engines": "検索エンジン",
      iot: "IoTデバイス",
      archives: "アーカイブ",
      datasets: "データセット",
      science: "学術研究",
      passwords: "パスワード",
      emails: "メール",
      "mbox-files": "MBOXファイル",
      ids: "ID分析",
      nicknames: "ニックネーム",
      "phone-numbers": "電話番号",
      "universal-contact-search-leaks": "包括的連絡先検索・リーク",
      "sock-puppets": "偽装アイデンティティ",
      "noosint-tools": "NOOSINT",
      "visualization-tools": "データ可視化",
      "routine-data-extraction-automation": "データ抽出自動化",
      "browser-analyze": "ブラウザ分析",
      files: "ファイル分析",
      "imei-serial-numbers": "IMEI・シリアル番号",
      nft: "NFT",
      "keywords-trends-news-analytics": "キーワード・トレンド・ニュース分析",
      "apps-programs": "アプリ・プログラム",
      "company-information-search": "企業情報検索",
      "bank-information-search": "銀行情報検索",
      "brand-trademark-information-search": "ブランド・商標情報検索",
      "tender-shipment-information-search": "入札・出荷情報検索",
      amazon: "Amazon",
      movies: "映画",
      netflix: "Netflix",
      "tv-radio": "TV・ラジオ",
      "tools-collections-toolkits": "ツールコレクション",
      "databases-data-analyzes": "データベース・分析",
      "online-os-emulators": "オンラインOSエミュレータ",
      "virtual-machines-linux-distributions": "仮想マシン・Linux",
      "my-projects": "作成者のプロジェクト",
    };
    return categoryNames[category];
  };

  /**
   * セクションデータを読み込み
   */
  useEffect(() => {
    if (!category || !OSINT_CATEGORIES.includes(category)) {
      setError("無効なカテゴリです");
      setLoading(false);
      return;
    }

    const loadSectionData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/data/osint/${category}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.status}`);
        }

        const data: OSINTSection = await response.json();
        setSectionData(data);
      } catch (err) {
        console.error(`Error loading OSINT data for ${category}:`, err);
        setError(`データの読み込みに失敗しました: ${category}`);
      } finally {
        setLoading(false);
      }
    };

    loadSectionData();
  }, [category]);

  /**
   * 検索フィルタリング
   */
  const filteredTools = (subsection: OSINTSubsection): OSINTTool[] => {
    if (!searchQuery.trim()) return subsection.tools;

    const query = searchQuery.toLowerCase();
    return subsection.tools.filter(
      (tool) =>
        tool.description.toLowerCase().includes(query) ||
        tool.link.toLowerCase().includes(query),
    );
  };

  /**
   * 表示するサブセクション
   */
  const displaySubsections =
    sectionData?.sections.filter((section) => {
      if (searchQuery.trim()) {
        return filteredTools(section).length > 0;
      }
      return true;
    }) || [];

  if (!isI18nReady) {
    return <LoadingPlaceholder />;
  }

  if (loading) {
    return (
      <main className="flex h-screen items-start justify-center bg-[#ccc] p-2 text-stone-800 dark:bg-gray-900 dark:text-gray-100">
        <div className="w-full max-w-6xl">
          <Card className="w-full bg-[#EFEFEF] p-6 dark:bg-gray-800">
            <div className="animate-pulse">
              <div className="mb-4 h-8 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 rounded bg-gray-200 dark:bg-gray-700"
                  ></div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex h-screen items-start justify-center bg-[#ccc] p-2 text-stone-800 dark:bg-gray-900 dark:text-gray-100">
        <div className="w-full max-w-6xl">
          <Card className="w-full bg-[#EFEFEF] p-6 dark:bg-gray-800">
            <button
              onClick={() => router.push("/")}
              className="mb-4 text-stone-600 transition-colors hover:text-stone-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ← {t("common.back", "戻る")}
            </button>
            <div className="py-8 text-center text-red-600 dark:text-red-400">
              <p>{error}</p>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-start justify-center bg-[#ccc] p-2 text-stone-800 dark:bg-gray-900 dark:text-gray-100">
      <div className="w-full max-w-6xl">
        <Card className="w-full bg-[#EFEFEF] p-6 dark:bg-gray-800">
          {/* ヘッダー */}
          <div className="mb-6">
            <button
              onClick={() => router.push("/")}
              className="mb-4 flex items-center gap-2 text-stone-600 transition-colors hover:text-stone-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ← {t("common.back", "ホームに戻る")}
            </button>

            <h1 className="mb-4 text-3xl font-bold">
              {getCategoryDisplayName(category)}
            </h1>

            <p className="mb-4 text-stone-600 dark:text-gray-400">
              {t(
                "osint.categoryDescription",
                "OSINTツールの詳細一覧です。検索機能を使って目的のツールを見つけてください。",
              )}
            </p>

            {/* 検索バー */}
            <div className="relative">
              <input
                type="text"
                placeholder={t("osint.searchPlaceholder", "ツールを検索...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-lg text-stone-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* サブセクション一覧 */}
          <div className="space-y-8">
            {displaySubsections.length === 0 ? (
              <div className="py-12 text-center text-stone-600 dark:text-gray-400">
                <p className="text-lg">
                  {t("osint.noToolsFound", "該当するツールが見つかりません")}
                </p>
                <p className="mt-2 text-sm">
                  検索条件を変更してお試しください。
                </p>
              </div>
            ) : (
              displaySubsections.map((subsection) => {
                const tools = filteredTools(subsection);

                return (
                  <div
                    key={subsection.slug}
                    className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-700"
                  >
                    <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-semibold text-stone-800 dark:border-gray-600 dark:text-gray-200">
                      {subsection.name}
                      <span className="ml-3 text-sm font-normal text-stone-500 dark:text-gray-400">
                        ({tools.length} tools)
                      </span>
                    </h2>

                    <div className="grid gap-4">
                      {tools.map((tool, index) => (
                        <div
                          key={`${subsection.slug}-${index}`}
                          className="rounded-r-lg border-l-4 border-blue-500 bg-gray-50 py-3 pl-4 dark:bg-gray-800"
                        >
                          <a
                            href={tool.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-medium break-all text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {tool.link}
                          </a>
                          <p className="mt-2 leading-relaxed text-stone-700 dark:text-gray-300">
                            {tool.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* フッター */}
          <div className="mt-8 border-t border-gray-200 pt-6 text-center dark:border-gray-600">
            <p className="text-sm text-stone-500 dark:text-gray-400">
              Total:{" "}
              {sectionData?.sections.reduce(
                (acc, section) => acc + filteredTools(section).length,
                0,
              ) || 0}{" "}
              tools
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
