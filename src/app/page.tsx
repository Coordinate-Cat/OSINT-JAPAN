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
    <main className="p-2 bg-neutral-600 flex justify-center items-center h-screen">
      <div className="max-w-md text-left border-2 bg-white text-black p-2 font-kikai">
        <p className="text-center text-white bg-red-600">{TEXTS.title}</p>
        <p className="mt-2 mb-8">{TEXTS.description}</p>
        <div className="flex flex-col w-full px-10">
          <p className="w-fit">
            <span className="bg-yellow-300 w-fit">{TEXTS.periodLabel}</span>{" "}
          </p>
        </div>
        <div className="flex flex-col w-full px-10">
          <p className="w-fit">{TEXTS.periodValue}</p>
        </div>
        <div className="flex flex-col w-full px-10">
          <p className="w-fit">
            <span className="bg-yellow-300 w-fit">{TEXTS.contentLabel}</span>{" "}
          </p>
          <Link href={TEXTS.githubUrl} className="underline">
            {TEXTS.linkText}
          </Link>
        </div>
      </div>
    </main>
  );
}
