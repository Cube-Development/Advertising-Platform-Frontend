import { RECIPIENT_TYPE } from "@entities/communication";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  cn,
} from "@shared/ui";
import { Download, MoreVertical } from "lucide-react";
import { FC } from "react";

interface MessageActionMenuProps {
  onDownload: () => void;
  recipient: string;
}

export const MessageActionMenu: FC<MessageActionMenuProps> = ({
  onDownload,
  recipient,
}) => {
  return (
    <div className="absolute z-20 top-2 right-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full hover:bg-gray-600/15"
          >
            <MoreVertical
              className={cn(
                "w-5 h-5",
                recipient === RECIPIENT_TYPE.SENDER
                  ? "text-white"
                  : "text-gray-400",
              )}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-md bg-card border border-gray-200"
        >
          <DropdownMenuItem onClick={onDownload} className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            <span>Download</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
