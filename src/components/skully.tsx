import Image from "next/image";
import SkullyImage from "@/assets/images/skully.gif";

export default function Skully({ width = 100, height = 100 }) {
  return (
    <div className="skully">
      <Image
        src={SkullyImage}
        alt="Skully"
        width={width}
        height={height}
        draggable={false}
        className="select-none"
      />
    </div>
  );
}
