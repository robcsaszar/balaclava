// A page with a form to create a URL for the API at api/faction/[id].tsx

import { useState } from "react";

// It takes the faction id, user id, an array of stats (up to four), a desired alignment (center, start, end), and a boolean for rounding
export default function Faction() {
  const [factionId, setFactionId] = useState("");
  const [userId, setUserId] = useState("");
  const [stats, setStats] = useState<string[]>([]);
  const [align, setAlign] = useState("center");
  const [rounded, setRounded] = useState(false);

  const handleFactionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFactionId(e.target.value);
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const statsArray = value.split(",");
    setStats(statsArray);
  };

  const handleAlignChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlign(e.target.value);
  };

  const handleRoundedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRounded(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `https://balaclava.vercel.app/api/faction/${factionId}?user=${userId}&stats=${stats}&align=${align}&rounded=${rounded}`;
    console.log(url);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">TORN Playground</h1>
        <p className="mt-3 text-2xl">Create a faction card</p>
        <form
          className="mt-12 flex flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit}
        >
          <label htmlFor="factionId">Faction ID</label>
          <input
            type="text"
            name="factionId"
            id="factionId"
            value={factionId}
            onChange={handleFactionIdChange}
          />
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            name="userId"
            id="userId"
            value={userId}
            onChange={handleUserIdChange}
          />
          <label htmlFor="stats">Stats</label>
          <input
            type="text"
            name="stats"
            id="stats"
            value={stats}
            onChange={handleStatsChange}
          />
          <label htmlFor="align">Alignment</label>
          <input
            type="radio"
            name="align"
            id="align"
            value="center"
            checked={align === "center"}
            onChange={handleAlignChange}
          />
          <input
            type="radio"
            name="align"
            id="align"
            value="start"
            checked={align === "start"}
            onChange={handleAlignChange}
          />
          <input
            type="radio"
            name="align"
            id="align"
            value="end"
            checked={align === "end"}
            onChange={handleAlignChange}
          />
          <label htmlFor="rounded">Rounded</label>
          <input
            type="checkbox"
            name="rounded"
            id="rounded"
            checked={rounded}
            onChange={handleRoundedChange}
          />
          <button type="submit">Generate</button>
        </form>
      </main>
    </div>
  );
}
