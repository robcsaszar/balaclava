import type { ImageProps } from "next/image";
import React from "react";
import balaclava from "app.config.mjs";

type PreviewErrorProps = Pick<ImageProps, "width" | "height"> & {
  style?: React.CSSProperties;
};

export const PreviewError = ({ style }: PreviewErrorProps) => (
  <div
    style={{
      ...style,
    }}
  >
    <div className="relative isolate h-full w-full">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
        <span className="text-md font-bold text-rose-500">
          Whoops! Something went wrong.
        </span>
        <span className="text-xs text-rose-300">
          Please check the user ID and try again. If the problem persists,
          please contact{" "}
          <a
            href={balaclava.contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer font-bold text-rose-500 underline decoration-dotted hover:text-rose-500"
          >
            {balaclava.contactPerson}
          </a>
          .
        </span>
      </div>
      <div className="absolute inset-0 z-0 bg-rose-700/20"></div>
    </div>
  </div>
);
