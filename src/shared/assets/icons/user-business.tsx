export const UserBusinessIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const color = props?.color || "#000";
  const opacity = props?.opacity || 0.9;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={26}
      viewBox="0 0 25 26"
      fill="none"
      {...props}
    >
      <path
        fill={color}
        fillOpacity={opacity}
        d="M12.5 13c3.945 0 7.143-2.91 7.143-6.5S16.445 0 12.5 0 5.357 2.91 5.357 6.5 8.555 13 12.5 13Zm5.346 1.655-2.667 9.72-1.786-6.906 1.786-2.844H9.82l1.786 2.844-1.786 6.906-2.667-9.72C3.175 14.829 0 17.79 0 21.45v2.113C0 24.907 1.2 26 2.679 26H22.32C23.801 26 25 24.908 25 23.562V21.45c0-3.661-3.175-6.622-7.154-6.794Z"
      />
    </svg>
  );
};
