import { SVGProps } from "react";
export const WalletIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={18}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      // strokeOpacity={0.65}
      strokeWidth={1.5}
      d="M5 5h4"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      // strokeOpacity={0.65}
      strokeWidth={1.5}
      d="M21 7.5c0-.077 0-.533-.002-.565-.036-.501-.465-.9-1.005-.933C19.959 6 19.918 6 19.834 6h-2.602C15.446 6 14 7.343 14 9s1.447 3 3.23 3h2.603c.084 0 .125 0 .16-.002.54-.033.97-.432 1.005-.933.002-.032.002-.488.002-.565"
    />
    <path
      fill="#000"
      // fillOpacity={0.65}
      d="M17 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      // strokeOpacity={0.65}
      strokeWidth={1.5}
      d="M12 1c3.771 0 5.657 0 6.828 1.172.809.808 1.06 1.956 1.137 3.828M9 17h3c3.771 0 5.657 0 6.828-1.172.809-.808 1.06-1.956 1.137-3.828M8 1c-3.114.01-4.765.108-5.828 1.172C1 3.343 1 5.229 1 9c0 3.771 0 5.657 1.172 6.828.653.654 1.528.943 2.828 1.07"
    />
  </svg>
);
