import ClipBoardCheckIcon from "@/ui/icons/clipboard-check";
import ClipBoardCopyIcon from "@/ui/icons/clipboard-copy";
import { useState } from "react";

type Props = {
  outputRef: React.RefObject<HTMLOutputElement>;
};

export default function CopyToClipboardButton({ outputRef }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (outputRef.current) {
      navigator.clipboard.writeText(outputRef.current.textContent || "");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`transition-colors ${copied ? "text-emerald-500" : ""}`}
    >
      {copied ? <ClipBoardCheckIcon /> : <ClipBoardCopyIcon />}
      <span className="sr-only">Copy to clipboard</span>
    </button>
  );
}
