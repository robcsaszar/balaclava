// A page with a form to create a URL for the API at api/faction/[id].tsx

import { useRef, useState } from "react";

import Alignment from "@/ui/alignment";
import Image from "next/image";
import Rounded from "@/ui/rounded";
import Skully from "@/components/skully";
import StatsCombobox from "@/ui/stats-combo-box";
import StatsComboboxStatsCombobox from "@/ui/stats-combo-box";
import { factions } from "@/lib/factions";
import { personalStatistics } from "@/lib/personal-stats";

function checkFactionId(id: string) {
  const faction = factions.getAll.find((f) => f === id);
  if (faction) {
    return true;
  }
  return false;
}

export default function Faction() {
  const [factionId, setFactionId] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [userId, setUserId] = useState("");
  const [stats, setStats] = useState<string[]>([]);
  const [align, setAlign] = useState("center");
  const [rounded, setRounded] = useState(false);
  const outputRef = useRef<HTMLOutputElement>(null);
  const [copy, setCopy] = useState(false);
  const [preview, setPreview] = useState(false);
  const [output, setOutput] = useState(false);
  const [pinned, setPinned] = useState(false);

  if (!personalStatistics) {
    return <div>Loading stats...</div>;
  }

  const handleFactionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFactionId(e.target.value);
    setAllowed(checkFactionId(e.target.value));
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
    setOutput(true);
  };

  const handleStatsChange = (stats: string[]) => {
    setStats(stats);
  };

  const handleAlignChange = (align: string) => {
    setAlign(align);
  };

  const handleRoundedChange = (rounded: boolean) => {
    setRounded(rounded);
  };

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (outputRef.current) {
      setCopy(true);
      navigator.clipboard.writeText(outputRef.current.textContent || "");
    }
  };

  const buildUrl = () => {
    let url = `https://balaclava.app/api/faction/${factionId}?user=${userId}`;
    if (stats.length > 0) {
      url += `&stats=${stats}`;
    }

    if (align !== "center") {
      url += `&align=${align}`;
    }

    if (rounded) {
      url += `&rounded=${rounded}`;
    }

    return url;
  };

  const goToUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const url = buildUrl();
    window.open(url, "_blank");
  };

  const handlePreview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPreview(!preview);
  };

  const handlePin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPinned(!pinned);
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center bg-eminence-800 p-4 text-eminence-100">
      <main className="flex w-full flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-extrabold tracking-tighter">Balaclava</h1>
        <p className="text-md opacity-70">Customize your live faction banner</p>
        <form className="mt-12 flex w-full max-w-xl flex-col items-center justify-center gap-4">
          <div className="w-full">
            <label
              htmlFor="factionId"
              className={`flex flex-col gap-1 text-sm font-bold uppercase tracking-widest transition-colors focus-within:text-eminence-300 ${
                allowed ? "text-emerald-300 focus-within:text-emerald-300" : ""
              }`}
            >
              <div className="flex items-center gap-1">
                Faction ID{" "}
                {allowed ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-lock-open"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 11m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
                    <path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                    <path d="M8 11v-5a4 4 0 0 1 8 0"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-lock"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path>
                    <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
                    <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path>
                  </svg>
                )}
              </div>
              <input
                required
                type="number"
                pattern="\d*"
                name="factionId"
                id="factionId"
                value={factionId}
                onChange={handleFactionIdChange}
                className={`block w-32 rounded-lg border border-eminence-700 bg-eminence-900 p-2.5 text-sm text-eminence-50 transition-colors focus:border-eminence-500 focus:ring-eminence-500 focus:placeholder:opacity-25 focus:placeholder:transition-opacity ${
                  allowed
                    ? "border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500"
                    : ""
                }`}
                min="1"
                placeholder="e.g. 33007"
              />
            </label>
          </div>
          <div className="w-full">
            <label
              htmlFor="userId"
              className="flex flex-col gap-1 text-sm font-bold uppercase tracking-widest transition-colors focus-within:text-eminence-300 "
            >
              User ID
              <input
                required
                type="number"
                pattern="\d*"
                name="userId"
                id="userId"
                value={userId}
                onChange={handleUserIdChange}
                className="block w-48 rounded-lg border border-eminence-700 bg-eminence-900 p-2.5 text-sm text-eminence-50 transition-colors focus:border-eminence-500 focus:ring-eminence-500 focus:placeholder:opacity-25 focus:placeholder:transition-opacity"
                min="1"
                placeholder="e.g. 906148"
              />
            </label>
          </div>
          <div className="flex w-full flex-col gap-1">
            <StatsCombobox stats={stats} onChange={handleStatsChange} />
          </div>
          <div className="flex w-full flex-col">
            <Alignment align={align} onChange={handleAlignChange} />
          </div>
          <div className="flex w-full flex-col items-start">
            <Rounded rounded={rounded} onChange={handleRoundedChange} />
          </div>
          {output && (
            <div
              className={
                pinned
                  ? "fixed bottom-4 left-4 right-4 backdrop-blur-lg"
                  : "w-full"
              }
            >
              <div className="relative flex flex-col gap-4 rounded-xl bg-eminence-400/20 px-4 py-3 text-eminence-100 ring-1 ring-eminence-300/50">
                <div className="flex gap-2">
                  <div className="w-16">
                    <Skully width={56} height={56} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="flex items-end gap-2 font-bold text-eminence-300">
                      Here&apos;s your URL:
                    </span>
                    <output
                      className="break-all font-mono text-sm leading-none "
                      ref={outputRef}
                    >
                      {buildUrl()}
                    </output>
                  </div>
                </div>
                {preview && (
                  <div className="relative">
                    <Image
                      src={buildUrl()}
                      alt="Dynamic image preview of faction banner"
                      width={600}
                      height={100}
                      onError={() => setPreview(false)}
                    />
                  </div>
                )}
                <div className="absolute right-3 flex gap-4 text-eminence-400/50 transition-colors ">
                  {/* <button onClick={handlePin}>
                    {pinned ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-colors hover:text-eminence-300"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path
                          d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z"
                          strokeWidth={0}
                          fill="currentColor"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-colors hover:text-eminence-300"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4"></path>
                        <path d="M9 15l-4.5 4.5"></path>
                        <path d="M14.5 4l5.5 5.5"></path>
                      </svg>
                    )}
                    <span className="sr-only">Copy to clipboard</span>
                  </button> */}
                  <button onClick={handlePreview}>
                    {preview ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-colors hover:text-eminence-300"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path
                          d="M12 4c4.29 0 7.863 2.429 10.665 7.154l.22 .379l.045 .1l.03 .083l.014 .055l.014 .082l.011 .1v.11l-.014 .111a.992 .992 0 0 1 -.026 .11l-.039 .108l-.036 .075l-.016 .03c-2.764 4.836 -6.3 7.38 -10.555 7.499l-.313 .004c-4.396 0 -8.037 -2.549 -10.868 -7.504a1 1 0 0 1 0 -.992c2.831 -4.955 6.472 -7.504 10.868 -7.504zm0 5a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z"
                          strokeWidth={0}
                          fill="currentColor"
                        ></path>
                      </svg>
                    ) : (
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-colors hover:text-eminence-300"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                          <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                        </svg>
                      </div>
                    )}
                    <span className="sr-only">Copy to clipboard</span>
                  </button>
                  <button onClick={goToUrl}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="-rotate-45 transition-all hover:rotate-0 hover:text-eminence-300"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l14 0"></path>
                      <path d="M13 18l6 -6"></path>
                      <path d="M13 6l6 6"></path>
                    </svg>
                    <span className="sr-only">Go to Url</span>
                  </button>
                  <button onClick={handleCopy}>
                    {copy ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-emerald-500"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M5 12l5 5l10 -10"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-colors hover:text-eminence-300"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
                        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
                      </svg>
                    )}
                    <span className="sr-only">Copy to clipboard</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </main>
      <div className="absolute inset-0 top-1/2 -z-10 bg-gradient-to-t from-eminence-800 to-eminence-700"></div>
    </div>
  );
}
