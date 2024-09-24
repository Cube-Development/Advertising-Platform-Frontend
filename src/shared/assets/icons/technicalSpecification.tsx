import { SVGProps, useId } from "react";

export const TechnicalSpecificationIcon = (props: SVGProps<SVGSVGElement>) => {
  const gradientId0 = useId();
  const gradientId1 = useId();
  const gradientId2 = useId();

  return (
    <svg width="24" height="25" fill="none" viewBox="0 0 24 25" {...props}>
      <path
        d="M15 11.5C16.1046 11.5 17 10.6046 17 9.5C17 8.39543 16.1046 7.5 15 7.5C13.8954 7.5 13 8.39543 13 9.5C13 10.6046 13.8954 11.5 15 11.5Z"
        stroke={`url(#${gradientId0})`}
        strokeWidth="1.5"
      />
      <path
        d="M20 18.0998L17.776 16.0998C17.2713 15.6454 16.6273 15.3757 15.9494 15.3349C15.2714 15.294 14.5997 15.4844 14.044 15.8748L13.746 16.0848C13.3609 16.3555 12.8926 16.4816 12.4236 16.441C11.9546 16.4004 11.5149 16.1957 11.182 15.8628L6.89203 11.5728C6.47939 11.1606 5.92553 10.9205 5.34255 10.9012C4.75958 10.8819 4.19104 11.0848 3.75203 11.4688L2.28003 12.7528"
        stroke={`url(#${gradientId1})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 3.83801C8.51945 2.95874 10.2445 2.49712 12 2.50001C17.523 2.50001 22 6.97701 22 12.5C22 18.023 17.523 22.5 12 22.5C6.477 22.5 2 18.023 2 12.5C2 10.679 2.487 8.97001 3.338 7.50001"
        stroke={`url(#${gradientId2})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id={gradientId0}
          x1={12.918}
          x2={14.969}
          y1={9.5}
          y2={7.459}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--start-color, #4772E6)" />
          <stop offset={1} stopColor="var(--end-color, #8E54E9)" />
        </linearGradient>
        <linearGradient
          id={gradientId1}
          x1={1.916}
          x2={4.501}
          y1={14.5}
          y2={8.17}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--start-color, #4772E6)" />
          <stop offset={1} stopColor="var(--end-color, #8E54E9)" />
        </linearGradient>
        <linearGradient
          id={gradientId2}
          x1={1.589}
          x2={11.847}
          y1={12.5}
          y2={2.295}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--start-color, #4772E6)" />
          <stop offset={1} stopColor="var(--end-color, #8E54E9)" />
        </linearGradient>
      </defs>
    </svg>
  );
};
