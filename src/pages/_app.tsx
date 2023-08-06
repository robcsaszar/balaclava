import { type AppType } from "next/app";
import { Inter, Fira_Code } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira",
});

import { trpc } from "../lib/utils/trpc";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main
      className={`${inter.variable} font-sans ${firaCode.variable} selection:bg-persian-600 selection:text-persian-50`}
    >
      <Component {...pageProps} />
    </main>
  );
};

export default trpc.withTRPC(MyApp);
