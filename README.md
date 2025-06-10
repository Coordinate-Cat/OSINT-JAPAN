# OSINT-JAPAN

> 日本におけるオープンソースインテリジェンス（OSINT）のリソースガイド

OSINT-JAPANは、OSINT研究と情報収集に関する日本語のアプローチを提供することを目的としたWebアプリケーションです。日本に関するOSINT情報とツールを含み、非日本語圏からのアプローチもカバーしています。

## 🚀 プロジェクト概要

### 目的と機能
- **OSINTリソースの体系化**: 日本語でのOSINT研究ガイドライン提供
- **多言語対応**: 日本語（デフォルト）・英語での国際化サポート
- **ツール集約**: OSINT関連ツールとリソースの一元管理
- **アクセシビリティ**: レスポンシブデザインとダークモード対応

### 現在の実装状況
- ✅ 基本的なUI構成（カードベースレイアウト）
- ✅ 言語切り替え機能（日本語⇔英語）
- ✅ ダークモード対応
- ✅ QRコード生成機能
- ✅ GitHub連携
- 🚧 OSINTリソース機能（開発予定）

## 🛠 技術スタック

### フロントエンド
- **Next.js 15** - App Router使用
- **React 19** - 最新のReact機能活用
- **TypeScript** - 型安全性とDX向上

### スタイリング・UI
- **Tailwind CSS 4** - ユーティリティファーストCSS
- **shadcn/ui** - アクセシブルなUIコンポーネント
- **Radix UI** - 堅牢なプリミティブコンポーネント
- **Lucide React** - アイコンライブラリ

### 国際化・状態管理
- **i18next** - 多言語対応（SSR対応）
- **react-i18next** - React統合
- **qrcode.react** - QRコード生成

### 開発・品質管理
- **ESLint** - コード品質チェック
- **Prettier** - コードフォーマッタ
- **TypeScript Strict Mode** - 厳格な型チェック

## 📁 プロジェクト構成

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # APIルート
│   ├── ui/                # フォント設定
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx          # ホームページ
│   ├── error.tsx         # エラーページ
│   └── not-found.tsx     # 404ページ
├── _components/           # コンポーネント群
│   ├── common/           # 共通コンポーネント
│   │   ├── ClientOnly.tsx    # SSR対応ラッパー
│   │   └── Loading/          # ローディング表示
│   ├── pages/            # ページ専用コンポーネント
│   │   └── HomePage/         # ホームページ関連
│   │       ├── LanguageSwitcher.tsx  # 言語切り替え
│   │       └── DarkModeToggle.tsx    # ダークモード切り替え
│   └── ui/               # shadcn/uiコンポーネント
├── hooks/                # カスタムフック
│   ├── useDarkMode.ts    # ダークモード状態管理
│   └── useI18nReady.ts   # 国際化準備状態
├── i18n/                 # 国際化設定
│   ├── config.ts         # i18n設定
│   └── provider.tsx      # プロバイダー
├── lib/                  # ユーティリティライブラリ
│   └── utils.ts          # 共通ユーティリティ
├── styles/               # グローバルスタイル
│   └── globals.css       # Tailwind設定
├── constants/            # 定数定義
├── config/               # プロジェクト設定
├── store/                # 状態管理
├── types/                # TypeScript型定義
└── utils/                # 純粋関数・ヘルパー
```

### コロケーションパターン

このプロジェクトは厳格なコロケーションパターンを採用しています：

- **"Place code as close to where it's relevant as possible"** の原則
- コンポーネントは全て `/src/_components/` 配下に集約
- 機能特有のコード（hooks、utils）は該当feature配下に配置
- ページ専用コンポーネントは `/src/_components/pages/<page-name>/` に整理
- `index.ts` による再エクスポート管理（直接インポート禁止）

## 🚀 開発ガイド

### セットアップ

```bash
# リポジトリのクローン
git clone https://github.com/Coordinate-Cat/OSINT-JAPAN.git
cd OSINT-JAPAN

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# リント実行
npm run lint
```

### 開発ルール

#### コーディング規約
- **インデント**: 2スペース
- **クォート**: ダブルクォート（`"`）
- **セミコロン**: 必須
- **Trailing Comma**: 必須
- **コメント**: 複雑なロジックには日本語コメント
- **JSDoc**: コンポーネント・関数に必須

#### TypeScript規約
- `any` 型の使用禁止
- 明示的な型定義を優先
- `interface` を `type` より優先
- Strict mode有効

#### インポートルール
- コンポーネントの直接インポート禁止
- 必ず `index.ts` 経由でインポート
- パス: `@/_components/pages/<page-name>/index.ts`

## 🌐 国際化（i18n）

### サポート言語
- **日本語** (`ja`) - デフォルト・フォールバック
- **英語** (`en`) - セカンダリ

### 翻訳ファイル
- `/public/locales/ja/translation.json`
- `/public/locales/en/translation.json`

### 使用方法
```tsx
import { useTranslation } from "react-i18next";

function Component() {
  const { t } = useTranslation();
  return <h1>{t("mainPage.title")}</h1>;
}
```

## 🎨 スタイリング

### Tailwind CSS設定
- **Base Color**: Neutral
- **CSS Variables**: 有効
- **Dark Mode**: Class-based
- **日本語フォント**: Noto Sans JP
- **英語フォント**: Inter

### ダークモード
- システム設定の自動検出
- LocalStorage による設定保持
- フラッシュ防止の事前読み込み

## 🔧 設定ファイル

### 主要設定
- `next.config.js` - Next.js設定（CSP、styled-components）
- `components.json` - shadcn/ui設定
- `tsconfig.json` - TypeScript設定
- `.eslintrc.json` - ESLint設定

### セキュリティ
- **CSP（Content Security Policy）** 有効
- Vercelデプロイメント対応
- 安全なスクリプト実行設定

## 🚧 開発ロードマップ

### 近日実装予定
- [ ] OSINT リソースデータベース
- [ ] 検索・フィルタリング機能
- [ ] ユーザー投稿機能
- [ ] カテゴリ分類システム
- [ ] API開発

### 将来的な機能
- [ ] ユーザー認証
- [ ] ブックマーク機能
- [ ] レーティングシステム
- [ ] コミュニティ機能

## 📄 ライセンス

このプロジェクトのライセンスについては [LICENSE.md](https://github.com/Coordinate-Cat/OSINT-JAPAN/blob/main/LICENSE) をご覧ください。

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！Issue の報告や Pull Request をお待ちしています。

---

**OSINT-JAPAN** - Empowering OSINT research in Japanese context