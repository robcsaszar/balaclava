import { personalStatistics } from "@/lib/personal-stats";
import { useState } from "react";

const personalStatArray = Object.keys(personalStatistics);
export default function StatsCombobox(props: {
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
            No stats selected
          </div>
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
