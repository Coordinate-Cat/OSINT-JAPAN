import Link from "next/link";

export default function Home() {
  return (
    <main className="flex ml-3 mt-3 bg-black text-white">
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
