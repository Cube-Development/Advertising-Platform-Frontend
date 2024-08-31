import { SVGProps } from "react";

export const KeyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={15}
    fill="none"
    viewBox="0 0 16 15"
    {...props}
  >
    <path
      fill="url(#a)"
      d="M6.844 6.92 13.764 0l1.248 1.247-1.247 1.247 2.181 2.182L14.7 5.924 12.517 3.74l-1.246 1.247 1.87 1.87-1.247 1.247-1.87-1.87L8.09 8.169a4.41 4.41 0 0 1-6.796 5.548 4.408 4.408 0 0 1 5.55-6.795Zm-.562 5.55a2.646 2.646 0 1 0-3.739-3.74 2.645 2.645 0 0 0 3.74 3.74Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={0}
        x2={16.009}
        y1={7.38}
        y2={7.391}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="var(--start-color, #000)" />
        <stop offset={1} stopColor="var(--end-color, #000)" />
      </linearGradient>
    </defs>
  </svg>
);
