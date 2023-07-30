import Image from "next/image";
import type { ImageProps } from "next/image";
import { PreviewError } from "@/components/preview/preview-error";
import { PreviewLoader } from "@/components/preview/preview-loader";
import React from "react";

type PreviewImageProps = ImageProps & {
  debug?: string;
};

function PreviewImage({ src, ...props }: PreviewImageProps): JSX.Element {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  function handleOnError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    e.preventDefault();

    console.error("Error loading image", src);
    setLoading(false);
    setError(true);
  }

  return (
    <div
      className="relative"
      style={{ maxWidth: props.width, height: props.height }}
    >
      {loading === true && (
        <PreviewLoader
          style={{
            position: "absolute",
            inset: 0,
            zIndex: props.debug === "true" ? 99 : "auto",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        />
      )}
      {!loading && error ? (
        <PreviewError
          style={{
            position: "absolute",
            inset: 0,
            zIndex: props.debug === "true" ? 99 : "auto",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        />
      ) : (
        <Image
          {...props}
          src={src}
          alt={props.alt || "Image preview"}
          onLoadingComplete={() => !props.debug && setLoading(false)}
          onError={(e) => handleOnError(e)}
        />
      )}
    </div>
  );
}

export { PreviewImage };
