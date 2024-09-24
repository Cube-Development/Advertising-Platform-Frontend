import { SVGProps, useId } from "react";

interface ChatMainIconProps extends SVGProps<SVGSVGElement> {
  haveNewMessage?: boolean;
}
export const ChatMainIcon = ({
  haveNewMessage,
  ...props
}: ChatMainIconProps) => {
  const gradientId0 = useId();
  const gradientId1 = useId();
  const gradientId2 = useId();
  const gradientId3 = useId();
  const gradientId4 = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <g clipPath={`url(#${gradientId0})`}>
        <path
          stroke={`url(#${gradientId1})`}
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M6.667 7.5h6.666m-6.666 2.917h4.583"
        />
        <path
          fill={`url(#${gradientId2})`}
          d="M1.042 8.75a.625.625 0 0 0 1.25 0h-1.25Zm1.52 4.271a.625.625 0 1 0-1.155.479l1.155-.479Zm8.881 5.12.452-.763-1.075-.637-.452.764 1.075.637Zm-3.338-.763.452.764 1.075-.637-.451-.764-1.076.637Zm2.263.127a.433.433 0 0 1-.735 0l-1.076.637c.644 1.089 2.241 1.089 2.886 0l-1.075-.637ZM8.75 2.292h2.5v-1.25h-2.5v1.25Zm8.958 6.458v.833h1.25V8.75h-1.25ZM6.503 15.2c-1.047-.018-1.595-.085-2.025-.263L4 16.093c.67.279 1.434.341 2.48.36l.023-1.252ZM1.407 13.5A4.79 4.79 0 0 0 4 16.093l.478-1.155a3.54 3.54 0 0 1-1.916-1.917l-1.155.479Zm16.301-3.917c0 .98 0 1.683-.038 2.238-.037.549-.11.907-.23 1.2l1.153.479c.196-.472.282-.982.325-1.594.041-.608.04-1.36.04-2.323h-1.25Zm-4.189 6.868c1.047-.018 1.81-.08 2.481-.358l-.478-1.155c-.43.178-.978.245-2.024.263l.021 1.25Zm3.92-3.43a3.541 3.541 0 0 1-1.916 1.917L16 16.093a4.791 4.791 0 0 0 2.593-2.593l-1.154-.479ZM11.25 2.291c1.376 0 2.364 0 3.135.075.762.072 1.246.21 1.633.447l.652-1.066c-.616-.376-1.314-.545-2.167-.626-.843-.08-1.901-.08-3.253-.08v1.25Zm7.708 6.459c0-1.352 0-2.41-.08-3.253-.08-.853-.249-1.552-.625-2.167l-1.067.652c.237.387.376.871.448 1.634.074.77.074 1.758.074 3.134h1.25Zm-2.941-5.937a3.54 3.54 0 0 1 1.17 1.17l1.066-.653a4.792 4.792 0 0 0-1.583-1.583l-.653 1.066ZM8.75 1.041c-1.352 0-2.41 0-3.253.08-.853.081-1.552.25-2.167.626l.653 1.067c.386-.238.87-.376 1.633-.448.77-.074 1.758-.075 3.134-.075v-1.25ZM2.292 8.75c0-1.376 0-2.364.074-3.135.072-.762.21-1.246.447-1.633l-1.065-.651c-.377.615-.545 1.313-.627 2.166-.08.845-.08 1.901-.08 3.253h1.25ZM3.33 1.747a4.794 4.794 0 0 0-1.582 1.584l1.066.651a3.542 3.542 0 0 1 1.169-1.169L3.33 1.747Zm5.85 14.994c-.168-.285-.317-.538-.462-.736a1.834 1.834 0 0 0-.568-.538l-.628 1.081c.039.024.093.065.186.194.101.138.215.33.397.636l1.075-.637Zm-2.7-.29c.368.006.598.011.775.03.165.019.23.045.267.067l.628-1.08a1.834 1.834 0 0 0-.757-.229c-.249-.028-.547-.032-.89-.038l-.022 1.25Zm5.415.927c.182-.306.296-.498.397-.637a.646.646 0 0 1 .186-.193l-.628-1.08a1.87 1.87 0 0 0-.568.537c-.144.198-.294.45-.463.736l1.076.637Zm1.603-2.177c-.343.006-.642.01-.89.038-.26.03-.514.087-.758.228l.628 1.081c.038-.021.102-.048.267-.066a9.26 9.26 0 0 1 .775-.031l-.022-1.25Z"
        />
        {Boolean(haveNewMessage) && (
          <>
            <rect
              width={5.167}
              height={5.167}
              x={14.5}
              y={0.333}
              fill={`url(#${gradientId3})`}
              rx={2.583}
            />
            <rect
              width={5.167}
              height={5.167}
              x={14.5}
              y={0.333}
              fill={`url(#${gradientId4})`}
              fillOpacity={0.2}
              rx={2.583}
            />
            <rect
              width={5.167}
              height={5.167}
              x={14.5}
              y={0.333}
              stroke="#fff"
              rx={2.583}
            />
          </>
        )}
      </g>
      <defs>
        <linearGradient
          id={gradientId1}
          x1={6.53}
          x2={7.632}
          y1={8.958}
          y2={6.451}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4772E6" />
          <stop offset={1} stopColor="#8E54E9" />
        </linearGradient>
        <linearGradient
          id={gradientId2}
          x1={0.674}
          x2={9.863}
          y1={10}
          y2={0.858}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4772E6" />
          <stop offset={1} stopColor="#8E54E9" />
        </linearGradient>
        <linearGradient
          id={gradientId3}
          x1={15}
          x2={19.167}
          y1={2.911}
          y2={2.911}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2F66" />
          <stop offset={1} stopColor="#FE6E30" stopOpacity={0.99} />
        </linearGradient>
        <radialGradient
          id={gradientId4}
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(4.16667 -3.87234 10.2908 11.07298 15 5)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#7D7575" stopOpacity={0} />
        </radialGradient>
        <clipPath id={gradientId0}>
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
