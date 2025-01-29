import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../shadcn-ui";
import { InfoIcon } from "@shared/assets";
import styles from "./styles.module.scss";
import { useWindowWidth } from "@shared/hooks";
import { BREAKPOINT } from "@shared/config";

export interface InfoTooltipProps {
  text: string;
}

export const InfoTooltip: FC<InfoTooltipProps> = ({ text }) => {
  const screen = useWindowWidth();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger type="button">
          <InfoIcon />
        </TooltipTrigger>
        <TooltipContent
          side={`${screen > BREAKPOINT.MD ? "right" : "top"}`}
          className={styles.content}
        >
          <p className={styles.text}>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
