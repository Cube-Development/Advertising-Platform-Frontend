import { FC, useState } from "react";
import { Toggle } from "@shared/ui/shadcn-ui/ui/toggle";
import {
  Bold,
  Italic,
  Link,
  Strikethrough,
  Underline,
  WholeWord,
} from "lucide-react";
import styles from "./styles.module.scss";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/ui/shadcn-ui/ui/popover";
import { useTranslation } from "react-i18next";

interface TextFormat {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  monospace?: boolean;
}

interface ToolbarProps {
  format: TextFormat;
  onToggleFormat: (key: keyof TextFormat) => void;
  onAddLink: (url: string) => void;
  onLinkButtonClick: () => void;
}

export const Toolbar: FC<ToolbarProps> = ({
  format,
  onToggleFormat,
  onAddLink,
  onLinkButtonClick,
}) => {
  const { t } = useTranslation();
  const [link, setLink] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleLinkSubmit = () => {
    if (link.length > 0) {
      onAddLink(link);
      setLink("");
      setIsPopoverOpen(false);
    }
  };

  const handlePopoverOpenChange = (open: boolean) => {
    setIsPopoverOpen(open);
    if (open) {
      onLinkButtonClick();
    }
  };

  return (
    <div className={styles.toolbar}>
      <Toggle
        size={"lg"}
        pressed={format.bold || false}
        onPressedChange={() => onToggleFormat("bold")}
      >
        <Bold className="h-8 w-8" />
      </Toggle>
      <Toggle
        size={"lg"}
        pressed={format.italic || false}
        onPressedChange={() => onToggleFormat("italic")}
      >
        <Italic className="h-8 w-8" />
      </Toggle>
      <Toggle
        size={"lg"}
        pressed={format.strikethrough || false}
        onPressedChange={() => onToggleFormat("strikethrough")}
      >
        <Strikethrough className="h-8 w-8" />
      </Toggle>
      <Toggle
        size={"lg"}
        pressed={format.underline || false}
        onPressedChange={() => onToggleFormat("underline")}
      >
        <Underline className="h-8 w-8" />
      </Toggle>
      <Toggle
        size={"lg"}
        pressed={format.monospace || false}
        onPressedChange={() => onToggleFormat("monospace")}
      >
        <WholeWord className="h-8 w-8" />
      </Toggle>
      <Popover open={isPopoverOpen} onOpenChange={handlePopoverOpenChange}>
        <PopoverTrigger asChild>
          <Toggle size={"lg"} pressed={false} onClick={onLinkButtonClick}>
            <Link className="h-8 w-8" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={-60}
          className="relative p-0 rounded-[10px]"
          align="end"
        >
          <input
            className="col-span-2 rounded-[10px] h-full p-2 border-[0.5px] border-solid border-[rgba(0,0,0,0.4)] w-full pr-[50px]"
            placeholder={t("url_link")}
            onChange={(e) => setLink(e.target.value)}
            value={link}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLinkSubmit();
              }
            }}
          />
          <div
            onClick={handleLinkSubmit}
            className="cursor-pointer rounded-r-[10px] bg-[#000] h-full p-2 w-16 flex center justify-center absolute top-0 right-0"
          >
            <Link className="h-5 w-10 text-white" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
