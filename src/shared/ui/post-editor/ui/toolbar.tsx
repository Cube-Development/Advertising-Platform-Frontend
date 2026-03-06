import { Toggle } from "@shared/ui";
import {
  Bold,
  Italic,
  Link,
  Strikethrough,
  Underline,
  WholeWord,
} from "lucide-react";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { TextFormat } from "../model/types";
import styles from "./styles.module.scss";

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
  // Предотвращаем потерю фокуса contentEditable при клике по тулбару
  const preventFocusLoss = useCallback(
    (e: React.MouseEvent) => e.preventDefault(),
    [],
  );

  return (
    <div className={styles.toolbar} onMouseDown={preventFocusLoss}>
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
      <Toggle
        size={"lg"}
        pressed={false}
        onClick={(e) => {
          e.preventDefault();
          onLinkButtonClick();
        }}
      >
        <Link className="h-8 w-8" />
      </Toggle>
    </div>
  );
};
