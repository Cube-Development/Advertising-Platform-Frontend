import { SVGProps } from "react";
export const CopyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={22}
    fill="none"
    stroke="#A3A0A0"
    {...props}
  >
    <path
      stroke="current"
      strokeWidth={1.5}
      d="M4 10c0-2.828 0-4.243.879-5.121C5.757 4 7.172 4 10 4h3c2.828 0 4.243 0 5.121.879C19 5.757 19 7.172 19 10v5c0 2.828 0 4.243-.879 5.121C17.243 21 15.828 21 13 21h-3c-2.828 0-4.243 0-5.121-.879C4 19.243 4 17.828 4 15v-5Z"
    />
    <path
      stroke="current"
      strokeWidth={1.5}
      d="M4 18a3 3 0 0 1-3-3V9c0-3.771 0-5.657 1.172-6.828C3.343 1 5.229 1 9 1h4a3 3 0 0 1 3 3"
      opacity={0.5}
    />
  </svg>
);
