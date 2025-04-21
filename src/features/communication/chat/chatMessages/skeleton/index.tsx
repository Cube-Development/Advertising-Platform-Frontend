import { RECIPIENT_TYPE } from "@entities/communication";
import { Skeleton } from "@shared/ui";
import { FC } from "react";

interface SkeletonChatMessageProps {
  recipient: RECIPIENT_TYPE;
}

export const SkeletonChatMessage: FC<SkeletonChatMessageProps> = ({
  recipient,
}) => {
  const heights = ["h-[35px]", "h-[35px]", "h-[35px]", "h-[35px]", "h-[55px]"];
  const widths = [
    "w-[70%]",
    "w-[65%]",
    "w-[60%]",
    "w-[55%]",
    "w-[50%]",
    "w-[45%]",
    "w-[40%]",
  ];
  const getRandomValue = (values: string[]) =>
    values[Math.floor(Math.random() * values.length)];
  const randomHeight = getRandomValue(heights);
  const randomWidth = getRandomValue(widths);
  const rounded =
    recipient === RECIPIENT_TYPE.RECEIVER
      ? "rounded-tl-[10px] rounded-bl-[10px] rounded-tr-[20px] rounded-br-[20px]"
      : "rounded-tl-[20px] rounded-bl-[20px] rounded-tr-[10px] rounded-br-[10px]";
  return (
    <Skeleton
      className={`bg-skeleton-light ${randomHeight} ${randomWidth} ${rounded}`}
    />
  );
};
