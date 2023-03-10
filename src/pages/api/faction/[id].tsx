import type {
  FactionInformation,
  MemberInformation,
} from "../../../common/types";
import HakaLeaf, { HakaLeafInverted } from "../../../ui/haka-leaf";

import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";
import { formatNumberByDataType } from "../../../utils/data-formatting";
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
  const withFeats = !!searchParams.get("feats");
  const featuredStats = searchParams.get("stats")?.split(",");

  if (!id || !id[0] || !id[1]) {
    return new Response("No IDs provided", {
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

  const getFaction = `https://api.torn.com/faction/${id}?selections=basic&comment=getFaction&key=${process.env.NEXT_PUBLIC_TORN_MINIMAL_API_KEY}`;

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

  if (!faction.members[user]) {
    return new Response("Invalid member ID provided", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const member: MemberInformation | undefined = faction.members[user];

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
    const getStats = `https://api.torn.com/user/${user}?selections=personalstats&comment=getStats&key=${process.env.NEXT_PUBLIC_TORN_PUBLIC_API_KEY}`;
    const { personalstats } = await fetch(getStats).then((res) => res.json());
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
          backgroundImage: `url(https://balaclava.vercel.app/${id}.png)`,
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
