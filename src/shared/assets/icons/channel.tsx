import { SVGProps } from "react";

export const ChannelIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <path
      stroke="var(--start-color, #fff)"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M1 12.3v1.8c0 2.545 0 3.819.791 4.609.79.791 2.064.791 4.609.791h7.2m0 0c2.545 0 3.819 0 4.609-.791.791-.79.791-2.064.791-4.609v-3.6c0-2.545 0-3.819-.791-4.609-.79-.791-2.064-.791-4.609-.791m0 14.4v-7.2m0-7.2H6.4c-2.545 0-3.819 0-4.609.791-.578.577-.733 1.411-.776 2.809M13.6 5.1v3.6M7.3 1.5 10 4.65l2.7-3.15"
    />
    <path
      fill="var(--start-color, #fff)"
      d="M17.2 14.1a.9.9 0 1 0-1.8 0 .9.9 0 0 0 1.8 0Zm0-3.6a.9.9 0 1 0-1.8 0 .9.9 0 0 0 1.8 0Z"
    />
  </svg>
);
