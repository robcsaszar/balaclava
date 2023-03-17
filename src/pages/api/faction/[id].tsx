/* eslint-disable @next/next/no-img-element */

import type { FactionInformation, MemberInformation } from "@/common/types";
import HakaLeaf, { HakaLeafInverted } from "@/ui/haka-leaf";

import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";
import { factions } from "@/lib/factions";
import { formatNumberByDataType } from "@/utils/data-formatting";
import { personalStatistics } from "@/lib/personal-stats";

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
  const factionLogo = searchParams.get("factionLogo") === "true";

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

  const faction: FactionInformation = await fetch(factions.getFaction(id)).then(
    (res) => res.json()
  );

  if (factions.getAll.indexOf(id) === -1) {
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

  if (!faction) {
    return new Response(`The provided faction ID '${id}' is invalid.`, {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  if (!faction.members[user]) {
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

  const member: MemberInformation = faction.members[user] as MemberInformation;

  if (!member) {
    return new Response(`The provided member ID "${user}" is invalid.`, {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const featuredStats = searchParams.get("stats")?.split(",");
  const feats: JSX.Element[] = [];
  const { personalstats } = await fetch(factions.getStats(user)).then((res) =>
    res.json()
  );

  if (featuredStats) {
    featuredStats.forEach((stat, i) => {
      if (personalStatistics[stat]) {
        let statValue: number;
        if (personalstats[stat] === undefined) {
          statValue = 0;
        }

        if (typeof personalstats[stat] === "string") {
          statValue = parseInt(personalstats[stat]);
        }

        if (stat === "kda") {
          statValue =
            (personalstats.attackswon + personalstats.attacksassisted / 2) /
            personalstats.defendslost;
        } else if (stat === "costperrehab") {
          statValue = personalstats.rehabcost / personalstats.rehabs;
        } else if (stat === "hitrate") {
          statValue =
            personalstats.attackhits /
            (personalstats.attackhits + personalstats.attackmisses);
        } else if (stat === "factionhits") {
          statValue =
            personalstats.rankedwarhits +
            personalstats.raidhits +
            personalstats.territoryclears +
            personalstats.retals;
        } else if (stat === "stealth") {
          statValue = personalstats.attacksstealthed / personalstats.attackswon;
        } else if (stat === "damageperhit") {
          statValue = personalstats.attackdamage / personalstats.attackhits;
        } else if (stat === "bloodliters") {
          statValue = personalstats.bloodwithdrawn / 2;
        } else if (stat === "beersdrunk") {
          statValue = personalstats.alcoholused * 0.33;
        } else {
          statValue = personalstats[stat];
        }

        if (i > 3) return;

        feats.push(
          <div key={i} tw="flex text-xs tracking-wide">
            <span tw="mr-1">{personalStatistics[stat]?.label}:</span>
            <span tw="">
              {formatNumberByDataType(
                statValue,
                personalStatistics[stat]?.type as string
              )}
            </span>
          </div>
        );
      }
    });
  }

  const interBold = await Inter_Bold;
  const interExtraBold = await Inter_ExtraBold;
  const themeColor = "#ffffff";

  return new ImageResponse(
    (
      <div
        tw={`flex relative text-[${themeColor}] overflow-hidden ${
          rounded ? "rounded-xl" : ""
        }`}
      >
        <img
          src={`https://balaclava.vercel.app/${id}.png`}
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
                  {member.days_in_faction} days · {member.last_action.status} ·{" "}
                  {member.last_action.relative}
                </span>
              </div>
            </div>
          </div>
          <div tw="flex w-1/3 px-2">
            <div tw="flex">
              <img
                tw={`w-full ${!factionLogo ? "hidden" : ""}`}
                src={`https://balaclava.vercel.app/logo_${id}.svg`}
                alt={`Faction logo for faction ${faction.name}`}
              />
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
