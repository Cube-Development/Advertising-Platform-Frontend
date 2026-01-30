import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
} from "@shared/ui";
import { Download, MoreVertical } from "lucide-react";
import { FC } from "react";

interface MessageActionMenuProps {
  onDownload: () => void;
}

export const MessageActionMenu: FC<MessageActionMenuProps> = ({
  onDownload,
}) => {
  return (
    <div className="absolute z-20 top-2 right-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-white rounded-full hover:bg-black/10"
          >
            <MoreVertical className="w-5 h-5 text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-md bg-card">
          <DropdownMenuItem onClick={onDownload} className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            <span>Download</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
