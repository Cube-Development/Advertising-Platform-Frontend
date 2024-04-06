import * as React from "react";
import { SVGProps } from "react";

interface ArrowIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

export const ArrowIcon = ({ ...props }: ArrowIconProps) => (
  <svg
    {...props}
    width="10"
    height="7"
    viewBox="0 0 10 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.59746 1.76966C9.81999 1.53857 9.81365 1.17102 9.58329 0.947746C9.35296 0.724507 8.98546 0.729612 8.76142 0.959163L5.32883 4.47625C5.14853 4.66099 4.85147 4.66099 4.67117 4.47625L1.23858 0.959164C1.01454 0.729613 0.647039 0.724507 0.416713 0.947746C0.186351 1.17102 0.180012 1.53857 0.402538 1.76966L4.60058 6.12916C4.81869 6.35567 5.18131 6.35567 5.39942 6.12916L9.59746 1.76966Z"
      fill="current"
    />
  </svg>
);
