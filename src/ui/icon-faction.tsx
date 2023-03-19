export default function FactionIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 12 16"
      fill={color}
    >
      <path
        id="faction"
        d="M2.8 2.8 4.5 0 6 .6 4.9 3.7l-2.1-.9Zm4 1.9-.9-.9.8-3 1.8.8-1.7 3.1Zm2.4 1.1H8l1-3.6 1.7.8-1.5 2.8ZM10.4 7l-.7-.3L11.4 4l.6 1.6L10.4 7ZM3 16v-5L0 7.1l2.2-3.3 4.6 2-1.2 1.1-3.2-.1v.7l3.8 2.3.6 2.7L8 9.2 5.6 8.1h1.2V7l2.3 1.1 1.7-.1s-.3 1.1-1.8 3v5H3Z"
      />
    </svg>
  );
}
