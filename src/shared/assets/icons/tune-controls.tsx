export const TuneControlsIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const color = props?.color || "#000";
  const opacity = props?.opacity || 0.9;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={22}
      viewBox="0 0 25 22"
      fill="none"
      {...props}
    >
      <path
        fill={color}
        fillOpacity={opacity}
        fillRule="evenodd"
        d="M4.467 0H2.68v9.167h1.787V0Zm10.901 9.167H9.65l-.715-1.009V6.325L9.65 5.5h5.718l.715.917V8.25l-.715.917Zm-8.935 5.5H.715L0 13.75v-1.833L.715 11h5.718l.715.917v1.833l-.715.917ZM13.403 0h-1.788v3.667h1.787V0Zm-1.788 11h1.787v11h-1.787V11Zm-7.148 5.5H2.68V22h1.787v-5.5Zm14.118 0h5.7l.715-.917v-1.741l-.715-.917h-5.7l-.715.917v1.741l.715.917ZM22.337 0H20.55v11h1.787V0ZM20.55 18.333h1.787V22H20.55v-3.667Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
