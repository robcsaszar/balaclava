import type {
  FactionInformation,
  MemberInformation,
} from "../../../common/types";

import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const interFont = fetch(
  new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.getAll("id");
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

  if (withFeats && featuredStats && featuredStats.length > 0) {
    const feats = [];
    const getStats = `https://api.torn.com/user/${memberId}?selections=personalstats&comment=getStats&key=${process.env.NEXT_PUBLIC_TORN_PUBLIC_API_KEY}`;
    const { personalstats } = await fetch(getStats).then((res) => res.json());
    featuredStats.forEach((stat) => {
      if (personalstats[stat]) {
        feats.push(
          <div tw="flex items-center justify-between text-sm tracking-tight">
            <span tw="">{stat}</span>
            <span tw="">{personalstats[stat]}</span>
          </div>
        );
      }
    });
  }

  const inter = await interFont;
  const themeColor = "#000";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          backgroundImage: `${
            withFeats ? "url(https://balaclava.vercel.app/feats.png), " : ""
          }url(https://balaclava.vercel.app/${factionId}.png)`,
          backgroundSize: "cover cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat no-repeat",
          width: 600,
          height: 100,
          color: themeColor,
        }}
      >
        <div
          tw={`flex flex-col justify-between bg-[${themeColor}] mx-auto rounded-lg p-2 bg-opacity-50`}
        >
          <div tw="flex w-full items-center justify-between text-xl tracking-tight ">
            <span tw="">{member.name}</span>
          </div>
          <div tw="flex w-full items-center mb-auto">
            <span tw="text-sm opacity-85">
              {member.position} · {member.days_in_faction} days
            </span>
          </div>
          <div tw="flex w-full items-center">
            <span tw="text-xs opacity-65">
              {member.last_action.status} · {member.last_action.relative}
            </span>
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
          data: inter,
          name: "Inter",
          style: "normal",
        },
      ],
    }
  );
}
