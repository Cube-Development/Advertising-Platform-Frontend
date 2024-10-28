import { SVGProps, useId } from "react";

export const SaveIcon = (props: SVGProps<SVGSVGElement>) => {
  const gradientIdA = useId();
  const gradientIdB = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={22}
      fill="none"
      {...props}
    >
      <path
        stroke={`url(#${gradientIdA})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 8.16v7.987a4.1 4.1 0 0 1-1.204 2.901 4.113 4.113 0 0 1-2.906 1.202H5.61a4.113 4.113 0 0 1-3.797-2.533 4.1 4.1 0 0 1-.313-1.57V5.853a4.1 4.1 0 0 1 1.204-2.901A4.113 4.113 0 0 1 5.61 1.75h8.35a3.004 3.004 0 0 1 2.25.998l3 3.415c.501.545.783 1.256.79 1.997Z"
      />
      <path
        stroke={`url(#${gradientIdB})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.75 20.22v-5.24a1.995 1.995 0 0 1 2-1.998h6a2.002 2.002 0 0 1 2 1.997v5.241m-1.2-18.41v4.183a1.526 1.526 0 0 1-1.52 1.528H8.47a1.531 1.531 0 0 1-1.52-1.528V1.75m1.946 15.108h3.708"
      />
      <defs>
        <linearGradient
          id={gradientIdA}
          x1={1.12}
          x2={10.608}
          y1={11}
          y2={1.56}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4772E6" />
          <stop offset={1} stopColor="#8E54E9" />
        </linearGradient>
        <linearGradient
          id={gradientIdB}
          x1={5.545}
          x2={13.455}
          y1={10.985}
          y2={6.724}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4772E6" />
          <stop offset={1} stopColor="#8E54E9" />
        </linearGradient>
      </defs>
    </svg>
  );
};
