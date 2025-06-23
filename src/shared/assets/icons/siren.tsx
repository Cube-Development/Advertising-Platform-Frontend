import { SVGProps } from "react";

export const SirenIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={70}
    height={70}
    fill="none"
    {...props}
  >
    <path
      fill="url(#a)"
      fillRule="evenodd"
      d="M11.667 61.979H5.833a2.188 2.188 0 0 0 0 4.375h58.334a2.187 2.187 0 1 0 0-4.375h-5.834V46.666c0-8.166 0-12.25-1.59-15.37a14.584 14.584 0 0 0-6.372-6.373c-3.121-1.59-7.204-1.59-15.371-1.59-8.167 0-12.25 0-15.37 1.59a14.584 14.584 0 0 0-6.374 6.373c-1.59 3.12-1.59 7.204-1.59 15.37V61.98ZM39.375 51.04a4.375 4.375 0 0 1-2.188 3.792v7.146h-4.374v-7.146a4.375 4.375 0 1 1 6.562-3.792Zm4.375-21.685a2.188 2.188 0 0 0 0 4.375c2.456 0 4.27 1.86 4.188 4.107a2.187 2.187 0 0 0 4.372.157c.178-4.93-3.84-8.64-8.56-8.64Z"
      clipRule="evenodd"
    />
    <path
      fill="url(#b)"
      d="M35 3.646a2.187 2.187 0 0 1 2.188 2.187v8.75a2.188 2.188 0 0 1-4.376 0v-8.75A2.188 2.188 0 0 1 35 3.646Zm27.796 12.483-4.375 4.375a2.186 2.186 0 0 1-3.629-.672 2.187 2.187 0 0 1 .537-2.42l4.375-4.375a2.187 2.187 0 1 1 3.092 3.092Zm-52.5-3.092a2.187 2.187 0 0 0-3.092 3.092l4.375 4.375a2.187 2.187 0 0 0 3.092-3.092l-4.375-4.375Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={2.357}
        x2={22.981}
        y1={44.843}
        y2={14.935}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4772E6" />
        <stop offset={1} stopColor="#8E54E9" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={5.448}
        x2={10.544}
        y1={12.423}
        y2={-4.003}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4772E6" />
        <stop offset={1} stopColor="#8E54E9" />
      </linearGradient>
    </defs>
  </svg>
);
