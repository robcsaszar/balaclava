// A page with a form to create a URL for the API at api/faction/[id].tsx

import { useRef, useState } from "react";

import Image from "next/image";
import Skully from "@/components/skully";
import { factions } from "@/lib/factions";
import { personalStatistics } from "@/lib/personal-stats";

function checkFactionId(id: string) {
  const faction = factions.getAll.find((f) => f === id);
  if (faction) {
    return true;
  }
  return false;
}

export default function Faction() {
  const [factionId, setFactionId] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [userId, setUserId] = useState("");
  const [stats, setStats] = useState<string[]>([]);
  const [align, setAlign] = useState("center");
  const [rounded, setRounded] = useState(false);
  const outputRef = useRef<HTMLOutputElement>(null);
  const [copy, setCopy] = useState(false);
  const [preview, setPreview] = useState(false);
  const [output, setOutput] = useState(false);
  const [pinned, setPinned] = useState(false);

  if (!personalStatistics) {
    return <div>Loading stats...</div>;
  }

  const handleFactionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFactionId(e.target.value);
    setAllowed(checkFactionId(e.target.value));
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
    setOutput(true);
  };

  const handleStatsChange = (stats: string[]) => {
    setStats(stats);
  };

  const handleAlignChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlign(e.target.value);
  };

  const handleRoundedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRounded(e.target.checked);
  };

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (outputRef.current) {
      setCopy(true);
      navigator.clipboard.writeText(outputRef.current.textContent || "");
    }
  };

  const buildUrl = () => {
    let url = `https://balaclava.app/api/faction/${factionId}?user=${userId}`;
    if (stats.length > 0) {
      url += `&stats=${stats}`;
    }

    if (align !== "center") {
      url += `&align=${align}`;
    }

    if (rounded) {
      url += `&rounded=${rounded}`;
    }

    return url;
  };

  const goToUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const url = buildUrl();
    window.open(url, "_blank");
  };

  const handlePreview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPreview(!preview);
  };

  const handlePin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPinned(!pinned);
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center bg-eminence-800 p-4 text-eminence-50">
      <main className="flex w-full flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-extrabold tracking-tighter">Balaclava</h1>
        <p className="text-md opacity-70">Customize your live faction banner</p>
        <form className="mt-12 flex w-full max-w-xl flex-col items-center justify-center gap-4">
          <div className="w-full">
            <label
              htmlFor="factionId"
              className="flex flex-col gap-1 text-sm font-bold uppercase tracking-widest transition-colors focus-within:text-eminence-300 "
            >
              Faction ID
              <input
                required
                type="number"
                name="factionId"
                id="factionId"
                value={factionId}
                onChange={handleFactionIdChange}
                className={`block w-32 rounded-lg border border-eminence-700 bg-eminence-900 p-2.5 text-sm text-eminence-50 transition-colors focus:border-eminence-500 focus:ring-eminence-500 focus:placeholder:opacity-25 focus:placeholder:transition-opacity ${
                  allowed
                    ? "focus:border-emerald-500 focus:ring-emerald-500"
                    : ""
                }`}
                min="1"
                placeholder="e.g. 33007"
              />
            </label>
          </div>
          <div className="w-full">
            <label
              htmlFor="userId"
              className="flex flex-col gap-1 text-sm font-bold uppercase tracking-widest transition-colors focus-within:text-eminence-300 "
            >
              User ID
              <input
                required
                type="number"
                name="userId"
                id="userId"
                value={userId}
                onChange={handleUserIdChange}
                className="block w-48 rounded-lg border border-eminence-700 bg-eminence-900 p-2.5 text-sm text-eminence-50 transition-colors focus:border-eminence-500 focus:ring-eminence-500 focus:placeholder:opacity-25 focus:placeholder:transition-opacity"
                min="1"
                placeholder="e.g. 906148"
              />
            </label>
          </div>
          <div className="flex w-full flex-col gap-1">
            <StatsCombobox stats={stats} onChange={handleStatsChange} />
          </div>
          <div className="flex w-full flex-col">
            <fieldset className="flex items-start gap-2">
              <legend className="mb-1 flex flex-col text-sm font-bold uppercase tracking-widest">
                Alignment
              </legend>
              <div className="flex flex-col items-center gap-2">
                <input
                  type="radio"
                  id="center"
                  name="align"
                  value="center"
                  className="peer hidden"
                  checked={align === "center"}
                  onChange={handleAlignChange}
                  required
                />
                <label
                  htmlFor="center"
                  className="flex cursor-pointer items-center justify-between gap-1 rounded-lg bg-eminence-900 px-3 py-2 text-eminence-100/50 ring-1 ring-eminence-600 hover:bg-eminence-700 hover:text-eminence-200 peer-checked:bg-eminence-900 peer-checked:text-persian-400 peer-checked:ring-persian-400/20"
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-align-box-center-middle-filled"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M19 2a3 3 0 0 1 2.995 2.824l.005 .176v14a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.993 -2.802l-.007 -.198v-14a3 3 0 0 1 2.824 -2.995l.176 -.005h14zm-6 12h-2l-.117 .007a1 1 0 0 0 0 1.986l.117 .007h2l.117 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm2 -3h-6l-.117 .007a1 1 0 0 0 0 1.986l.117 .007h6l.117 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-1 -3h-4l-.117 .007a1 1 0 0 0 0 1.986l.117 .007h4l.117 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"
                        strokeWidth={0}
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <span className="">Center</span>
                </label>
              </div>
              <div className="flex flex-col items-center gap-4">
                <input
                  type="radio"
                  id="start"
                  name="align"
                  value="start"
                  className="peer hidden"
                  checked={align === "start"}
                  onChange={handleAlignChange}
                  required
                />
                <label
                  htmlFor="start"
                  className="flex cursor-pointer items-center justify-between gap-1 rounded-lg bg-eminence-900 px-3 py-2 text-eminence-100/50 ring-1 ring-eminence-600 hover:bg-eminence-700 hover:text-eminence-200 peer-checked:bg-eminence-900 peer-checked:text-persian-400 peer-checked:ring-persian-400/20"
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-align-box-top-center-filled"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-6.333 3a1 1 0 0 0 -1 1v6l.007 .117a1 1 0 0 0 1.993 -.117v-6l-.007 -.117a1 1 0 0 0 -.993 -.883zm3 0a1 1 0 0 0 -1 1v4l.007 .117a1 1 0 0 0 1.993 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883zm-6 0a1 1 0 0 0 -1 1v2l.007 .117a1 1 0 0 0 1.993 -.117v-2l-.007 -.117a1 1 0 0 0 -.993 -.883z"
                        strokeWidth={0}
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <span className="">Top</span>
                </label>
              </div>
              <div className="flex flex-col items-center gap-4">
                <input
                  type="radio"
                  id="end"
                  name="align"
                  value="end"
                  className="peer hidden"
                  checked={align === "end"}
                  onChange={handleAlignChange}
                  required
                />
                <label
                  htmlFor="end"
                  className="flex cursor-pointer items-center justify-between gap-1 rounded-lg bg-eminence-900 px-3 py-2 text-eminence-100/50 ring-1 ring-eminence-600 hover:bg-eminence-700 hover:text-eminence-200 peer-checked:bg-eminence-900 peer-checked:text-persian-400 peer-checked:ring-persian-400/20"
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-align-box-bottom-center-filled"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-9.333 13a1 1 0 0 0 -1 1v2l.007 .117a1 1 0 0 0 1.993 -.117v-2l-.007 -.117a1 1 0 0 0 -.993 -.883zm3 -4a1 1 0 0 0 -1 1v6l.007 .117a1 1 0 0 0 1.993 -.117v-6l-.007 -.117a1 1 0 0 0 -.993 -.883zm3 2a1 1 0 0 0 -1 1v4l.007 .117a1 1 0 0 0 1.993 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z"
                        strokeWidth={0}
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <span className="">Bottom</span>
                </label>
              </div>
            </fieldset>
          </div>
          <div className="flex w-full flex-col items-start">
            <label className="relative flex cursor-pointer items-center gap-4">
              <span className="flex select-none flex-col gap-1 text-sm font-bold uppercase tracking-widest transition-colors">
                Rounded
              </span>
              <input
                type="checkbox"
                value=""
                name="rounded"
                id="rounded"
                className="peer sr-only"
                checked={rounded}
                onChange={handleRoundedChange}
              />
              <div className="peer h-6 w-11 rounded-full border border-eminence-300/30 bg-eminence-900 after:absolute after:top-0.5 after:right-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-persian-600 peer-checked:after:-translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-eminence-300/20"></div>
            </label>
          </div>
          {output && (
            <div
              className={
                pinned
                  ? "fixed bottom-4 left-4 right-4 backdrop-blur-lg"
                  : "w-full"
              }
            >
              <div className="relative flex flex-col gap-4 rounded-xl bg-eminence-400/20 px-4 py-3 text-eminence-100 ring-1 ring-eminence-300/50">
                <div className="flex gap-2">
                  <Skully width={33} height={33} />
                  <div className="flex flex-col gap-2">
                    <span className="flex items-end gap-2 font-bold text-eminence-300">
                      Here&apos;s your URL:
                    </span>
                    <output
                      className="break-all font-mono text-sm leading-none "
                      ref={outputRef}
                    >
                      {buildUrl()}
                    </output>
                  </div>
                </div>
                {preview && (
                  <div className="relative">
                    <Image
                      src={buildUrl()}
                      alt="Dynamic image preview of faction banner"
                      width={600}
                      height={100}
                      onError={() => setPreview(false)}
                    />
                  </div>
                )}
                <div className="absolute right-3 flex gap-4 text-eminence-400/50 transition-colors ">
                  {/* <button onClick={handlePin}>
                    {pinned ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-colors hover:text-eminence-300"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path
                          d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z"
                          strokeWidth={0}
                          fill="currentColor"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-colors hover:text-eminence-300"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4"></path>
                        <path d="M9 15l-4.5 4.5"></path>
                        <path d="M14.5 4l5.5 5.5"></path>
                      </svg>
                    )}
                    <span className="sr-only">Copy to clipboard</span>
                  </button> */}
                  <button onClick={handlePreview}>
                    {preview ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-colors hover:text-eminence-300"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path
                          d="M12 4c4.29 0 7.863 2.429 10.665 7.154l.22 .379l.045 .1l.03 .083l.014 .055l.014 .082l.011 .1v.11l-.014 .111a.992 .992 0 0 1 -.026 .11l-.039 .108l-.036 .075l-.016 .03c-2.764 4.836 -6.3 7.38 -10.555 7.499l-.313 .004c-4.396 0 -8.037 -2.549 -10.868 -7.504a1 1 0 0 1 0 -.992c2.831 -4.955 6.472 -7.504 10.868 -7.504zm0 5a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z"
                          strokeWidth={0}
                          fill="currentColor"
                        ></path>
                      </svg>
                    ) : (
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-colors hover:text-eminence-300"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                          <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                        </svg>
                      </div>
                    )}
                    <span className="sr-only">Copy to clipboard</span>
                  </button>
                  <button onClick={goToUrl}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="-rotate-45 transition-all hover:rotate-0 hover:text-eminence-300"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l14 0"></path>
                      <path d="M13 18l6 -6"></path>
                      <path d="M13 6l6 6"></path>
                    </svg>
                    <span className="sr-only">Go to Url</span>
                  </button>
                  <button onClick={handleCopy}>
                    {copy ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-emerald-500"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M5 12l5 5l10 -10"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-colors hover:text-eminence-300"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
                        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
                      </svg>
                    )}
                    <span className="sr-only">Copy to clipboard</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </main>
      <div className="absolute inset-0 top-1/2 -z-10 bg-gradient-to-t from-eminence-800 to-eminence-700"></div>
    </div>
  );
}

