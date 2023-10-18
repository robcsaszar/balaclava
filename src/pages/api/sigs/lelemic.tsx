/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "@vercel/og";
import type { PlayerInformation } from "../../../common/types";
import balaclava from "app.config.mjs";

export const config = {
  runtime: "edge",
};

const interFont = fetch(
  new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const tornApi = `https://api.torn.com/user/2665568?selections=profile&key=${process.env.NEXT_PUBLIC_TORN_PUBLIC_API_KEY}`;

export default async function handler() {
  const inter = await interFont;
  const torn: PlayerInformation = await fetch(tornApi).then((res) =>
    res.json()
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: 600,
          height: 100,
          color: "#ffcfb0",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${balaclava.url}/lelemic.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: 600,
            height: 100,
          }}
        ></div>
        <div tw="flex flex-col absolute bg-[#ff641d] left-2 top-2 bottom-2 rounded-lg p-2 bg-opacity-10">
          <div tw="flex justify-between text-xl tracking-tight w-full flex-1">
            <span tw="">{torn.name}</span>
            <span tw="px-1 bg-[#ff641d] bg-opacity-20 rounded-md">
              {torn.level}
            </span>
          </div>
          <div tw="flex items-center mb-auto opacity-75">
            <span tw="text-sm">{torn.rank}</span>
          </div>
          <div tw="flex items-center opacity-50">
            <span tw="text-xs">
              {torn.last_action.status} · {torn.status.state}
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
