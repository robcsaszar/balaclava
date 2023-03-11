export const factions = {
  getFaction: (id: string) =>
    `https://api.torn.com/faction/${id}?selections=basic&comment=getFaction&key=${process.env.NEXT_PUBLIC_TORN_MINIMAL_API_KEY}`,
  getStats: (id: string) =>
    `https://api.torn.com/user/${id}?selections=personalstats&comment=getStats&key=${process.env.NEXT_PUBLIC_TORN_PUBLIC_API_KEY}`,
  getAll: ["33007"],
};