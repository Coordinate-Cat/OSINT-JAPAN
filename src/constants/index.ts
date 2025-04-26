/**
 * アプリケーション全体で使用する定数を管理
 *
 * 注意: これらの定数は現在使用されていません。
 * i18n翻訳システム（/public/locales/{言語}/translation.json）に移行済みです。
 * 参照用のドキュメントとして残しています。
 *
 * 最終更新日: 2025年4月26日
 */

/**
 * NotFoundページで使用するテキスト
 * @deprecated i18nの`notFound`キーに移行済み
 */
export const NOT_FOUND = {
  /** ページのタイトル */
  TITLE: "ページが見つかりません",
  /** エラーメッセージ */
  MESSAGE: "このページは存在しません。",
  /** ユーザーへの案内メッセージ */
  SUGGESTION: "別のページをお試しください。",
  /** ホームページリンクのテキスト */
  HOME_LINK: "ホームページへ戻る",
};

/**
 * エラーページで使用するテキスト
 * @deprecated i18nの`error`キーに移行済み
 */
export const ERROR = {
  /** ページのタイトル */
  TITLE: "エラーが発生しました",
  /** エラーメッセージ */
  MESSAGE: "申し訳ありませんが、問題が発生しました。",
  /** ホームページリンクのテキスト */
  HOME_LINK: "ホームページへ戻る",
  /** リトライボタンのテキスト */
  RETRY: "もう一度試す",
};

/**
 * ホームページで使用するテキスト
 * @deprecated i18nの`homePage`キーに移行済み
 */
export const HOME = {
  /** ページのタイトル */
  TITLE: "工事のお知らせ",
  /** ページの説明文 */
  DESCRIPTION:
    "只今工事中の為、通行できません。ご不便をお掛けしますが、皆様のご協力をお願いします。",
  /** 工事期間ラベル */
  PERIOD_LABEL: "工事期間:",
  /** 工事期間の値 */
  PERIOD_VALUE: "2025年4月11日(金) 〜 2251年4月20日(日)",
  /** 工事内容ラベル */
  CONTENT_LABEL: "工事内容:",
  /** 外部リンクのテキスト */
  LINK_TEXT: "外部サイト（GitHub）→",
  /** GitHubのURL */
  GITHUB_URL: "https://github.com/Coordinate-Cat/OSINT-JAPAN",
};
