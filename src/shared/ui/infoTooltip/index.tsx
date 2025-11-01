import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import { InfoIcon } from "lucide-react";
import { FC, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../shadcn-ui";

export interface InfoTooltipProps {
  text: string;
}

export const InfoTooltip: FC<InfoTooltipProps> = ({ text }) => {
  const screen = useWindowWidth();
  const [open, setOpen] = useState(false);
  return (
    <Tooltip open={open}>
      <TooltipTrigger
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <InfoIcon
          size={16}
          className="text-[var(--Personal-colors-main2)] transition-transform duration-300 ease-in hover:scale-110"
        />
      </TooltipTrigger>
      <TooltipContent
        side={`${screen > BREAKPOINT.MD ? "right" : "top"}`}
        className="max-w-[300px]"
      >
        <p className="text-[12px] font-normal leading-none text-justify indent-5 md:text-[10px] hyphens-auto">
          {text}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};
