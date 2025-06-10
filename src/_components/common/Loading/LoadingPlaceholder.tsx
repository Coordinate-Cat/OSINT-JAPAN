/**
 * 読み込み中表示コンポーネント
 * アプリケーション全体で使用できる読み込み中の表示
 */
export function LoadingPlaceholder() {
  return (
    <main className="flex h-screen items-center justify-center bg-neutral-600 p-2">
      <div className="max-w-md border-2 bg-white p-2 text-center text-black">
        <p>読み込み中...</p>
      </div>
    </main>
  );
}
