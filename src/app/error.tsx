"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ERROR } from "@/constants";

/**
 * エラーページコンポーネント
 * ランタイムエラーが発生した際に表示される
 * @param error - 発生したエラーオブジェクト
 * @param reset - エラーからの回復を試みる関数
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen items-center justify-center bg-neutral-600 p-2">
      <div className="font-kikai max-w-md border-2 bg-white p-2 text-left text-black">
        <div>
          <p className="bg-red-600 text-center text-white">{ERROR.TITLE}</p>
          <p className="mt-2">{ERROR.MESSAGE}</p>
          <div className="mt-4 flex justify-around">
            <button
              onClick={() => reset()}
              className="rounded bg-blue-500 px-4 py-1 text-white"
            >
              {ERROR.RETRY}
            </button>
            <Link href="/" className="underline">
              {ERROR.HOME_LINK}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
