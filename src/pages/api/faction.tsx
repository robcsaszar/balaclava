/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NextApiRequest, NextApiResponse } from "next";

import type { MemberInformation } from "../../common/types";

const getFaction = `https://api.torn.com/faction/?selections=basic&comment=getFaction&key=${process.env.NEXT_PUBLIC_TORN_MINIMAL_API_KEY}`;
const getStats = `https://api.torn.com/user/:ID?selections=personalstats&comment=getStats&key=${process.env.NEXT_PUBLIC_TORN_PUBLIC_API_KEY}`;

const sortObject = (obj: Record<string, unknown>) =>
  Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {} as Record<string, unknown>);

const sortMembers = (members: MemberInformation[]) =>
  members.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=31");

  return new Promise<void>(async (resolve) => {
    switch (req.method) {
      case "GET": {
        try {
          const faction = await fetch(getFaction);
          const { members } = await faction.json();

          const memberIds = Object.keys(members);
          const memberInfo = await Promise.all(
            memberIds.map(async (memberId) => {
              const member = await fetch(getStats.replace(":ID", memberId));
              let { personalstats } = await member.json();

              if (req.query) {
                // /api/faction?stat=awards
                if (req.query.stat) {
                  const stat = req.query.stat as string;
                  if (personalstats[stat]) {
                    personalstats = { [stat]: personalstats[stat] };
                  }
                }
              }

              const memberInformation: MemberInformation = {
                member_id: memberId,
                ...members[memberId],
                personalstats: sortObject(personalstats),
              };

              return memberInformation;
            })
          );
          res.status(200).json(sortMembers(memberInfo));

          return resolve();
        } catch (error: any) {
          res.status(500).json({ error: error.message });
          return resolve();
        }
      }
    }
    res.status(405).end();
    return resolve();
  });
}
