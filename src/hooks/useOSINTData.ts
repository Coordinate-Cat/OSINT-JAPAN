"use client";

import { useState, useEffect } from "react";
import { type OSINTCategory } from "@/types/osint";

interface OSINTData {
  title: string;
  slug: string;
  sections: Array<{
    name: string;
    slug: string;
    tools: Array<{
      link: string;
      description: string;
    }>;
  }>;
}

/**
 * OSINTデータを取得するカスタムフック
 * 各カテゴリのツール数を取得し、パフォーマンスを最適化するため
 */
export const useOSINTData = () => {
  const [toolCounts, setToolCounts] = useState<Record<OSINTCategory, number>>(
    {} as Record<OSINTCategory, number>,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToolCounts = async () => {
      try {
        setLoading(true);
        const counts: Record<OSINTCategory, number> = {} as Record<
          OSINTCategory,
          number
        >;

        // 全カテゴリのデータを並列で取得
        const categories: OSINTCategory[] = [
          "maps-geolocation-transport",
          "social-media",
          "domain-ip-links",
          "text-analyze",
          "sound-identification-analyze",
          "sound-search-analyze",
          "video-editing-analyze",
          "image-search-identification",
          "cryptocurrencies",
          "messengers",
          "code",
          "search-engines",
          "iot",
          "archives",
          "datasets",
          "science",
          "passwords",
          "emails",
          "mbox-files",
          "ids",
          "nicknames",
          "phone-numbers",
          "universal-contact-search-leaks",
          "sock-puppets",
          "noosint-tools",
          "visualization-tools",
          "routine-data-extraction-automation",
          "browser-analyze",
          "files",
          "imei-serial-numbers",
          "nft",
          "keywords-trends-news-analytics",
          "apps-programs",
          "company-information-search",
          "bank-information-search",
          "brand-trademark-information-search",
          "tender-shipment-information-search",
          "amazon",
          "movies",
          "netflix",
          "tv-radio",
          "tools-collections-toolkits",
          "databases-data-analyzes",
          "online-os-emulators",
          "virtual-machines-linux-distributions",
          "my-projects",
        ];

        // 並列でデータを取得
        const promises = categories.map(async (category) => {
          try {
            const response = await fetch(`/data/osint/${category}.json`);
            if (!response.ok) {
              console.warn(`Failed to fetch data for category: ${category}`);
              return { category, count: 0 };
            }
            const data: OSINTData = await response.json();

            // 全セクションのツール数を合計
            const totalTools = data.sections.reduce((total, section) => {
              return total + (section.tools?.length || 0);
            }, 0);

            return { category, count: totalTools };
          } catch (error) {
            console.warn(
              `Error fetching data for category ${category}:`,
              error,
            );
            return { category, count: 0 };
          }
        });

        const results = await Promise.all(promises);

        // 結果をオブジェクトに変換
        results.forEach(({ category, count }) => {
          counts[category] = count;
        });

        setToolCounts(counts);
        setError(null);
      } catch (err) {
        console.error("Error fetching OSINT data:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchToolCounts();
  }, []);

  /**
   * 指定したカテゴリのツール数を取得
   */
  const getToolCount = (category: OSINTCategory): number => {
    return toolCounts[category] || 0;
  };

  return {
    toolCounts,
    getToolCount,
    loading,
    error,
  };
};
