import { type AppType } from "next/app";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default trpc.withTRPC(MyApp);
