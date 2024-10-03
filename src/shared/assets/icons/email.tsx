import { SVGProps, useId } from "react";
export const EmailIcon = (props: SVGProps<SVGSVGElement>) => {
  const generateId = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={18}
      viewBox="0 0 24 18"
      fill="none"
      {...props}
    >
      <path
        fill={`url(#${generateId})`}
        fillRule="evenodd"
        d="m22.425 2.526-9.47 7.842a1.5 1.5 0 0 1-1.914 0L1.576 2.526c-.05.153-.076.313-.076.474v12A1.5 1.5 0 0 0 3 16.5h18a1.5 1.5 0 0 0 1.5-1.5V3a1.5 1.5 0 0 0-.075-.474ZM3 0h18a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3Zm-.315 1.5 8.364 6.905a1.5 1.5 0 0 0 1.905.004L21.402 1.5H2.685Z"
        clipRule="evenodd"
      />
      <defs>
        <linearGradient
          id={generateId}
          x1={-0.493}
          x2={8.382}
          y1={9}
          y2={-2.773}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--start-color, #4772E6)" />
          <stop offset={1} stopColor="var(--end-color, #8E54E9)" />
        </linearGradient>
      </defs>
    </svg>
  );
};
