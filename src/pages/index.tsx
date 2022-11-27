import { type NextPage } from "next";
import Head from "next/head";

function goBack(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.preventDefault();
  window.history.back();
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>TORN Playground</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="flex flex-col items-center justify-center gap-12 px-4 py-16 text-center ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white">
            Caught you{" "}
            <span className="text-[hsl(280,100%,70%)]">snoopin&apos;</span>
          </h1>
          <button
            className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 font-bold text-white hover:bg-white/20"
            onClick={goBack}
          >
            Go back →
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
