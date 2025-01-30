import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../shadcn-ui";
import styles from "./styles.module.scss";
import { useWindowWidth } from "@shared/hooks";
import { BREAKPOINT } from "@shared/config";
import { InfoIcon } from "lucide-react";

export interface InfoTooltipProps {
  text: string;
}

export const InfoTooltip: FC<InfoTooltipProps> = ({ text }) => {
  const screen = useWindowWidth();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger type="button" className={styles.trigger}>
          <InfoIcon color="#BDBDBD" />
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
