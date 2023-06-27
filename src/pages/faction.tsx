// A page with a form to create a URL for the API at api/faction/[id].tsx

import Alignment from "@/ui/alignment";
import DaysInFaction from "@/ui/days-in-faction";
import FactionLogo from "@/ui/faction-logo";
import Output from "@/ui/output";
import Rounded from "@/ui/rounded";
import StatsCombobox from "@/ui/stats-combo-box";
import { labeledStats } from "@/lib/personal-stats";
import { useState } from "react";
import { whitelisted } from "@/lib/factions";

function checkFactionId(id: string) {
  const faction = whitelisted.getAll.find((f) => f === id);
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
  const [output, setOutput] = useState(false);
  const [factionLogo, setFactionLogo] = useState(true);
  const [daysInFaction, setDaysInFaction] = useState(true);

  if (!labeledStats) {
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

  const handleFactionLogoChange = (factionLogo: boolean) => {
    setFactionLogo(factionLogo);
  };

  const handleDaysInFactionChange = (daysInFaction: boolean) => {
    setDaysInFaction(daysInFaction);
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

    if (!factionLogo) {
      url += `&factionLogo=${factionLogo}`;
    }

    if (!daysInFaction) {
      url += `&daysInFaction=${daysInFaction}`;
    }

    return url;
  };

  const url = buildUrl();

  return (
    <div className="relative flex min-h-screen flex-col justify-center bg-eminence-800 p-4 text-eminence-100">
      <main className="flex w-full flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-extrabold tracking-tighter">Balaclava</h1>
        <p className="text-md">
          <strong>Customize</strong> your banner -&gt; get <strong>URL</strong>{" "}
          -&gt; use <strong>anywhere</strong>.
        </p>
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
          <div
            className={`w-full ${
              !allowed
                ? "pointer-events-none cursor-not-allowed select-none opacity-40"
                : ""
            }`}
          >
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
                className="block w-48 rounded-lg border border-eminence-700 bg-eminence-900 p-2.5 text-sm text-eminence-50 transition-colors focus:border-eminence-500 focus:ring-eminence-500 focus:placeholder:opacity-25 focus:placeholder:transition-opacity disabled:opacity-50"
                min="1"
                placeholder="e.g. 906148"
              />
            </label>
          </div>
          <div
            className={`flex w-full flex-col gap-1 ${
              !allowed
                ? "pointer-events-none cursor-not-allowed select-none opacity-40"
                : ""
            }`}
          >
            <StatsCombobox stats={stats} onChange={handleStatsChange} />
          </div>
          <div
            className={`flex w-full flex-col ${
              !allowed
                ? "pointer-events-none cursor-not-allowed select-none opacity-40"
                : ""
            }`}
          >
            <Alignment align={align} onChange={handleAlignChange} />
          </div>
          <div
            className={`flex w-full flex-col items-start ${
              !allowed
                ? "pointer-events-none cursor-not-allowed select-none opacity-40"
                : ""
            }`}
          >
            <Rounded rounded={rounded} onChange={handleRoundedChange} />
          </div>
          <div
            className={`flex w-full flex-col items-start ${
              !allowed
                ? "pointer-events-none cursor-not-allowed select-none opacity-40"
                : ""
            }`}
          >
            <FactionLogo
              logo={factionLogo}
              onChange={handleFactionLogoChange}
            />
          </div>
          <div
            className={`flex w-full flex-col items-start ${
              !allowed
                ? "pointer-events-none cursor-not-allowed select-none opacity-40"
                : ""
            }`}
          >
            <DaysInFaction
              daysInFaction={daysInFaction}
              onChange={handleDaysInFactionChange}
            />
          </div>
          {output && <Output url={url} />}
        </form>
      </main>
      <div className="absolute inset-0 top-1/2 -z-10 bg-gradient-to-t from-eminence-800 to-eminence-700"></div>
    </div>
  );
}
