import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const timenow = new Date().toLocaleString();
  res.status(200).json({ name: `Hi cron! It is now ${timenow}` });
}
