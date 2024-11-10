import { SVGProps } from "react";

export const AdminSearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="var(--start-color, #000)"
      strokeOpacity={0.55}
      strokeWidth={1.5}
      d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z"
    />
    <path
      stroke="var(--end-color, gray)"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M18.5 18.5 22 22"
      opacity={0.5}
    />
  </svg>
);
