import { useState } from "react";

export default function Alignment(props: {
  align: string;
  onChange: (align: string) => void;
}) {
  const [align, setAlign] = useState(props.align);

  const handleAlignChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlign(e.target.value);
    props.onChange(e.target.value);
  };

  return (
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
  );
}
