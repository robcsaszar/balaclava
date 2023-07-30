import ExternalLinkIcon from "@/ui/icons/external-link";

export default function VisitUrlButton({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group transition-colors duration-200 ease-in-out"
    >
      <ExternalLinkIcon />
    </a>
  );
}
