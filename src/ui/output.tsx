import { useRef, useState } from "react";

import { PreviewImage } from "@/ui/preview-image";
import Skully from "@/components/skully";

export default function Output(props: { url: string }) {
  const outputRef = useRef<HTMLOutputElement>(null);
  const [copy, setCopy] = useState(false);
  const [preview, setPreview] = useState(false);
  const [pinned, setPinned] = useState(false);

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (outputRef.current) {
      setCopy(true);
      navigator.clipboard.writeText(outputRef.current.textContent || "");
    }
  };

  const goToUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open(props.url, "_blank");
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
    <>
      <div
        className={
          pinned ? "fixed bottom-4 left-4 right-4 backdrop-blur-lg" : "w-full"
        }
      >
        <div className="relative flex flex-col gap-4 rounded-2xl rounded-tl-md bg-eminence-400/20 p-3 text-eminence-100 ring-1 ring-eminence-300/50">
          <div className="flex items-start gap-2">
            <div className="w-16 min-w-max">
              <Skully width={56} height={56} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="flex items-end gap-2 font-bold text-eminence-300">
                Hey, here&apos;s your URL
              </span>
              <output
                className="break-all rounded-lg bg-eminence-800 py-3 px-4 font-mono text-sm leading-none "
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
                fallback={`https://balaclava.app/33007.png`}
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
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
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
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
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
                  stroke-width={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
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
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4"></path>
                  <path d="M3 15l2.5 -3.8"></path>
                  <path d="M21 14.976l-2.492 -3.776"></path>
                  <path d="M9 17l.5 -4"></path>
                  <path d="M15 17l-.5 -4"></path>
                </svg>
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
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
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
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
                  <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
                </svg>
              )}
              <span className="sr-only">Copy to clipboard</span>
            </button>
          </div>
        </div>
        <details className="text-sm">
          <summary className="flex cursor-pointer items-center gap-1 py-1 font-semibold text-eminence-300 hover:text-eminence-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              stroke-width={2}
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
          <div className="rounded-lg bg-eminence-900 py-2 px-3 text-eminence-100">
            <ul className="list-disc space-y-3 pl-5 marker:text-eminence-300">
              <li>
                Copy the URL and add it to your TORN profile, forum signature,
                or anywhere else you want to show off your live banner.
              </li>
              <div className="inline-flex w-full items-center justify-center">
                <hr className="my-2 h-px w-72 border-0 bg-eminence-400/50" />
                <span className="absolute left-1/2 -translate-x-1/2 select-none bg-eminence-900 px-3 font-medium text-eminence-200">
                  or
                </span>
              </div>
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
                    to toggle the banner preview, then save the image directly
                    to your system for a static banner.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </details>
      </div>
    </>
  );
}
