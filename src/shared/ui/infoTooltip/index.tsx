import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import { InfoIcon } from "lucide-react";
import { FC, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../shadcn-ui";
import styles from "./styles.module.scss";

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
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <InfoIcon color="#BDBDBD" />
      </TooltipTrigger>
      <TooltipContent
        side={`${screen > BREAKPOINT.MD ? "right" : "top"}`}
        className={styles.content}
      >
        <p className={styles.text}>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};
