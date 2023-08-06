import { Checkbox } from "@/components/ui/checkbox"
import IconClear from "./icons/icon-clear";
import InputField from "@/components/input-field";
import { InputFieldSizes } from "@/lib/constants";
import ListCheckIcon from "./icons/icon-list-check";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { debounce } from "lodash";
import { labeledStats } from "@/lib/personal-stats";
import { useState } from "react";

const MAX_STATS = 4;
const PERSONAL_STAT_KEYS = Object.keys(labeledStats);

export default function StatsCombobox(props: {
  stats: string[];
  onChange: (stats: string[]) => void;
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(props.stats);

  // TODO: Allow for search input to accept multiple values, separated by commas
  
  const debouncedSearch = debounce(newValue => setSearch(newValue), 300);
  const handleSearchChange = (newValue: string) => {
    debouncedSearch(newValue)
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // Get the first stat that matches the search, excluding already selected stats
      const foundStat = PERSONAL_STAT_KEYS.find(
        (stat) =>
          stat.toLowerCase().includes(search.toLowerCase()) &&
          !selected.includes(stat)
      );

      if (foundStat) {
        setSelected([...selected, foundStat]);
        props.onChange([...selected, foundStat]);
      }
    }
  };

  const handleCheckedChange = (checked: boolean, value: string) => {
    const newSelected = [...selected];
    if (checked) {
      newSelected.push(value);
    } else {
      const index = newSelected.indexOf(value);
      if (index > -1) {
        newSelected.splice(index, 1);
      }
    }
    setSelected(newSelected);
    props.onChange(newSelected);
  }

  // If the selected stats are changed, clear the search
  if (props.stats !== selected) {
    setSearch("");
    setSelected(props.stats);
  }

  return (
    <div className="flex flex-col gap-2">
      <InputField
        label="Featured"
        type="search"
        id="search"
        inputSize={InputFieldSizes.FULL}
        onValueChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="e.g. attackhits, awards, etc."
      />
      <div className="flex items-center gap-2 text-sm text-eminence-200 h-5 opacity-50">
        <ListCheckIcon className="h-4 w-4" />
        <p>
            {selected.length === 0 && `Select up to 4 stats to feature`}
            {selected.length > 0 && selected.length < MAX_STATS && (<>Selected <span className="font-bold">{selected.length}</span> of <span className="font-bold">{PERSONAL_STAT_KEYS.length}</span></>)}
            {selected.length === MAX_STATS && (<>Selected <span className="font-bold">{selected.length}</span> of <span className="font-bold">{PERSONAL_STAT_KEYS.length}</span> (max)</>)}
        </p>
        {selected.length > 0 && (
          <>
            <Separator orientation="vertical" />
            <button
              type="button"
              onClick={() => {
                setSelected([]);
                props.onChange([]);
              }}
              className="flex items-center gap-1 hover:text-red-500 transition-colors duration-150"
            >
              <IconClear className="h-4 w-4" />
              <span>Clear</span>
            </button>
          </>
        )}
      </div>
      <ScrollArea className="relative flex h-52 flex-col gap-2 rounded-lg bg-eminence-950/75 backdrop-blur-sm ring-2 ring-eminence-800">
        {PERSONAL_STAT_KEYS
          .sort((a, b) => a.localeCompare(b))
          .filter((stat) => stat.toLowerCase().includes(search.toLowerCase()))
          .sort((a, b) => {
            if (selected.includes(a) && !selected.includes(b)) {
              return -1;
            }
            if (selected.includes(b) && !selected.includes(a)) {
              return 1;
            }
            return 0;
          })
          .map((stat) => (
            <div key={stat} className="flex items-center space-x-2 hover:bg-eminence-500/30 px-3 py-2 parent text-eminence-100">
              <Checkbox
                id={stat}
                onCheckedChange={(checked: boolean) => handleCheckedChange(checked, stat)}
                checked={selected.includes(stat)}
                disabled={selected.length >= MAX_STATS && !selected.includes(stat)}
              />
              <label htmlFor={stat} className="leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-50 flex items-center justify-between grow parent-hover:text-eminence-200 peer-data-[state=checked]:text-eminence-100">
                <span className="">{labeledStats[stat]?.label}</span>
                <span className="text-sm font-mono text-eminence-300">{stat}</span>
              </label>
            </div>
          ))}
      </ScrollArea>
    </div>
  );
}
