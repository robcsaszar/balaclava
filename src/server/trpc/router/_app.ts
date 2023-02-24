import { factionRouter } from "./faction";
import { router } from "../trpc";

export const appRouter = router({
  faction: factionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
