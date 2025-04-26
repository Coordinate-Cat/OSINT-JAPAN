import Link from "next/link";
import { HOME } from "@/constants";

/**
 * ホームページコンポーネント
 * 工事中のお知らせを表示するページ
 */
export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-neutral-600 p-2">
      <div className="font-kikai max-w-md border-2 bg-white p-2 text-left text-black">
        <p className="bg-red-600 text-center text-white">{HOME.TITLE}</p>
        <p className="mt-2 mb-8">{HOME.DESCRIPTION}</p>
        <div className="flex w-full flex-col px-10">
          <p className="w-fit">
            <span className="w-fit bg-yellow-300">
              {HOME.PERIOD_LABEL}
            </span>{" "}
          </p>
        </div>
        <div className="flex w-full flex-col px-10">
          <p className="w-fit">{HOME.PERIOD_VALUE}</p>
        </div>
        <div className="flex w-full flex-col px-10">
          <p className="w-fit">
            <span className="w-fit bg-yellow-300">
              {HOME.CONTENT_LABEL}
            </span>{" "}
          </p>
          <Link href={HOME.GITHUB_URL} className="underline">
            {HOME.LINK_TEXT}
          </Link>
        </div>
      </div>
    </main>
  );
}
