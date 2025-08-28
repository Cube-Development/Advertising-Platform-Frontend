export const AiImageIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const color = props?.color || "#000";
  const opacity = props?.opacity || 0.9;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={opacity}
        strokeWidth={2}
        d="M15.667 7.111h.012M9.556 23h-4.89A3.667 3.667 0 0 1 1 19.333V4.667A3.667 3.667 0 0 1 4.667 1h14.666A3.667 3.667 0 0 1 23 4.667v6.11"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={opacity}
        strokeWidth={2}
        d="m1 16.889 6.111-6.111c1.134-1.092 2.533-1.092 3.667 0L12 12m2.444 11v-4.89a2.445 2.445 0 0 1 4.89 0V23m-4.89-2.445h4.89M23 15.666V23"
      />
    </svg>
  );
};
