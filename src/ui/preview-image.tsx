import Image from "next/image";
import type { ImageProps } from "next/image";
import React from "react";
import { SkeletonLoader } from "@/components/skeleton-loader";

type PreviewImageProps = ImageProps & {
  fallback: string;
  debug?: string;
};

function PreviewImage({ src, ...props }: PreviewImageProps): JSX.Element {
  const [loading, setLoading] = React.useState(true);
  const [onErrorSrc, setOnErrorSrc] = React.useState<string | undefined>(
    undefined
  );

  function handleOnError(
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void {
    console.log("handle on error");
    if (e?.currentTarget?.src !== props.fallback) {
      setOnErrorSrc(props.fallback);
    }
  }

  return (
    <div style={{ position: "relative", maxWidth: props.width }}>
      {loading === true && (
        <SkeletonLoader
          style={{
            position: "absolute",
            inset: 0,
            zIndex: props.debug === "true" ? 99 : "auto",
            borderRadius: "8px",
            overflow: "hidden",
          }}
          height={props.height}
          width={props.width}
        />
      )}
      <Image
        {...props}
        src={onErrorSrc || src}
        alt={props.alt || "Image preview"}
        onLoadingComplete={() => !props.debug && setLoading(false)}
        onError={(e) => handleOnError(e)}
      />
    </div>
  );
}

export { PreviewImage };
