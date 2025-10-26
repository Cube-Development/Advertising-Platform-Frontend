import { FC } from "react";
import { Link } from "react-router-dom";
import { TelegramIcon } from "@shared/assets";

export const SendToTelegram: FC<{ post_deeplink: string }> = ({
  post_deeplink,
}) => {
  return (
    <Link
      to={post_deeplink}
      target="_blank"
      className="mt-2 ml-2.5 flex items-center justify-center gap-3 p-3 rounded-full bg-white text-[#2F7ED3] [&>svg]:size-4 [&>svg]:scale-[1.5] hover:bg-white/80 duration-500 transition-all"
    >
      <TelegramIcon />
      <p className="text-sm font-medium">Send to Telegram</p>
    </Link>
  );
};
