/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "@vercel/og";
import type { PlayerInformation } from "../../common/types";

export const config = {
  runtime: "experimental-edge",
};

const interFont = fetch(
  new URL("../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const tornApi = `https://api.torn.com/user/?selections=profile&key=${process.env.NEXT_PUBLIC_TORN_PUBLIC_API_KEY}`;

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
          backgroundImage: "url(https://balaclava.vercel.app/906148.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: 600,
          height: 100,
          color: "white",
        }}
      >
        <div tw="flex flex-col justify-between absolute bg-white inset-2 rounded-lg p-2 w-1/3 bg-opacity-20">
          <div tw="flex w-full items-center justify-between text-xl tracking-tight">
            <span tw="">{torn.name}</span>
            <span tw="px-1 bg-white bg-opacity-20 rounded-md ml-2">
              {torn.level}
            </span>
          </div>
          <div tw="flex w-full items-center mb-auto">
            <span tw="text-sm opacity-75">{torn.rank}</span>
          </div>
          <div tw="flex w-full items-center">
            <span tw="text-xs opacity-75">
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
