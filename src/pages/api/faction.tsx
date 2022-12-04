/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NextApiRequest, NextApiResponse } from "next";

const getFaction = `https://api.torn.com/faction/?selections=basic&key=${process.env.NEXT_PUBLIC_TORN_API_KEY}`;
const getMemberStats = `https://api.torn.com/user/:ID?selections=personalstats&key=${process.env.NEXT_PUBLIC_TORN_API_KEY}`;

interface MemberInformation {
  member_id: string;
  name: string;
  position: string;
  days_in_faction: number;
  last_action: {
    status: string;
    timestamp: number;
    relative: string;
  };
  status: {
    description: string;
    details: string;
    state: string;
    color: string;
    until: number;
  };
  personalstats: Record<string, unknown>;
}

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
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate=59");

  return new Promise<void>(async (resolve) => {
    switch (req.method) {
      case "GET": {
        try {
          const faction = await fetch(getFaction);
          const { members } = await faction.json();

          const memberIds = Object.keys(members);
          const memberInfo = await Promise.all(
            memberIds.map(async (memberId) => {
              const member = await fetch(
                getMemberStats.replace(":ID", memberId)
              );
              let { personalstats } = await member.json();

              if (req.query) {
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
