import { SVGProps } from "react";
export const ArrowLongHorizontalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      stroke="current"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.5 9h15m0 0-7.083 7.5M16.5 9 9.417 1.5"
    />
    <defs>
      <linearGradient
        id="a"
        x1={9}
        x2={16.654}
        y1={1.192}
        y2={8.885}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4772E6" />
        <stop offset={1} stopColor="#8E54E9" />
      </linearGradient>
    </defs>
  </svg>
);
