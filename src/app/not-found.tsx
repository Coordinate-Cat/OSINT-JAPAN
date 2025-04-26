import Link from "next/link";
import { NOT_FOUND } from "@/constants";

export default function NotFound() {
  return (
    <main className="flex h-screen items-center justify-center bg-neutral-600 p-2">
      <div className="font-kikai max-w-md border-2 bg-white p-2 text-left text-black">
        <div>
          <p className="bg-red-600 text-center text-white">{NOT_FOUND.TITLE}</p>
          <p className="mt-2">
            {NOT_FOUND.MESSAGE} <br />
            {NOT_FOUND.SUGGESTION}
          </p>
          <div className="w-full text-center">
            <Link href="/" className="underline">
              {NOT_FOUND.HOME_LINK}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
