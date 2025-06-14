"use client";

import { Moon, Sun } from "lucide-react";
import { Switch } from "@/_components/ui/switch";
import { useDarkMode } from "@/hooks/useDarkMode";
import { ClientOnly } from "@/_components/common/ClientOnly";

interface DarkModeToggleProps {
  className?: string;
}

/**
 * ダークモード切り替えコンポーネント（内部実装）
 * ClientOnlyでラップされる前提
 */
const DarkModeToggleInner = ({ className = "" }: DarkModeToggleProps) => {
  const { isDarkMode, toggleDarkMode, isLoaded } = useDarkMode();

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Sun className="h-4 w-4" />
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleDarkMode}
        aria-label="ダークモードを切り替える"
        disabled={!isLoaded}
      />
      <Moon className="h-4 w-4" />
    </div>
  );
};

/**
 * ダークモード切り替えコンポーネント
 * スイッチとアイコンでダークモードのオン/オフを切り替える
 * SSR対応のためClientOnlyでラップしている
 */
export const DarkModeToggle = ({ className = "" }: DarkModeToggleProps) => {
  return (
    <ClientOnly
      fallback={
        <div className={`flex items-center space-x-2 ${className}`}>
          <Sun className="h-4 w-4 text-yellow-500" />
          <div className="bg-input inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent opacity-50 shadow-xs" />
          <Moon className="h-4 w-4 text-blue-400" />
        </div>
      }
    >
      <DarkModeToggleInner className={className} />
    </ClientOnly>
  );
};
