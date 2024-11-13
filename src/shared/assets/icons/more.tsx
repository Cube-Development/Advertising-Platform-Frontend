import { SVGProps, useId } from "react";

export const MoreIcon = (props: SVGProps<SVGSVGElement>) => {
  const gradientIdA = useId();
  const gradientIdB = useId();
  const gradientIdC = useId();
  const gradientIdD = useId();
  const gradientIdE = useId();
  const gradientIdF = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="7"
      viewBox="0 0 24 7"
      fill="none"
      {...props}
    >
      <rect
        width={5}
        height={5.25}
        x={0.5}
        y={0.5}
        fill={`url(#${gradientIdA})`}
        stroke={`url(#${gradientIdB})`}
        rx={2.5}
      />
      <rect
        width={5}
        height={5.25}
        x={9.5}
        y={0.5}
        fill={`url(#${gradientIdC})`}
        stroke={`url(#${gradientIdD})`}
        rx={2.5}
      />
      <rect
        width={5}
        height={5.25}
        x={18.5}
        y={0.5}
        fill={`url(#${gradientIdE})`}
        stroke={`url(#${gradientIdF})`}
        rx={2.5}
      />
      <defs>
        <linearGradient
          id={gradientIdA}
          x1={-0.123}
          x2={3.079}
          y1={3.125}
          y2={0.067}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--start-color, #4772E6)" />
          <stop offset="1" stopColor="var(--end-color, #8E54E9)" />
        </linearGradient>
        <linearGradient
          id={gradientIdB}
          x1={-0.123}
          x2={3.079}
          y1={3.125}
          y2={0.067}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--start-color, #4772E6)" />
          <stop offset="1" stopColor="var(--end-color, #8E54E9)" />
        </linearGradient>
        <linearGradient
          id={gradientIdC}
          x1={8.877}
          x2={12.079}
          y1={3.125}
          y2={0.067}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--start-color, #4772E6)" />
          <stop offset="1" stopColor="var(--end-color, #8E54E9)" />
        </linearGradient>
        <linearGradient
          id={gradientIdD}
          x1={8.877}
          x2={12.079}
          y1={3.125}
          y2={0.067}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--start-color, #4772E6)" />
          <stop offset="1" stopColor="var(--end-color, #8E54E9)" />
        </linearGradient>
        <linearGradient
          id={gradientIdE}
          x1={17.877}
          x2={21.079}
          y1={3.125}
          y2={0.067}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--start-color, #4772E6)" />
          <stop offset="1" stopColor="var(--end-color, #8E54E9)" />
        </linearGradient>
        <linearGradient
          id={gradientIdF}
          x1={17.877}
          x2={21.079}
          y1={3.125}
          y2={0.067}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--start-color, #4772E6)" />
          <stop offset="1" stopColor="var(--end-color, #8E54E9)" />
        </linearGradient>
      </defs>
    </svg>
  );
};
