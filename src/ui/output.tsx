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

  const handlePreview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPreview(!preview);
  };

  return (
    <>
      <div className="relative w-fit flex select-none flex-col gap-2 rounded-xl bg-eminence-500/20 p-3 text-eminence-100 ring-2 ring-eminence-500/50 backdrop-blur-sm">
        <div className="flex gap-2 items-end">
            <Skully width={56} height={56} />
            <span className="font-bold">Hey, here&apos;s your URL:</span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <div className="flex items-center gap-2">
            <CopyToClipboardButton outputRef={outputRef} />
            <PreviewButton preview={preview} onClick={handlePreview} />
            <VisitUrlButton url={props.url} />
          </div>
          <output className="select-all break-all rounded-lg bg-eminence-950/60 px-4 py-3 font-mono text-sm hover:cursor-copy" ref={outputRef}>
            {props.url}
          </output>
          {preview && (
            <div className="flex self-center">
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
        </div>
        <HowToUse />
      </div>
    </>
  );
}
