interface RatingIconProps {
  rate?: number;
}

export const RatingIcon: React.FC<RatingIconProps> = ({ rate }) => {
  const stars = Math.min(Math.max(Math.ceil(rate || 0), 0), 5);
  console.log(stars);

  return (
    <svg
      width="99"
      height="15"
      viewBox="0 0 99 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[...Array(5)].map((_, index) => (
        <path
          key={index}
          d={`M${7.875 + index * 20.75} 0L${10.3125 + index * 20.75} 4.9375L${15.75 + index * 20.75} 5.75L${11.8125 + index * 20.75} 9.5625L${12.75 + index * 20.75} 15L${7.875 + index * 20.75} 12.4375L${3 + index * 20.75} 15L${3.9375 + index * 20.75} 9.5625L${0 + index * 20.75} 5.75L${5.4375 + index * 20.75} 4.9375L${7.875 + index * 20.75} 0Z`}
          fill={index < stars ? "#FFCA28" : "#E0E0E0"}
        />
      ))}
    </svg>
  );
};
