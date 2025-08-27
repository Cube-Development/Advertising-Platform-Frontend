import { FC } from "react";
import { IMenuItem } from "../../header/model";
import { cn, Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface IMenuItemProps {
  item: IMenuItem;
  onOpenDropdownMenu: (title: string) => void;
  isActive?: boolean;
}

export const MenuItem: FC<IMenuItemProps> = ({
  item,
  onOpenDropdownMenu,
  isActive,
}) => {
  const { t } = useTranslation();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {item.item.openMenu ? (
          <div
            className={cn(
              `flex flex-col items-center justify-center w-[60px] h-[60px] rounded-full cursor-pointer hover:bg-accent`,
              isActive &&
                "[background:var(--primary-gradient)]   text-white icon__white",
            )}
            onClick={() => onOpenDropdownMenu(item.item.title!)}
          >
            {item.item.img && <item.item.img />}
          </div>
        ) : (
          <Link to={item.item.path!}>
            <div
              className={cn(
                `flex flex-col items-center justify-center w-[60px] h-[60px] rounded-full cursor-pointer hover:bg-accent`,
                isActive &&
                  "[background:var(--primary-gradient)]  text-white icon__white",
              )}
            >
              {item.item.img && <item.item.img />}
            </div>
          </Link>
        )}
      </TooltipTrigger>
      <TooltipContent side="right" className="!p-0">
        <div className="grid font-medium">
          <div className="p-2 text-sm text-center">
            <p className="gradient_color">{t(item.item.title || "")}</p>
          </div>
          {item.subItems && (
            <ul className="grid ">
              {item.subItems.map((page, index) => (
                <Link
                  to={page.path!}
                  key={index}
                  className="px-4 py-2 text-xs cursor-pointer hover:bg-accent"
                >
                  <li>{t(page.title || "")}</li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
