"use client";

import { useRouter } from "next/navigation";
import { type OSINTCategory } from "@/types/osint";

interface OSINTCategoryCardProps {
  category: OSINTCategory;
  title: string;
  toolCount?: number;
  icon: React.ReactNode;
  colorClass: string;
}

/**
 * カラフルなOSINTカテゴリカードコンポーネント
 */
export function OSINTCategoryCard({
  category,
  title,
  toolCount = 0,
  icon,
  colorClass,
}: OSINTCategoryCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/osint/${category}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`${colorClass} group relative h-64 transform cursor-pointer overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
    >
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="text-8xl text-black">{icon}</div>

        <div>
          <h2 className="group-hover:text-opacity-90 mt-2 text-lg font-semibold text-black">
            {title}
          </h2>
          <p className="text-opacity-80 text-sm text-black">
            {toolCount} {toolCount === 1 ? "ツール" : "ツール"} 利用可能
          </p>
        </div>
      </div>
    </div>
  );
}
