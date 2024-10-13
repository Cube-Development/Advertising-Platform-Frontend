import { SVGProps, useId } from "react";

export const BagIcon = (props: SVGProps<SVGSVGElement>) => {
  const gradientId0 = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      fill="none"
      viewBox="0 0 24 25"
      {...props}
    >
      <circle cx={12} cy={12.5} r={12} fill={`url(#${gradientId0})`} />
      <path
        stroke="#fff"
        strokeLinecap="round"
        d="M6.59 15.47c.363 1.456.544 2.184 1.085 2.607.541.424 1.29.424 2.786.424h3.078c1.497 0 2.245 0 2.787-.424.54-.424.722-1.15 1.084-2.606.57-2.288.856-3.431.258-4.2-.6-.77-1.776-.77-4.128-.77h-3.08c-2.352 0-3.528 0-4.127.77-.352.45-.399 1.031-.262 1.897"
      />
      <path
        stroke="#fff"
        d="m16.987 10.833-.472-1.737c-.182-.67-.273-1.005-.46-1.257a1.664 1.664 0 0 0-.73-.558c-.293-.115-.639-.115-1.33-.115m-6.982 3.667.472-1.737c.182-.67.273-1.005.46-1.257.186-.251.44-.445.73-.558.293-.115.638-.115 1.33-.115"
      />
      <path
        stroke="#fff"
        d="M10.005 7.167a.668.668 0 0 1 .665-.667h2.66a.664.664 0 0 1 .665.667.667.667 0 0 1-.665.666h-2.66a.664.664 0 0 1-.665-.666Z"
      />
      <defs>
        <linearGradient
          id={gradientId0}
          x1={-0.493}
          x2={11.816}
          y1={12.5}
          y2={0.254}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--start-color, #4772E6)" />
          <stop offset={1} stopColor="var(--end-color, #8E54E9)" />
        </linearGradient>
      </defs>
    </svg>
  );
};
