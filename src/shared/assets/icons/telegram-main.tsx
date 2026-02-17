import { useId } from "react";

export const TelegramMainIcon = (props: any) => {
  const gradientId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={82}
      height={82}
      viewBox="0 0 82 82"
      fill="none"
      {...props}
    >
      <circle cx={41} cy={41} r={35.875} fill={`url(#${gradientId})`} />
      <path
        fill="#fff"
        d="M58.903 26.16c.32-2.064-1.643-3.693-3.478-2.887L18.872 39.32c-1.316.578-1.22 2.571.145 3.006l7.539 2.4a4.86 4.86 0 0 0 4.252-.646l16.995-11.742c.513-.354 1.072.375.634.827L36.203 45.778c-1.186 1.224-.95 3.297.476 4.192l13.697 8.589c1.536.963 3.513-.004 3.8-1.86l4.727-30.539Z"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1={41}
          x2={41}
          y1={5.125}
          y2={76.875}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37BBFE" />
          <stop offset={1} stopColor="#007DBB" />
        </linearGradient>
      </defs>
    </svg>
  );
};
