import Image from "next/image";
import SkullyImage from "@/assets/images/skully.png";

export default function Skully({ width = 100, height = 100 }) {
  return (
    <div className="skully">
      <Image
        src={SkullyImage}
        alt="Skully"
        width={width}
        height={height}
        layout="fixed"
      />
    </div>
  );
}
