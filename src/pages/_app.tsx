import Navbar from "@/components/layouts/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Lato } from "next/font/google";
import Head from "next/head";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export default function App({
  Component,
  pageProps: { data, ...pageProps },
}: AppProps) {
  return (
    <AuthProvider session={data}>
      {/* <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head> */}
      <div className={lato.className}>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
