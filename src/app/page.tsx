import Link from "next/link";

// 定数の定義
const TEXTS = {
  title: "工事のお知らせ",
  description:
    "只今工事中の為、通行できません。ご不便をお掛けしますが、皆様のご協力をお願いします。",
  periodLabel: "工事期間:",
  periodValue: "2025年4月11日(金) 〜 2251年4月20日(日)",
  contentLabel: "工事内容:",
  linkText: "外部サイト（GitHub）→",
  githubUrl: "https://github.com/Coordinate-Cat/OSINT-JAPAN",
};

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-neutral-600 p-2">
      <div className="font-kikai max-w-md border-2 bg-white p-2 text-left text-black">
        <p className="bg-red-600 text-center text-white">{TEXTS.title}</p>
        <p className="mt-2 mb-8">{TEXTS.description}</p>
        <div className="flex w-full flex-col px-10">
          <p className="w-fit">
            <span className="w-fit bg-yellow-300">
              {TEXTS.periodLabel}
            </span>{" "}
          </p>
        </div>
        <div className="flex w-full flex-col px-10">
          <p className="w-fit">{TEXTS.periodValue}</p>
        </div>
        <div className="flex w-full flex-col px-10">
          <p className="w-fit">
            <span className="w-fit bg-yellow-300">
              {TEXTS.contentLabel}
            </span>{" "}
          </p>
          <Link href={TEXTS.githubUrl} className="underline">
            {TEXTS.linkText}
          </Link>
        </div>
      </div>
    </main>
  );
}
