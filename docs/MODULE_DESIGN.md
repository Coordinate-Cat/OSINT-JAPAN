# モジュール設計ガイドライン

## コンポーネント設計

### 命名規則

- コンポーネント名: パスカルケース（例: `Button`、`UserProfile`）
- ヘルパー関数: キャメルケース（例: `formatDate`、`useFetchData`）
- 定数: 大文字スネークケース（例: `MAX_ITEMS`、`API_URL`）

### コメント

コンポーネントや関数の役割を明確にするため、JSDocスタイルのコメントを使用します：

```tsx
/**
 * ボタンコンポーネント
 * アプリケーション全体で使用される共通ボタン
 * @param props - ボタンのプロパティ
 */
export function Button(props: ButtonProps) {
  // 実装
}
```

## ディレクトリ構造とモジュール設計

- `_components/common`: アプリケーション全体で使用される共通コンポーネント
- `_components/features`: 特定の機能に関連するコンポーネント
- `_components/pages`: 特定のページに関連するコンポーネント