const personalStatArray = Object.keys(personalStatistics);

// A combobox with search functionality, allows up to 4 stats to be selected, which are then passed to the onChange function
function StatsCombobox(props: {
  stats: string[];
  onChange: (stats: string[]) => void;
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(props.stats);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // Get the first stat that matches the search
      const stat = personalStatArray.find((stat) =>
        stat.toLowerCase().includes(search.toLowerCase())
      );
      if (stat) {
        // If the stat is already selected, remove it
        if (selected.includes(stat)) {
          const newSelected = selected.filter((s) => s !== stat);
          setSelected(newSelected);
          props.onChange(newSelected);
        } else {
          // If the stat is not already selected, add it
          const newSelected = [...selected, stat];
          setSelected(newSelected);
          props.onChange(newSelected);
        }
      }
      setSearch("");
    }

    if (e.key === "Backspace" && search === "") {
      e.preventDefault();

      // Remove the last stat
      const newSelected = [...selected];
      newSelected.pop();
      setSelected(newSelected);
      props.onChange(newSelected);
    }

    if (e.key === "Escape") {
      setSearch("");
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelected = [...selected];
    const index = newSelected.indexOf(e.target.value);
    if (index > -1) {
      newSelected.splice(index, 1);
    } else {
      newSelected.push(e.target.value);
    }
    setSelected(newSelected);
    props.onChange(newSelected);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="userId"
        className="relative flex flex-col gap-1 text-sm font-bold uppercase tracking-widest transition-colors focus-within:text-eminence-300"
      >
        <span>Featured</span>
        <input
          type="text"
          name="search"
          id="search"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="block w-full rounded-lg border border-eminence-700 bg-eminence-900 p-2.5 text-sm text-eminence-50 transition-colors focus:border-eminence-500 focus:ring-eminence-500 focus:placeholder:opacity-25 focus:placeholder:transition-opacity"
          placeholder="Search for a stat"
        />
      </label>
      <div className="flex gap-2 font-mono text-sm font-extrabold text-eminence-100 text-opacity-50">
        <span>
          Selected {selected.length} of {personalStatArray.length}
        </span>
        {selected.length > 0 && (
          <>
            <span className="opacity-20">|</span>
            <button
              type="button"
              onClick={() => {
                setSelected([]);
                props.onChange([]);
              }}
              className="flex items-center gap-1 text-persian-600 hover:text-persian-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={12}
                height={12}
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                <path d="M9 12l6 0"></path>
              </svg>
              <span>Clear</span>
            </button>
          </>
        )}
      </div>
      <div className="select-none overflow-hidden truncate rounded-lg text-center font-mono text-xs text-eminence-200/40">
        {selected.length > 0 ? (
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-link"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5"></path>
              <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5"></path>
            </svg>
            {selected.join()}
          </div>
        ) : (
          "No stats selected"
        )}
      </div>
      <div className="relative flex h-32 flex-col gap-1 overflow-auto rounded-lg bg-eminence-900/50 px-3 py-2">
        {personalStatArray
          .filter((stat) => stat.toLowerCase().includes(search.toLowerCase()))
          .map((stat) => (
            <label
              key={stat}
              htmlFor={stat}
              className="group flex cursor-pointer items-center gap-2 text-eminence-200/70 transition-all checked:text-persian-600 hover:text-persian-200"
            >
              <input
                type="checkbox"
                name={stat}
                id={stat}
                value={stat}
                checked={selected.includes(stat)}
                onChange={handleSelectChange}
                disabled={selected.length >= 4 && !selected.includes(stat)}
                className="peer cursor-pointer rounded-full border-none bg-persian-300/10 text-persian-600 transition-colors focus:ring-0 focus:ring-offset-0 disabled:opacity-50 group-hover:bg-persian-300/20 group-hover:checked:bg-persian-600"
              />
              <span className="peer-checked:text-persian-400 peer-disabled:opacity-50">
                {personalStatistics[stat]?.label}
              </span>
            </label>
          ))}
      </div>
      <div
        className={`flex items-center gap-1 font-mono text-sm transition-colors duration-300 ${
          selected.length === 4
            ? "text-red-500"
            : selected.length > 2
            ? "text-amber-500"
            : "text-eminence-200/30"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
          <path d="M12 9h.01"></path>
          <path d="M11 12h1v4h1"></path>
        </svg>
        You may only select up to four stats
      </div>
    </div>
  );
}
