"use client";

import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * クライアントサイドでのみレンダリングするコンポーネント
 * SSRとハイドレーションの問題を回避する
 */
export const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // フォールバックがある場合は常に同じDOM構造を維持
  if (fallback) {
    return (
      <div className={hasMounted ? "" : "pointer-events-none opacity-0"}>
        {hasMounted ? children : fallback}
      </div>
    );
  }

  if (!hasMounted) {
    return <div className="opacity-0"></div>;
  }

  return <>{children}</>;
};
