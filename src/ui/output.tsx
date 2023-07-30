import { useRef, useState } from "react";

import CopyToClipboardButton from "@/components/buttons/copy-to-clipboard";
import PreviewButton from "@/components/buttons/preview";
import { PreviewImage } from "@/ui/preview-image";
import Skully from "@/components/skully";
import VisitUrlButton from "@/components/buttons/visit-url";

export default function Output(props: { url: string }) {
  const outputRef = useRef<HTMLOutputElement>(null);
  const [preview, setPreview] = useState(false);
  const [pinned, setPinned] = useState(false);

  const handlePreview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPreview(!preview);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPinned(!pinned);
  };

  return (
    <div
      className={
        pinned ? "fixed bottom-4 left-4 right-4 backdrop-blur-lg" : "w-full"
      }
    >
      <div className="relative flex flex-col gap-4 rounded-2xl rounded-tl-md bg-eminence-500/20 p-3 text-eminence-100 ring-2 ring-eminence-500/50">
        <div className="flex items-start gap-2">
          <div className="w-16 min-w-max">
            <Skully width={56} height={56} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="flex items-end gap-2 font-bold text-eminence-200">
              Hey, here&apos;s your URL:
            </span>
            <output
              className="select-all break-all rounded-lg bg-eminence-950/60 px-4 py-3 font-mono text-sm leading-none hover:cursor-copy"
              ref={outputRef}
            >
              {props.url}
            </output>
          </div>
        </div>
        {preview && (
          <div className="relative isolate">
            <PreviewImage
              src={props.url}
              alt="Dynamic image preview of faction banner"
              width={600}
              height={100}
              onError={() => setPreview(false)}
              // debug="true"
            />
          </div>
        )}
        <div className="absolute right-3 flex gap-3 text-eminence-600 transition-colors ">
          <CopyToClipboardButton outputRef={outputRef} />
          <PreviewButton preview={preview} onClick={handlePreview} />
          <VisitUrlButton url={props.url} />
        </div>
      </div>
      <details className="text-sm">
        <summary className="flex cursor-pointer items-center gap-1 py-1 font-semibold text-eminence-300 hover:text-eminence-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
            <path d="M12 17l0 .01"></path>
            <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4"></path>
          </svg>
          <span>How to use</span>
        </summary>
        <div className="rounded-lg bg-eminence-900 px-3 py-2 text-eminence-100">
          <ul className="list-disc space-y-3 pl-5 marker:text-eminence-300">
            <li>
              Copy the URL and add it to your TORN profile, forum signature, or
              anywhere else you want to show off your live banner.
            </li>
            <li className="inline-flex w-full items-center justify-center">
              <hr className="my-2 h-px w-72 border-0 bg-eminence-400/50" />
              <span className="absolute left-1/2 -translate-x-1/2 select-none bg-eminence-900 px-3 font-medium text-eminence-200">
                or
              </span>
            </li>
            <li>
              <div className="">
                <span>Click on the </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-flex text-eminence-400"
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
                  <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4"></path>
                  <path d="M3 15l2.5 -3.8"></path>
                  <path d="M21 14.976l-2.492 -3.776"></path>
                  <path d="M9 17l.5 -4"></path>
                  <path d="M15 17l-.5 -4"></path>
                </svg>
                <span>
                  {" "}
                  to toggle the banner preview, then save the image directly to
                  your system for a static banner.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </details>
    </div>
  );
}
