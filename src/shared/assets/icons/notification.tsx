import { SVGProps, useId } from "react";

interface NotificationMainIconProps extends SVGProps<SVGSVGElement> {
  haveNewNotification?: boolean;
}
export const NotificationMainIcon = ({
  haveNewNotification,
  ...props
}: NotificationMainIconProps) => {
  const gradientIdA = useId();
  const gradientIdB = useId();
  const gradientIdC = useId();
  const gradientIdD = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={20}
      fill="none"
      viewBox="0 0 19 20"
      {...props}
    >
      <path
        stroke={`url(#${gradientIdA})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.4}
        d="M3.125 16.692V8.385c0-1.469.672-2.878 1.867-3.916C6.188 3.43 7.81 2.847 9.5 2.847c1.69 0 3.312.583 4.508 1.622 1.195 1.038 1.867 2.447 1.867 3.916v8.307m-12.75 0h12.75m-12.75 0H1m14.875 0H18M7.375 19h4.25"
      />
      <path
        stroke={`url(#${gradientIdB})`}
        strokeWidth={1.4}
        d="M9.5 2.846c.587 0 1.063-.413 1.063-.923S10.087 1 9.5 1s-1.063.413-1.063.923.476.923 1.063.923Z"
      />
      {haveNewNotification && (
        <>
          <rect
            width={5}
            height={5}
            x={12.5}
            y={3.5}
            fill={`url(#${gradientIdC})`}
            rx={2.5}
          />
          <rect
            width={5}
            height={5}
            x={12.5}
            y={3.5}
            fill={`url(#${gradientIdD})`}
            fillOpacity={0.2}
            rx={2.5}
          />
          <rect width={5} height={5} x={12.5} y={3.5} stroke="#fff" rx={2.5} />
        </>
      )}
      <defs>
        <linearGradient
          id={gradientIdA}
          x1={0.651}
          x2={8.927}
          y1={10.923}
          y2={2.258}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4772E6" />
          <stop offset={1} stopColor="#8E54E9" />
        </linearGradient>
        <linearGradient
          id={gradientIdB}
          x1={8.394}
          x2={9.332}
          y1={1.923}
          y2={0.849}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4772E6" />
          <stop offset={1} stopColor="#8E54E9" />
        </linearGradient>
        <linearGradient
          id={gradientIdC}
          x1={13}
          x2={17}
          y1={5.994}
          y2={5.994}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2F66" />
          <stop offset={1} stopColor="#FE6E30" stopOpacity={0.99} />
        </linearGradient>
        <radialGradient
          id={gradientIdD}
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(4 -3.71745 9.87915 10.63004 13 8)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#7D7575" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
};
