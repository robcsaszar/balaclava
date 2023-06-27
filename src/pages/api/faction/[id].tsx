/* eslint-disable @next/next/no-img-element */

import HakaLeaf, { HakaLeafInverted } from "@/ui/haka-leaf";
import {
  getFactionBanner,
  getFactionInfo,
  getFactionLogo,
  whitelisted,
} from "@/lib/factions";
import { labeledStats, specialStats } from "@/lib/personal-stats";

import FactionIcon from "@/ui/icon-faction";
import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";
import { formatNumberByDataType } from "@/utils/data-formatting";
import { getUserPersonalStats } from "@/lib/users";

export const config = {
  runtime: "edge",
};

const Inter_Bold = fetch(
  new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const Inter_ExtraBold = fetch(
  new URL("../../../assets/fonts/Inter-ExtraBold.otf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  if (req.method !== "GET") {
    return new Response("Method not allowed", {
      status: 405,
      headers: {
        Allow: "GET",
      },
    });
  }

  if (!req.url) {
    return new Response("No URL provided", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const user = searchParams.get("user");
  const rounded = searchParams.get("rounded") === "true";
  const align = searchParams.get("align") || "center";

  let setFactionLogo = true;
  if (searchParams.get("factionLogo")) {
    setFactionLogo = searchParams.get("factionLogo") === "true";
  }

  let daysInFaction = true;
  if (setFactionLogo && searchParams.get("daysInFaction")) {
    daysInFaction = searchParams.get("daysInFaction") === "true";
  }

  if (!id) {
    return new Response("No faction ID provided", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  if (!user) {
    return new Response("No user ID provided", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  if (whitelisted.getAll.indexOf(id) === -1) {
    return new Response(
      `This faction is not whitelisted or the faction ID '${id}' is invalid.`,
      {
        status: 400,
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }

  const faction = await getFactionInfo(id);
  if (!faction) {
    return new Response(`The provided faction ID '${id}' is invalid.`, {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const member = faction.members[user];
  if (!member) {
    return new Response(
      `The provided member ID "${user}" is invalid or not a faction member.`,
      {
        status: 400,
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }

  // Split the encoded stats into an array
  const featuredStats = searchParams.get("stats")?.split(",") ?? [];
  const feats: JSX.Element[] = [];
  const personalstats = await getUserPersonalStats(user);

  if (!featuredStats) return;

  featuredStats.forEach((stat, i) => {
    let statValue = 0;

    if (specialStats[stat]) {
      statValue = specialStats[stat]?.calculate(personalstats) ?? 0;
    } else {
      statValue = personalstats[stat] ?? 0;
    }

    if (i > 3) return;

    feats.push(
      <div key={i} tw="flex text-xs tracking-wide">
        <span tw="mr-1">{labeledStats[stat]?.label}:</span>
        <span tw="">
          {formatNumberByDataType(
            statValue,
            labeledStats[stat]?.type as string
          )}
        </span>
      </div>
    );
  });

  const interBold = await Inter_Bold;
  const interExtraBold = await Inter_ExtraBold;
  const themeColor = "#ffffff";
  const factionBanner = await getFactionBanner(id);
  const factionLogo = await getFactionLogo(id);
  return new ImageResponse(
    (
      <div
        tw={`flex relative text-[${themeColor}] overflow-hidden ${
          rounded ? "rounded-xl" : ""
        }`}
      >
        <img
          src={factionBanner}
          alt={`Faction image for faction ${faction.name}`}
        />
        <div
          tw={`flex absolute top-2 right-2 bottom-2 left-2 justify-center items-${align}`}
        >
          <div tw="relative w-1/3 h-full flex items-center">
            {feats.length > 0 && (
              <div
                tw={`flex bg-[${themeColor}] rounded-lg bg-opacity-30 px-3 py-2 items-start justify-end overflow-hidden`}
              >
                <div tw="flex absolute -bottom-4 -right-4 opacity-20">
                  <HakaLeaf color={themeColor} />
                </div>
                <div tw="flex absolute -bottom-4 -left-4 opacity-20">
                  <HakaLeafInverted color={themeColor} />
                </div>
                <span tw="flex flex-col my-auto">{feats}</span>
              </div>
            )}
          </div>
          <div tw="flex w-1/3">
            <div tw="relative w-full flex items-center flex-col">
              <span
                tw="text-3xl font-extrabold tracking-tighter leading-1"
                style={{
                  textShadow: "#001224 1px 0 10px",
                }}
              >
                {member.name}
              </span>
              <div
                tw={`flex flex-col absolute top-full items-center ${
                  align === "end" ? "opacity-0" : "opacity-100"
                }`}
              >
                <span tw="text-xs opacity-85 leading-1.3">
                  {member.position} of {faction.name}
                </span>
                <span tw="text-xs opacity-70 leading-1">
                  {member.last_action.status} · {member.last_action.relative}
                </span>
              </div>
            </div>
          </div>
          <div tw="flex w-1/3 px-2">
            <div
              tw={`relative w-full flex items-center flex-col ${
                setFactionLogo ? "" : "hidden"
              }`}
            >
              <img
                tw="w-full"
                src={factionLogo}
                alt={`Faction logo for faction ${faction.name}`}
              />
              {daysInFaction && (
                <div
                  tw={`mt-1 flex flex-col absolute top-full w-full items-center ${
                    align === "end" ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span tw="text-xs rounded-md overflow-hidden self-end items-center font-bold bg-white/20 px-2">
                    <div tw="flex mr-1 opacity-50">
                      <FactionIcon color={themeColor} />
                    </div>
                    {member.days_in_faction} days
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 600,
      height: 100,
      status: 200,
      // debug: true,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "s-maxage=1, stale-while-revalidate=59",
      },
      fonts: [
        {
          data: interBold,
          name: "Inter",
          style: "normal",
        },
        {
          data: interExtraBold,
          name: "Inter",
          weight: 800,
        },
      ],
    }
  );
}
