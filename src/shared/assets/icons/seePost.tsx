import { SVGProps } from "react";
export const SeePostIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <path
      fill="url(#a)"
      d="M17.25 0A3.75 3.75 0 0 1 21 3.75v9.1a8.547 8.547 0 0 0-1.5-.556V6h-18v11.25a2.25 2.25 0 0 0 2.25 2.25h5.328c.099.497.29 1.005.552 1.5H3.75A3.75 3.75 0 0 1 0 17.25V3.75A3.75 3.75 0 0 1 3.75 0h13.5Zm0 1.5H3.75A2.25 2.25 0 0 0 1.5 3.75v.75h18v-.75a2.25 2.25 0 0 0-2.25-2.25Zm0 12c-4.146 0-6.75 3.477-6.75 5.25 0 1.8 2.608 5.25 6.75 5.25 4.142 0 6.75-3.477 6.75-5.25 0-1.8-2.608-5.25-6.75-5.25Zm0 9a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5Zm2.25-3.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={-0.493}
        x2={11.816}
        y1={12}
        y2={-0.246}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4772E6" />
        <stop offset={1} stopColor="#8E54E9" />
      </linearGradient>
    </defs>
  </svg>
);
