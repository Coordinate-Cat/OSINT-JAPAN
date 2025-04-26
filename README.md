# OSINT-JAPAN

## Development

### npm scripts

```
npm install

npm run dev
npm run build
npm run lint
```

### src/ (Colocation Patterns)

> "Place code as close to where it's relevant as possible"  
> コードは関連する場所に近いところに配置する

- (colocation) フォルダは論理グループとして使用する（URLパスには影響しない）
- ページごとに個別ディレクトリ（XXXXPAGE）を作成する
- `_components` ディレクトリ名には必ず先頭にアンダースコアを付ける
- ページ専用コンポーネントはそのページ配下の `_components/` にまとめる
- ページ専用の hooks や utils もそのページ配下に配置する
- 複数ページで使われるコンポーネントは `/_components/common/` に配置する
- 大規模な機能単位のコンポーネント群は `/_components/features/` にまとめる
- `@package` アノテーションを使用して、ファイルをフォルダ単位でカプセル化する ([eslint-plugin-import-access](https://github.com/uhyo/eslint-plugin-import-access))
- 特定機能専用のコンポーネント、hooks、utils は feature 配下に配置する
- shadcnコンポーネントは `/_components/ui/` に集約する
- プロジェクト共通設定は `/config/` に配置する
- 定数は `/constants/` に配置する
- 再利用可能なカスタムフックは `/hooks/` に配置する
- 汎用ライブラリ関数（fetch関数、localStorage関数、cookie関数など）は `/lib/` に配置する
- グローバルな状態管理は `/store/` に集約する
- 型定義ファイルは `/types/` にまとめる
- 汎用的な純粋関数やヘルパー関数は`/utils/` に集約する
- `_components/parts-_/_.tsx` ファイルには必ず @package を付与する
- `_components/index.ts` を作成して再エクスポートを管理する
- `_components/index.ts` にも @package を付与する
- ページ配下（例: colocation-a/）では `_components/index.ts` 経由でのみコンポーネントをimportする
- `_components/parts-_/_.tsx` を直接importすることは禁止する
- 別のcolocation領域（例: colocation-b/）からのimportは禁止する
- Storybookファイル（`*.stories.tsx`）は各パーツディレクトリ内に設置する

```plaintext
src/
  ├── app/ (Next.jsページルーティング)
  │   ├── (colocation)/ (論理グループ、パスに影響しない、例：(shop), (blog), (marketing))
  │   │   ├── colocation-a/ (ページディレクトリ、パスに影響する)
  │   │   │   ├── _components/ (ページ専用コンポーネント)
  │   │   │   │   ├── index.ts (@packageで再エクスポート管理)
  │   │   │   │   ├── parts-a-1/
  │   │   │   │   │   ├── parts-a-1.tsx (@package)
  │   │   │   │   │   ├── parts-a-1.stories.tsx
  │   │   │   │   ├── parts-a-2/
  │   │   │   │   │   ├── parts-a-2.tsx (@package)
  │   │   │   │   │   ├── parts-a-2.stories.tsx
  │   │   │   │   ├── parts-a-3/
  │   │   │   │   │   ├── parts-a-3.tsx (@package)
  │   │   │   │   │   ├── parts-a-3.stories.tsx
  │   │   │   ├── page.tsx (colocation-aトップページ)
  │   │   │   ├── sub/
  │   │   │   │   └── page.tsx (colocation-a配下のサブページ)
  │   │   ├── colocation-b/
  │   │   │   ├── page.tsx (colocation-bトップページ)
  │   ├── api/ (APIルート)
  │   ├── layout.tsx (アプリ全体のレイアウト)
  │   └── page.tsx (アプリ全体のトップページ)
  ├── _components/ (共通・機能別コンポーネント群)
  │   ├── common/ (共通コンポーネント)
  │   ├── features/ (機能別コンポーネント)
  │   │   ├── <feature_name>/
  │   │   │   ├── _components/
  │   │   │   ├── hooks/
  │   │   │   └── utils/
  │   └── ui/ (shadcnコンポーネント)
  ├── config/ (プロジェクト共通設定)
  ├── constants/ (定数管理)
  ├── hooks/ (汎用カスタムフック)
  ├── lib/ (汎用ライブラリ関数、fetch、localStorage、cookieなど)
  ├── store/ (状態管理)
  ├── types/ (TypeScript型定義)
  └── utils/ (汎用純粋関数、単純な変換やヘルパー関数)
```

### eslint-plugin-import-access (loophole)

```tsx
// src/app/(colocation)/colocation-a/_components/index.ts
/**
 * @package
 * 再エクスポート用
 */
export { PartsA1 } from "./parts-a-1/parts-a-1";
export { PartsA2 } from "./parts-a-2/parts-a-2";
export { PartsA3 } from "./parts-a-3/parts-a-3";
```

### lazy (Suspense)

> 遅延読み込みとローディング制御を適切に管理する

- ページコンポーネント (`page.tsx`) 側で `Suspense` を使ってパーツの読み込みを制御する
- 遅延させたいパーツコンポーネントのみを `Suspense` でラップする
- ロード待ち中に表示するコンポーネントを `fallback` に設定する
- コンポーネントが特に重い場合は `React.lazy` を使って動的importする
- `_components/` にある個別のパーツにも必要なら内部で `Suspense` を使ってもよい
- `page.tsx` はServer Componentであるため、`"use client"` が必要なパーツは必ずClient Component化する
- 不要な箇所まで無理に `Suspense` を使わず、適切な単位で分ける
- グループ単位でまとめて `Suspense` を使う場合は、読み込み順序を意識する

```tsx
// src/app/(colocation)/colocation-a/page.tsx
import { Suspense } from "react";
import {
  PartsA1,
  PartsA2,
  PartsA3,
} from "@/app/(colocation)/colocation-a/_components";

export default function Page() {
  return (
    <div>
      <h1>Co-location A</h1>
      <Suspense fallback={<div>Loading Components...</div>}>
        <div>
          <PartsA1 />
          <PartsA2 />
          <PartsA3 />
        </div>
      </Suspense>
    </div>
  );
}
```

## ライセンス(License)

[LICENSE.md](https://github.com/Coordinate-Cat/OSINT-JAPAN/blob/main/LICENSE)
