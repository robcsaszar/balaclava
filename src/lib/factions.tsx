import type { FactionInformation } from "@/common/types";
import balaclava from "app.config.mjs";

export const whitelisted = {
  getMemberStats: (id: string) =>
    `https://api.torn.com/user/${id}?selections=personalstats&comment=getStats&key=${process.env.NEXT_PUBLIC_TORN_PUBLIC_API_KEY}`,
  getAll: ["33007", "22781"],
};

export async function getFactionInfo(
  id: string
): Promise<FactionInformation | undefined> {
  const fetchUrl = new URL(`https://api.torn.com/faction/${id}`);
  fetchUrl.searchParams.append("selections", "basic");
  fetchUrl.searchParams.append("comment", "getFaction");
  fetchUrl.searchParams.append(
    "key",
    process.env.NEXT_PUBLIC_TORN_MINIMAL_API_KEY?.toString() || ""
  );

  try {
    const res = await fetch(fetchUrl);
    const json = await res.json();
    return json;
  } catch (e) {
    console.error(`Error fetching faction info for ${id}: ${e}`);
  }
}

export async function getFactionBanner(id: string): Promise<string> {
  const fallbackUrl = `${balaclava.url}/banners/1.png`;
  const bannerUrl = `${balaclava.url}/factions/${id}/banner.png`;

  try {
    const res = await fetch(bannerUrl);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (e) {
    console.error(`Error fetching faction banner for ${id}: ${e}`);
  }
  return fallbackUrl;
}

export async function getFactionLogo(id: string): Promise<string> {
  const fallbackUrl = `${balaclava.url}/logos/1.png`;
  const logoUrl = `${balaclava.url}/factions/${id}/logo.png`;

  try {
    const res = await fetch(logoUrl);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (e) {
    console.error(`Error fetching faction logo for ${id}: ${e}`);
  }
  return fallbackUrl;
}
