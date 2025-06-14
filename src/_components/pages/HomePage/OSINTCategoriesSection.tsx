"use client";

import { useTranslation } from "react-i18next";
import { OSINT_CATEGORIES, type OSINTCategory } from "@/types/osint";
import { OSINTCategoryCard } from "./OSINTCategoryCard";
import { useOSINTData } from "@/hooks";
import {
  MapPin,
  Smartphone,
  Globe,
  FileText,
  Mic,
  Volume2,
  Video,
  Image,
  Bitcoin,
  MessageCircle,
  Code,
  Search,
  Wifi,
  Archive,
  Database,
  Microscope,
  Lock,
  Mail,
  Inbox,
  IdCard,
  User,
  Phone,
  Link,
  UserX,
  X,
  BarChart3,
  Bot,
  Monitor,
  File,
  Hash,
  Palette,
  TrendingUp,
  Smartphone as AppIcon,
  Building,
  Landmark,
  Copyright,
  Package,
  Film,
  Radio,
  Wrench,
  Server,
  Cpu,
  Terminal,
  Star,
} from "lucide-react";

/**
 * アイコンマッピング
 */
const getCategoryIcon = (category: OSINTCategory): React.ReactNode => {
  const iconMap: Record<OSINTCategory, React.ReactNode> = {
    "maps-geolocation-transport": <MapPin className="h-6 w-6" />,
    "social-media": <Smartphone className="h-6 w-6" />,
    "domain-ip-links": <Globe className="h-6 w-6" />,
    "text-analyze": <FileText className="h-6 w-6" />,
    "sound-identification-analyze": <Mic className="h-6 w-6" />,
    "sound-search-analyze": <Volume2 className="h-6 w-6" />,
    "video-editing-analyze": <Video className="h-6 w-6" />,
    "image-search-identification": <Image className="h-6 w-6" />,
    cryptocurrencies: <Bitcoin className="h-6 w-6" />,
    messengers: <MessageCircle className="h-6 w-6" />,
    code: <Code className="h-6 w-6" />,
    "search-engines": <Search className="h-6 w-6" />,
    iot: <Wifi className="h-6 w-6" />,
    archives: <Archive className="h-6 w-6" />,
    datasets: <Database className="h-6 w-6" />,
    science: <Microscope className="h-6 w-6" />,
    passwords: <Lock className="h-6 w-6" />,
    emails: <Mail className="h-6 w-6" />,
    "mbox-files": <Inbox className="h-6 w-6" />,
    ids: <IdCard className="h-6 w-6" />,
    nicknames: <User className="h-6 w-6" />,
    "phone-numbers": <Phone className="h-6 w-6" />,
    "universal-contact-search-leaks": <Link className="h-6 w-6" />,
    "sock-puppets": <UserX className="h-6 w-6" />,
    "noosint-tools": <X className="h-6 w-6" />,
    "visualization-tools": <BarChart3 className="h-6 w-6" />,
    "routine-data-extraction-automation": <Bot className="h-6 w-6" />,
    "browser-analyze": <Monitor className="h-6 w-6" />,
    files: <File className="h-6 w-6" />,
    "imei-serial-numbers": <Hash className="h-6 w-6" />,
    nft: <Palette className="h-6 w-6" />,
    "keywords-trends-news-analytics": <TrendingUp className="h-6 w-6" />,
    "apps-programs": <AppIcon className="h-6 w-6" />,
    "company-information-search": <Building className="h-6 w-6" />,
    "bank-information-search": <Landmark className="h-6 w-6" />,
    "brand-trademark-information-search": <Copyright className="h-6 w-6" />,
    "tender-shipment-information-search": <Package className="h-6 w-6" />,
    amazon: <Package className="h-6 w-6" />,
    movies: <Film className="h-6 w-6" />,
    netflix: <Film className="h-6 w-6" />,
    "tv-radio": <Radio className="h-6 w-6" />,
    "tools-collections-toolkits": <Wrench className="h-6 w-6" />,
    "databases-data-analyzes": <Server className="h-6 w-6" />,
    "online-os-emulators": <Cpu className="h-6 w-6" />,
    "virtual-machines-linux-distributions": <Terminal className="h-6 w-6" />,
    "my-projects": <Star className="h-6 w-6" />,
  };

  return iconMap[category] || <Wrench className="h-6 w-6" />;
};

/**
 * カラーマッピング
 */
const getCategoryColor = (index: number): string => {
  const colors = [
    "bg-[#039D55]",
    "bg-[#DBC7FC]",
    "bg-[#FF6F50]",
    "bg-[#FFFFFF]",
  ];

  return colors[index % colors.length];
};

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
 * OSINTカテゴリセクションコンポーネント
 */
export function OSINTCategoriesSection() {
  const { t } = useTranslation();
  const { getToolCount, loading, error } = useOSINTData();

  // 人気カテゴリ（最初の8個）
  const popularCategories = OSINT_CATEGORIES.slice(0, 8);
  // その他のカテゴリ
  const otherCategories = OSINT_CATEGORIES.slice(8);

  // ローディング中やエラーの場合の表示
  if (loading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-white border-r-transparent"></div>
          <p className="mt-4 text-white">
            {t("common.loading", "読み込み中...")}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-red-400">
            {t("common.error", "エラー")}: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* 人気セクション */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">
          {t("osint.popularSections", "POPULAR SECTIONS")}
        </h2>

        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularCategories.map((category, index) => (
            <OSINTCategoryCard
              key={category}
              category={category}
              title={getCategoryDisplayName(category)}
              toolCount={getToolCount(category)}
              icon={getCategoryIcon(category)}
              colorClass={getCategoryColor(index)}
            />
          ))}
        </div>
      </section>

      {/* 全カテゴリセクション */}
      <section>
        <h2 className="mb-8 text-center text-2xl font-bold text-white">
          {t("osint.allCategories", "ALL CATEGORIES")}
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {OSINT_CATEGORIES.map((category, index) => (
            <OSINTCategoryCard
              key={category}
              category={category}
              title={getCategoryDisplayName(category)}
              toolCount={getToolCount(category)}
              icon={getCategoryIcon(category)}
              colorClass={getCategoryColor(index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
