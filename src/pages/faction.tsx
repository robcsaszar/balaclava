import { useEffect, useState } from "react";

import Alignment from "@/ui/alignment";
import BackgroundImage from "@/assets/images/bg.jpg";
import DaysInFaction from "@/ui/days-in-faction";
import FactionLogo from "@/ui/faction-logo";
import Image from "next/image";
import InputField from "@/components/input-field";
import Output from "@/ui/output";
import Rounded from "@/ui/rounded";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatsCombobox from "@/ui/stats-combo-box";
import balaclava from "app.config.mjs";
import { labeledStats } from "@/lib/personal-stats";
import { whitelisted } from "@/lib/factions";

const whitelistedFactions = new Set(whitelisted.getAll);

function checkFactionId(id: string) {
  return whitelistedFactions.has(id);
}

export default function Faction() {
  const [url, setUrl] = useState("");
  const [factionId, setFactionId] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [userId, setUserId] = useState("");
  const [stats, setStats] = useState<string[]>([]);
  const [align, setAlign] = useState("center");
  const [rounded, setRounded] = useState(false);
  const [output, setOutput] = useState(false);
  const [factionLogo, setFactionLogo] = useState(true);
  const [daysInFaction, setDaysInFaction] = useState(true);

  useEffect(() => {
    const buildUrl = () => {
      const baseUrl = new URL(balaclava.url);
      baseUrl.pathname = `api/faction/${factionId}`;
      baseUrl.searchParams.append("user", userId);

      if (stats.length > 0) {
        baseUrl.searchParams.append("stats", stats.join(","));
      }

      if (align !== "center") {
        baseUrl.searchParams.append("align", align);
      }

      if (rounded) {
        baseUrl.searchParams.append("rounded", rounded.toString());
      }

      if (!factionLogo) {
        baseUrl.searchParams.append("factionLogo", factionLogo.toString());
      }

      if (!daysInFaction) {
        baseUrl.searchParams.append("daysInFaction", daysInFaction.toString());
      }

      return baseUrl.toString();
    };

    setUrl(buildUrl());
  }, [factionId, userId, stats, align, rounded, factionLogo, daysInFaction]);

  if (!labeledStats) {
    return <div>Loading stats...</div>;
  }

  const handleFactionIdChange = (newValue: string) => {
    setFactionId(newValue);
    setAllowed(checkFactionId(newValue));
  };

  const handleUserIdChange = (newValue: string) => {
    setUserId(newValue);
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

  const fields = [
    {
      type: "number",
      id: "factionId",
      label: "Faction ID",
      placeholder: "e.g. 33007",
      onValueChange: handleFactionIdChange,
      validationFunction: checkFactionId,
    },
    {
      type: "number",
      id: "userId",
      label: "User ID",
      placeholder: "e.g. 906148",
      onValueChange: handleUserIdChange,
    },
  ];

  return (
    <ScrollArea className="h-screen">
      <div className="relative isolate flex flex-col justify-center bg-eminence-950 p-4 text-eminence-100">
        <main className="z-10 flex w-full flex-col items-center justify-center gap-6">
          <h1 className="text-2xl font-extrabold tracking-tighter">
            Customize your faction banner
          </h1>
          <form className="flex w-full max-w-2xl flex-col justify-center gap-4">
            {fields.map((field) => (
              <InputField
                key={field.id}
                type={field.type}
                id={field.id}
                label={field.label}
                placeholder={field.placeholder}
                onValueChange={field.onValueChange}
                validationFunction={field.validationFunction}
              />
            ))}
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
        <div className="fixed inset-0 isolate z-0">
          <div className="absolute inset-0 z-20 bg-eminence-800 mix-blend-soft-light"></div>
          <Image
            src={BackgroundImage}
            alt="Image of a derelict street"
            quality={100}
            fill
            className="z-10 opacity-50 saturate-0 filter"
            placeholder="blur"
            priority
            style={{
              objectFit: "cover",
            }}
          />
          <div className="absolute inset-0 z-0 bg-eminence-950"></div>
        </div>
      </div>
    </ScrollArea>
  );
}
