import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

// 翻訳リソースを直接インポート（SSRでの一貫性のため）
import translationEN from "../../public/locales/en/translation.json";
import translationJA from "../../public/locales/ja/translation.json";

// 翻訳リソースの型定義
type TranslationResource = typeof translationEN;

// リソースの型定義
interface Resources {
  [language: string]: {
    [namespace: string]: TranslationResource;
  };
}

// リソースを定義
const resources: Resources = {
  en: {
    translation: translationEN,
  },
  ja: {
    translation: translationJA,
  },
};

// サポートする言語をオブジェクトで定義
// ユーザーが言語を手動で切り替える場合に使用
export const supportedLngs = {
  en: "English",
  ja: "日本語",
};

// サーバーとクライアントで一貫した設定を使用
i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      return Promise.resolve(resources[language][namespace]);
    }),
  )
  .init({
    lng: "ja", // 初期値は日本語（SSR時の一貫性のため）
    fallbackLng: "ja",
    supportedLngs: Object.keys(supportedLngs),
    debug: false,
    resources,
    interpolation: {
      escapeValue: false,
    },
    // SSRでのハイドレーション問題を防ぐため、クライアントサイドでの自動読み込みを無効化
    load: "languageOnly",
    cleanCode: false,
    initImmediate: false,
  });

export default i18n;
