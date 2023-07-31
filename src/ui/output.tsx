import { useRef, useState } from "react";

import CopyToClipboardButton from "@/components/buttons/copy-to-clipboard";
import HowToUse from "./how-to-use";
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
    <div className={pinned ? "fixed bottom-4 left-4 right-4" : "w-full"}>
      <div className="relative flex select-none flex-col gap-4 rounded-2xl rounded-tl-md bg-eminence-500/20 p-3 text-eminence-100 ring-2 ring-eminence-500/50 backdrop-blur-sm">
        <div className="flex items-start gap-2">
          <div className="w-16 min-w-max">
            <Skully width={56} height={56} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="flex items-end gap-2 font-bold text-eminence-200">
              Hey, here&apos;s your URL:
            </span>
            <output
              className="select-all break-all rounded-lg bg-eminence-950/60 px-4 py-3 font-mono text-sm hover:cursor-copy"
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
        <div className="absolute right-3 flex gap-3 text-eminence-500 transition-colors ">
          <CopyToClipboardButton outputRef={outputRef} />
          <PreviewButton preview={preview} onClick={handlePreview} />
          <VisitUrlButton url={props.url} />
        </div>
      </div>
      <HowToUse />
    </div>
  );
}
