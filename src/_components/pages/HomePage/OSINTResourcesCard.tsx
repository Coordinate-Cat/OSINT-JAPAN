"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/_components/ui/card";
import { useTranslation } from "react-i18next";
import { OSINT_CATEGORIES, type OSINTCategory } from "@/types/osint";

/**
 * OSINTリソースカードコンポーネント
 * ホームページに表示するOSINTツール選択画面
 */
export function OSINTResourcesCard() {
  const { t } = useTranslation();
  const router = useRouter();

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
   * カテゴリ選択時の処理 - 別ページに遷移
   */
  const handleCategorySelect = (category: OSINTCategory) => {
    router.push(`/osint/${category}`);
  };

  return (
    <Card className="w-full bg-[#EFEFEF] p-4 dark:bg-gray-800">
      <div className="flex h-full flex-col">
        <h2 className="mb-4 text-2xl font-bold">
          {t("mainPage.osintResourcesTitle", "OSINTリソース")}
        </h2>

        <div className="flex-1">
          <p className="mb-4 text-stone-600 dark:text-gray-400">
            {t(
              "mainPage.osintResourcesDescription",
              "調査に使用するOSINTツールのカテゴリを選択してください",
            )}
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {OSINT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className="group rounded-lg border border-gray-200 bg-white p-3 text-left transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <div className="font-medium text-stone-800 transition-colors group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-400">
                  {getCategoryDisplayName(category)}
                </div>
                <div className="text-sm text-stone-500 dark:text-gray-400">
                  {category}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
