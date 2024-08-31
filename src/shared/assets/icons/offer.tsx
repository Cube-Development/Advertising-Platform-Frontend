import { SVGProps } from "react";

export const OfferIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <path
      stroke="var(--start-color, #000)"
      strokeWidth={1.5}
      d="M1 11c0-4.714 0-7.071 1.464-8.536C3.93 1 6.286 1 11 1c4.714 0 7.071 0 8.535 1.464C21 3.93 21 6.286 21 11c0 4.714 0 7.071-1.465 8.535C18.072 21 15.714 21 11 21s-7.071 0-8.536-1.465C1 18.072 1 15.714 1 11Z"
    />
    <path
      stroke="var(--start-color, #000)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5 14.8 6.143 16 9 13M5 7.8 6.143 9 9 6"
    />
    <path
      stroke="var(--start-color, #000)"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M12 8h5m-5 7h5"
    />
  </svg>
);
