import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>トップページ</title>
        <meta
          name="description"
          property="og:title"
          content="Resource site for osint in Japan."
          key="title"
        />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
