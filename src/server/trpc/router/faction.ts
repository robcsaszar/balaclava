import { publicProcedure, router } from "../trpc";

import { z } from "zod";

const getFaction = `https://api.torn.com/faction/:ID?selections=basic&key=${process.env.NEXT_PUBLIC_TORN_API_KEY}`;
const getMemberStats = `https://api.torn.com/user/:ID?selections=personalstats&key=${process.env.NEXT_PUBLIC_TORN_API_KEY}`;

export const factionRouter = router({
  getFaction: publicProcedure
    .input(z.object({ factionId: z.string().nullish() }).nullish())
    .query(async ({ input }) => {
      const res = await fetch(
        getFaction.replace(":ID", input?.factionId ?? "")
      );
      return await res.json();
    }),
});
