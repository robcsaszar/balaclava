import HidePreviewIcon from "@/ui/icons/hide-preview";
import ShowPreviewIcon from "@/ui/icons/show-preview";
import { useState } from "react";

type Props = {
  preview: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function PreviewButton({ preview, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group transition-colors duration-200 ease-in-out"
    >
      {preview ? <HidePreviewIcon /> : <ShowPreviewIcon />}
      <span className="sr-only">Show preview</span>
    </button>
  );
}
