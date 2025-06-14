/**
 * OSINT関連の型定義
 */

/**
 * OSINTツールの定義
 */
export interface OSINTTool {
  /** ツールのURL */
  link: string;
  /** ツールの説明 */
  description: string;
}

/**
 * OSINTサブセクションの定義
 */
export interface OSINTSubsection {
  /** サブセクション名 */
  name: string;
  /** URL用のスラッグ */
  slug: string;
  /** サブセクション内のツール一覧 */
  tools: OSINTTool[];
}

/**
 * OSINTメインセクションの定義
 */
export interface OSINTSection {
  /** セクション名 */
  title: string;
  /** URL用のスラッグ */
  slug: string;
  /** サブセクション一覧 */
  sections: OSINTSubsection[];
}

/**
 * OSINT セクション一覧のメタデータ
 */
export interface OSINTSectionMeta {
  /** セクション名 */
  title: string;
  /** URL用のスラッグ */
  slug: string;
  /** セクション内のツール総数 */
  toolCount: number;
  /** セクション内のサブセクション数 */
  subsectionCount: number;
  /** セクションの説明 */
  description?: string;
}

/**
 * 利用可能なOSINTカテゴリ
 */
export const OSINT_CATEGORIES = [
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
  "my-projects"
] as const;

export type OSINTCategory = typeof OSINT_CATEGORIES[number];

/**
 * OSINT検索結果の定義
 */
export interface OSINTSearchResult {
  /** ツール情報 */
  tool: OSINTTool;
  /** 所属するセクション */
  section: string;
  /** 所属するサブセクション */
  subsection: string;
  /** 検索スコア（関連度） */
  score: number;
}

/**
 * OSINT検索フィルター
 */
export interface OSINTSearchFilter {
  /** 検索クエリ */
  query?: string;
  /** 対象カテゴリ */
  categories?: OSINTCategory[];
  /** 最大結果数 */
  limit?: number;
}