import { SVGProps } from "react";

interface ArrowReadIconProps extends SVGProps<SVGSVGElement> {
  isRead?: boolean;
}
export const ArrowReadIcon = ({ isRead, ...props }: ArrowReadIconProps) => {
  return (
    <svg width="55" height="35" viewBox="0 0 55 35" {...props}>
      {isRead ? (
        <>
          <path
            d="M5 20 L15 30 L40 5"
            stroke="var(--start-color, #000)"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M27 27 L30 30 L55 5"
            stroke="var(--start-color, #000)"
            strokeWidth="4"
            fill="none"
          />
        </>
      ) : (
        <path
          d="M20 20 L30 30 L55 5"
          stroke="var(--start-color, #000)"
          strokeWidth="4"
          fill="none"
        />
      )}
    </svg>
  );
};
