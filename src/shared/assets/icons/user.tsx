import { SVGProps } from "react";

export const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="17"
    viewBox="0 0 20 17"
    fill="none"
    {...props}
  >
    <path
      stroke="var(--start-color, #fff)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19 16.25c0-2.09-1.67-5.068-4-5.727m-2 5.727c0-2.651-2.686-6-6-6s-6 3.349-6 6M7 6.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM13 6.75a3 3 0 0 0 0-6"
    />
  </svg>
);
