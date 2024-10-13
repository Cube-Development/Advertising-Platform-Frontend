import { SVGProps, useId } from "react";

export const MessageAppendixIcon = (props: SVGProps<SVGSVGElement>) => {
  const generateIdA = useId();
  return (
    <svg width={7} height={17} viewBox="0 0 7 17" {...props}>
      <defs>
        <filter
          id={generateIdA}
          // width="200%"
          // height="141.2%"
          // x="-50%"
          // y="-14.7%"
          filterUnits="objectBoundingBox"
        >
          <feOffset dy={1} in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation={1}
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0"
          />
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill="var(--start-color, #000)"
          d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 0 1 6 17z"
          filter={`url(#${generateIdA})`}
        />
        <path
          fill="var(--start-color, #fff)"
          d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 0 1 6 17z"
          className="corner"
        />
      </g>
    </svg>
  );
};
