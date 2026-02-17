import { useId } from "react";

export const InstagramMainIcon = (props: any) => {
  const gradientIdA = useId();
  const gradientIdB = useId();
  const gradientIdC = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={82}
      height={82}
      viewBox="0 0 82 82"
      fill="none"
      {...props}
    >
      <rect
        width={71.75}
        height={71.75}
        x={5.125}
        y={5.125}
        fill={`url(#${gradientIdA})`}
        rx={16}
      />
      <rect
        width={71.75}
        height={71.75}
        x={5.125}
        y={5.125}
        fill={`url(#${gradientIdB})`}
        rx={16}
      />
      <rect
        width={71.75}
        height={71.75}
        x={5.125}
        y={5.125}
        fill={`url(#${gradientIdC})`}
        rx={16}
      />
      <path
        fill="#fff"
        d="M58.938 26.906a3.844 3.844 0 1 1-7.688 0 3.844 3.844 0 0 1 7.688 0Z"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M41 53.813c7.076 0 12.813-5.737 12.813-12.813 0-7.076-5.737-12.813-12.813-12.813-7.076 0-12.813 5.737-12.813 12.813 0 7.076 5.737 12.813 12.813 12.813Zm0-5.126a7.687 7.687 0 1 0 0-15.374 7.687 7.687 0 0 0 0 15.374Z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M15.375 39.975c0-8.61 0-12.916 1.676-16.205a15.374 15.374 0 0 1 6.719-6.72c3.289-1.675 7.594-1.675 16.205-1.675h2.05c8.61 0 12.916 0 16.205 1.676a15.374 15.374 0 0 1 6.72 6.719c1.675 3.289 1.675 7.594 1.675 16.205v2.05c0 8.61 0 12.916-1.676 16.205a15.374 15.374 0 0 1-6.719 6.72c-3.289 1.675-7.594 1.675-16.205 1.675h-2.05c-8.61 0-12.916 0-16.205-1.676a15.374 15.374 0 0 1-6.72-6.719c-1.675-3.289-1.675-7.594-1.675-16.205v-2.05Zm24.6-19.475h2.05c4.39 0 7.374.004 9.68.192 2.248.184 3.397.517 4.198.925a10.25 10.25 0 0 1 4.48 4.48c.408.801.741 1.95.924 4.197.189 2.307.193 5.291.193 9.681v2.05c0 4.39-.004 7.374-.193 9.68-.183 2.248-.516 3.397-.924 4.198a10.25 10.25 0 0 1-4.48 4.48c-.801.408-1.95.741-4.197.924-2.307.189-5.291.193-9.681.193h-2.05c-4.39 0-7.374-.004-9.68-.193-2.248-.183-3.397-.516-4.198-.924a10.25 10.25 0 0 1-4.48-4.48c-.408-.801-.741-1.95-.925-4.197-.188-2.307-.192-5.291-.192-9.681v-2.05c0-4.39.004-7.374.192-9.68.184-2.248.517-3.397.925-4.198a10.25 10.25 0 0 1 4.48-4.48c.801-.408 1.95-.741 4.197-.925 2.307-.188 5.291-.192 9.681-.192Z"
        clipRule="evenodd"
      />
      <defs>
        <radialGradient
          id={gradientIdA}
          cx={0}
          cy={0}
          r={1}
          gradientTransform="rotate(-55.376 71.534 .169) scale(65.394)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B13589" />
          <stop offset={0.793} stopColor="#C62F94" />
          <stop offset={1} stopColor="#8A3AC8" />
        </radialGradient>
        <radialGradient
          id={gradientIdB}
          cx={0}
          cy={0}
          r={1}
          gradientTransform="rotate(-65.136 76.276 17.654) scale(57.8978)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E0E8B7" />
          <stop offset={0.445} stopColor="#FB8A2E" />
          <stop offset={0.715} stopColor="#E2425C" />
          <stop offset={1} stopColor="#E2425C" stopOpacity={0} />
        </radialGradient>
        <radialGradient
          id={gradientIdC}
          cx={0}
          cy={0}
          r={1}
          gradientTransform="rotate(-8.13 54.726 -5.17) scale(99.6579 21.3158)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.157} stopColor="#406ADC" />
          <stop offset={0.468} stopColor="#6A45BE" />
          <stop offset={1} stopColor="#6A45BE" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
};
