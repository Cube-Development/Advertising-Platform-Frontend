import { SVGProps } from "react";

export const EditPencilIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    viewBox="0 0 19 19"
    fill="none"
    {...props}
  >
    <path
      stroke="var(--start-color, #A3A0A0)"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12 3.283 3 3.153M10 18h8M2 13.795 1 18l4-1.051 11.586-12.18c.375-.394.586-.929.586-1.486 0-.558-.211-1.092-.586-1.487l-.172-.18A1.952 1.952 0 0 0 15 1c-.53 0-1.039.221-1.414.616L2 13.796Z"
    />
  </svg>
);
