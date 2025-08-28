export const PayoutSystemIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const color = props?.color || "#000";
  const opacity = props?.opacity || 0.9;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      fill="none"
      {...props}
    >
      <path
        fill={color}
        fillOpacity={opacity}
        d="M5.394 1.944a.83.83 0 0 0 .617-.285c.163-.182.255-.43.255-.687 0-.258-.092-.505-.255-.687A.83.83 0 0 0 5.394 0v1.944ZM10.174 0a.83.83 0 0 0-.616.285c-.164.182-.256.43-.256.687 0 .258.092.505.256.687a.83.83 0 0 0 .616.285V0Zm9.432 1.944c1.988 0 3.65 1.866 3.65 4.237H25C25 2.799 22.612 0 19.606 0v1.944ZM5.394 0C2.388 0 .001 2.799.001 6.18h1.744c0-2.37 1.66-4.236 3.65-4.236V0Zm17.862 6.18c0 2.16-1.384 3.909-3.132 4.196l.256 1.923C23.014 11.865 25 9.27 25 6.181h-1.744Zm-18.38 4.196c-1.75-.287-3.13-2.034-3.13-4.195H0c0 3.089 1.986 5.684 4.62 6.118l.256-1.923Zm5.298-8.432h9.432V0h-9.432v1.944Z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={opacity}
        strokeWidth={1.5}
        d="M12.5 8.746v6.479m0 0 2.325-3.023M12.5 15.225l-2.326-3.023"
      />
      <path
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={1.5}
        d="M4.36 10.042c0-2.443 0-3.664.682-4.423.681-.76 1.776-.76 3.97-.76h6.976c2.193 0 3.289 0 3.97.76.681.759.681 1.98.681 4.423v7.775c0 2.444 0 3.664-.681 4.424-.681.759-1.777.759-3.97.759H9.012c-2.194 0-3.289 0-3.97-.76-.682-.759-.682-1.98-.682-4.423v-7.775Z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={opacity}
        strokeWidth={1.5}
        d="M4.36 19.113h9.303m6.976 0h-2.325"
      />
    </svg>
  );
};
