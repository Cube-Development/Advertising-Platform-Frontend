import { useAppSelector } from "@shared/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  MyButton,
} from "@shared/ui";
import { PlusIcon, X } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { WALLET_USER_MENU } from "../model";

export const Wallet: FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const { balance } = useAppSelector((state) => state.wallet);

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>
        <MyButton
          className="px-2.5 w-[250px] ease-out transition-colors"
          buttons_type={isMenuOpen ? "button__white" : "button__blue"}
        >
          <p className="truncate">{Math.floor(balance).toLocaleString()}</p>
          <span>{t("symbol")}</span>
          <div className="flex-shrink-0">
            <div
              className={`
              flex items-center justify-center w-7 h-7 rounded-full 
              transition-all duration-300 ease-out transform
              ${
                isMenuOpen
                  ? "bg-red-500 hover:bg-red-600 shadow-lg rotate-180"
                  : "bg-green-500 hover:bg-green-600 shadow-md hover:scale-110 rotate-0"
              }
            `}
            >
              {isMenuOpen ? (
                <X size={16} className="text-white stroke-[2.5]" />
              ) : (
                <PlusIcon size={16} className="text-white stroke-[2.5]" />
              )}
            </div>
          </div>
        </MyButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="!p-0 !rounded-[12px] frame w-[250px]"
        align="end"
      >
        <DropdownMenuGroup>
          {WALLET_USER_MENU.map((item) => (
            <DropdownMenuItem
              key={item.item.title}
              className="px-3 py-2 cursor-pointer"
              asChild
            >
              <Link
                to={item?.item?.path || ""}
                className="flex items-center gap-2"
              >
                {item.item.icon && <item.item.icon size={16} />}
                <span>{t(item?.item?.title || "")}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
