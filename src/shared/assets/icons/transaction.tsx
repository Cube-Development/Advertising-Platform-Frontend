import { SVGProps } from "react";

export const TransactionIcon = (props: SVGProps<SVGSVGElement>) => (
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
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.871 8.156a1.615 1.615 0 0 0-1.523-1.078h-1.25a1.441 1.441 0 0 0-.31 2.851l1.905.416a1.616 1.616 0 0 1-.347 3.194H9.27a1.615 1.615 0 0 1-1.523-1.075M9.81 7.077V5.462m0 9.693v-1.614m-6.735 5.957v-3.462h3.462"
    />
    <path
      stroke="var(--start-color, #fff)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.846 8.844a9.001 9.001 0 0 1-15.772 7.408m-1.92-4.096a9 9 0 0 1 15.772-7.408"
    />
    <path
      stroke="var(--start-color, #fff)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.926 1.502v3.462h-3.461"
    />
  </svg>
);
