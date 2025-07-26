import { cn } from "@shared/ui";
import { LucideIcon } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ITabItemProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
}

export const TabItem: FC<ITabItemProps> = ({
  label,
  icon: Icon,
  onClick,
  isActive = false,
}) => {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
        isActive
          ? "border-[#4d37b3] text-[#4d37b3]"
          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
      }`}
    >
      <div className="grid items-center grid-cols-[max-content,1fr] gap-3">
        <RoundCheckbox checked={isActive} />
        <div className="grid grid-cols-[1fr,max-content] gap-2">
          <span className="text-sm font-medium text-start">{t(label)}</span>
          <Icon size={20} />
        </div>
      </div>
    </button>
  );
};

const RoundCheckbox: FC<{
  checked: boolean;
}> = ({ checked }) => {
  return (
    <div
      className={`w-4 h-4 rounded-full border-2 transition-all duration-200 grid items-center justify-center ${
        checked ? " border-[#4d37b3] bg-[#4d37b3]" : "border-gray-300 "
      }`}
    >
      <div
        className={cn("w-2 h-2 m-auto bg-white rounded-full", checked && "")}
      ></div>
    </div>
  );
};
