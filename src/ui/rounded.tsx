import { useState } from "react";

export default function Rounded(props: {
  rounded: boolean;
  onChange: (rounded: boolean) => void;
}) {
  const [rounded, setRounded] = useState(props.rounded);

  const handleRoundedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRounded(e.target.checked);
    props.onChange(e.target.checked);
  };

  return (
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
  );
}
