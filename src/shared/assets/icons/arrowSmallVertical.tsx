import { SVGProps } from "react";

export const ArrowSmallVerticalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={6}
    viewBox="0 0 15 8"
    fill="none"
    {...props}
  >
    <path
      stroke="var(--start-color, #000)"
      strokeLinecap="round"
      d="M14 1 8.07 5.106a1 1 0 0 1-1.14 0L1 1"
    />
  </svg>
);
