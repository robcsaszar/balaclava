import type {
  FactionInformation,
  MemberInformation,
} from "../../../common/types";
import HakaLeaf, { HakaLeafInverted } from "../../../ui/haka-leaf";

import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";
import { personalStatistics } from "../../../lib/personal-stats";

export const config = {
  runtime: "experimental-edge",
};

const Inter_Bold = fetch(
  new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const Inter_ExtraBold = fetch(
  new URL("../../../assets/fonts/Inter-ExtraBold.otf", import.meta.url)
).then((res) => res.arrayBuffer());

function numberShortened(x: number) {
  if (x >= 1000000000000) {
    return (x / 1000000000000).toFixed(2).replace(/\.0$/, "") + "T";
  }
  if (x >= 1000000000) {
    return (x / 1000000000).toFixed(2).replace(/\.0$/, "") + "B";
  }
  if (x >= 1000000) {
    return (x / 1000000).toFixed(2).replace(/\.0$/, "") + "M";
  }
  if (x >= 1000) {
    return (x / 1000).toFixed(2).replace(/\.0$/, "") + "K";
  }
  return x;
}

function secondsToDays(x: number) {
  return Math.floor(x / 86400);
}

function formatNumberByDataType(value: number, datatype: string) {
  if (datatype === "money") {
    return `$${numberShortened(value)}`;
  }

  if (datatype === "number") {
    return numberShortened(value);
  }

  if (datatype === "time") {
    return `${secondsToDays(value)} days`;
  }

  return value;
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.getAll("slug");
  const withFeats = !!searchParams.get("feats");
  const featuredStats = searchParams.get("stats")?.split(",");

  if (!ids || !ids[0] || !ids[1]) {
    return new Response("No IDs provided", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  if (ids.length > 2) {
    return new Response("Too many IDs provided", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const factionId = ids[0];
  const memberId = ids[1];

  const getFaction = `https://api.torn.com/faction/${factionId}?selections=basic&comment=getFaction&key=${process.env.NEXT_PUBLIC_TORN_MINIMAL_API_KEY}`;

  const faction: FactionInformation = await fetch(getFaction).then((res) =>
    res.json()
  );

  if (!faction) {
    return new Response("No faction found", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  if (!faction.members[memberId]) {
    return new Response("Invalid member ID provided", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const member: MemberInformation | undefined = faction.members[memberId];

  if (!member) {
    return new Response("Invalid member ID provided", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const feats: JSX.Element[] = [];
  if (withFeats && featuredStats && featuredStats.length > 0) {
    const getStats = `https://api.torn.com/user/${memberId}?selections=personalstats&comment=getStats&key=${process.env.NEXT_PUBLIC_TORN_PUBLIC_API_KEY}`;
    const { personalstats } = await fetch(getStats).then((res) => res.json());
    console.log(getStats);
    featuredStats.forEach((stat, i) => {
      if (personalstats[stat] && personalStatistics[stat]) {
        feats.push(
          <div key={i} tw="flex text-xs tracking-wide">
            <span tw="mr-1">{personalStatistics[stat]?.label}:</span>
            <span tw="">
              {formatNumberByDataType(
                personalstats[stat],
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
  const themeColor = "#fff";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          backgroundImage: `url(https://balaclava.vercel.app/${factionId}.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: 600,
          height: 100,
          color: themeColor,
        }}
      >
        {withFeats && (
          <div
            tw="flex absolute bg-white bg-opacity-20 top-1/2 left-2 rounded-md px-3 py-2 items-start justify-end overflow-hidden"
            style={{
              transform: "translateY(-50%)",
            }}
          >
            <div tw="flex absolute -bottom-4 -right-4 opacity-50">
              <HakaLeaf />
            </div>
            <div tw="flex absolute -bottom-4 -left-4 opacity-50">
              <HakaLeafInverted />
            </div>
            <span tw="flex flex-col my-auto">{feats}</span>
          </div>
        )}
        <div
          tw="flex absolute top-1/2 left-1/2"
          style={{ transform: "translateY(-50%) translateX(-50%)" }}
        >
          <div tw="flex flex-col items-center justify-center">
            <span tw="text-3xl font-extrabold tracking-tighter">
              {member.name}
            </span>
          </div>
        </div>
        <div
          tw="flex absolute bottom-1 left-1/2 flex-col items-center justify-center"
          style={{ transform: "translateX(-50%)" }}
        >
          <span tw="text-sm opacity-85 leading-1.3">
            {member.position} at {faction.name} · {member.days_in_faction} days
          </span>
          <span tw="text-xs opacity-50 leading-1">
            {member.last_action.status} · {member.last_action.relative}
          </span>
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
