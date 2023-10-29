// import Image from "next/image";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
// import {
//   organizationsLength,
//   organizationsName,
// } from "@/components/links/GovernmentLinks";

// 英語フォントの読み込み
const inter = Inter({ subsets: ["latin"] });
// 日本語フォントの読み込み
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export default function Home() {
  // const gridItems = [];

  // for (let i = 0; i < 8; i++) {
  //   gridItems.push(
  //     <div className="flex flex-col rounded-xl justify-between items-start w-52 h-52 p-4 border-4 border-white">
  //       <Image
  //         src="/icons/government.png"
  //         alt="Government"
  //         width={32}
  //         height={32}
  //         className="invert"
  //       />
  //       <div>
  //         <h2 className="font-bold"></h2>
  //         <span className="text-gray-600">{organizationsLength} items</span>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <main
      className={`flex ml-3 mt-3 ${inter.className} ${notoSansJP.className} bg-black text-white`}
    >
      <div className="text-left border-2 p-2">
        {/* <div className="grid grid-cols-4 gap-4">{gridItems}</div> */}
        osint-japan
        <br />
        developing...
        <br />
        <Link
          href="https://github.com/Coordinate-Cat/OSINT-JAPAN"
          className="underline hover:underline hover:decoration-4"
        >
          Coordinate-Cat/OSINT-JAPAN
        </Link>
      </div>
    </main>
  );
}
