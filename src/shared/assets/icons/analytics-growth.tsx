export const AnalyticsGrowthIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const color = props?.color || "#000";
  const opacity = props?.opacity || 0.9;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      {...props}
    >
      <path
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={1.5}
        d="M21.4 8.2a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={opacity}
        strokeWidth={1.5}
        d="m7 15.4 2.752-2.752a1.2 1.2 0 0 1 1.696 0l1.904 1.903a1.2 1.2 0 0 0 1.696 0L19 10.6m0 0v3m0-3h-3"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeOpacity={opacity}
        strokeWidth={1.5}
        d="M25 11.2V13c0 5.657 0 8.485-1.758 10.242C21.486 25 18.657 25 13 25c-5.657 0-8.485 0-10.243-1.758C1 21.486 1 18.657 1 13c0-1.354 0-2.546.024-3.6M14.8 1H13C7.343 1 4.515 1 2.757 2.757c-.528.529-.899 1.155-1.157 1.927"
      />
    </svg>
  );
};
