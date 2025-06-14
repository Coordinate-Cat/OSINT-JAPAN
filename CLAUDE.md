# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## 重要な注意事項

- **必ず日本語で回答してください。** 開発者は日本語話者のため、すべてのコミュニケーションは日本語で行ってください。
- ツールの結果を受け取った後、その品質を慎重に検討し、次に進む前に最適な次のステップを決定してください。この新しい情報に基づいて計画し、反復するために思考を使用し、最善の次のアクションを取ってください。
- 最大の効率を得るために、複数の独立した操作を実行する必要がある場合は、順次ではなく、関連するすべてのツールを同時に呼び出してください。
- 反復のために一時的な新しいファイル、スクリプト、またはヘルパーファイルを作成した場合は、タスクの最後にこれらのファイルを削除してクリーンアップしてください。
- **遠慮せずに、全力を尽くしてください。**

## 開発哲学(Test-Driven Development (TDD))

- 原則としてテスト駆動開発（TDD）で進める。
- 期待される入出力に基づき、まずテストを作成する。
- 実装コードは書かず、テストのみを用意する。
- テストを実行し、失敗を確認する。
- テストが正しいことを確認できた段階でコミットする。
- その後、テストをパスさせる実装を進める。
- 実装中はテストを変更せず、コードを修正し続ける。
- すべてのテストが通過するまで繰り返す。

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番用ビルド
npm run build

# リント実行
npm run lint

# 本番サーバーの起動
npm start
```

## プロジェクト概要

OSINT-JAPANは、OSINT研究と情報収集に関する日本語のアプローチを提供するWebアプリケーションです。

### 現在の実装状況

- ✅ 基本的なUI構成（カードベースレイアウト）
- ✅ 言語切り替え機能（日本語⇔英語）
- ✅ ダークモード対応
- ✅ QRコード生成機能
- ✅ GitHub連携
- 🚧 OSINTリソース機能（開発予定）

## 技術スタック

### フロントエンド

- **Next.js 15** (App Router使用)
- **React 19** (最新のReact機能活用)
- **TypeScript** (strict mode有効、型安全性重視)

### スタイリング・UI

- **Tailwind CSS 4** (ユーティリティファーストCSS)
- **shadcn/ui** (アクセシブルなUIコンポーネント、`src/_components/ui/`)
- **Radix UI** (堅牢なプリミティブコンポーネント)
- **Lucide React** (アイコンライブラリ)

### 国際化・その他ライブラリ

- **i18next** (多言語対応、SSR対応、日本語デフォルト)
- **react-i18next** (React統合)
- **qrcode.react** (QRコード生成機能)

### 開発・品質管理

- **ESLint** (コード品質チェック)
- **Prettier** (コードフォーマッタ)
- **TypeScript Strict Mode** (厳格な型チェック)

## ファイル構成 (コロケーションパターン)

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

**重要: "Place code as close to where it's relevant as possible" の厳格なコロケーションパターンを採用**

## コンポーネントインポートルール

- **必須**: `index.ts` ファイルを使用した再エクスポート管理
- **禁止**: コンポーネントの直接インポート
- **パス**: `@/_components/pages/<page-name>/index.ts` 経由でインポート
- **例**: `import { Component } from "@/_components/pages/HomePage";`

## 国際化設定 (i18n)

- **デフォルト言語**: 日本語 (`ja`)
- **フォールバック言語**: 日本語
- **翻訳ファイル**: `public/locales/{ja,en}/translation.json`
- **SSR対応**: 静的インポートを使用して一貫性を保持
- **言語切り替え**: `src/i18n/config.ts` の `supportedLngs` で管理

## ダークモード実装

- **localStorageとシステム設定のフォールバック**
- **フラッシュ防止**: layout.tsx内のインラインスクリプトで事前読み込み
- **状態管理**: useDarkModeカスタムフック経由
- **CSS**: Tailwind CSS Class-based dark mode

## コーディング規約

### 基本ルール

- **インデント**: 2スペース
- **クォート**: ダブルクォート (`"`) 必須
- **セミコロン**: 必須
- **Trailing Comma**: 必須
- **コメント**: 複雑なロジックには日本語コメント
- **JSDoc**: コンポーネント・関数に必須

### TypeScript規約

- **any型**: 使用禁止
- **型定義**: 明示的な型指定を優先
- **interface vs type**: `interface` を `type` より優先
- **Strict Mode**: 有効、厳格な型チェック

## 設定ファイル

### 主要設定

- `next.config.js` - Next.js設定（CSP、styled-components有効）
- `components.json` - shadcn/ui設定（New York style、RSC有効）
- `tsconfig.json` - TypeScript設定（Strict mode）
- `.eslintrc.json` - ESLint設定
- `postcss.config.js` - PostCSS設定

### セキュリティ

- **CSP（Content Security Policy）**: `next.config.js`で設定
- **Vercelデプロイメント対応**: 特定の許可設定
- **安全なスクリプト実行**: インラインスクリプトの適切な管理

## フォント設定

- **ラテン文字**: Inter (`font-inter`)
- **日本語文字**: Noto Sans JP (`font-noto-sans-jp`)
- **設定場所**: `src/app/ui/fonts.ts`
- **CSS Variables**: 有効

## SSR・ハイドレーション対応

- **ClientOnlyコンポーネント**: SSRとハイドレーション問題の回避
- **i18n準備状態**: useI18nReadyフックで管理
- **ダークモード**: 事前スクリプトでフラッシュ防止
- **安定したDOM構造**: ハイドレーション不一致の防止

## 開発時の注意点

- **国際化**: 必ず翻訳キーを使用、ハードコードしない
- **アクセシビリティ**: aria-label等の適切な設定
- **パフォーマンス**: 必要に応じてSuspenseとlazy loading
- **セキュリティ**: 外部リンクには `rel="noopener noreferrer"`
