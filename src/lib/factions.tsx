import type { FactionInformation } from "@/common/types";

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
  let srcUrl =
    "https://generative-placeholders.glitch.me/image?width=600&height=100&style=circles&colors=62";
  const fetchUrl = new URL(
    `../../../assets/factions/${id}/banner.png`,
    import.meta.url
  );
  try {
    const res = await fetch(fetchUrl);
    const blob = await res.blob();
    srcUrl = URL.createObjectURL(blob);
  } catch (e) {
    console.error(`Error fetching faction banner for ${id}: ${e}`);
  }
  return srcUrl;
}

export async function getFactionLogo(id: string): Promise<string> {
  let srcUrl =
    "https://generative-placeholders.glitch.me/image?width=500&height=500&style=mondrian";
  const fetchUrl = new URL(
    `../../../assets/factions/${id}/logo.png`,
    import.meta.url
  );
  try {
    const res = await fetch(fetchUrl);
    const blob = await res.blob();
    srcUrl = URL.createObjectURL(blob);
  } catch (e) {
    console.error(`Error fetching faction logo for ${id}: ${e}`);
  }
  return srcUrl;
}
