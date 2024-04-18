import { SVGProps } from "react";
export const Spline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={1024}
    height={282}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeWidth={3}
      d="M1022 0C1022 191.729 1.5 23.981 1.5 281.5"
    />
  </svg>
);
