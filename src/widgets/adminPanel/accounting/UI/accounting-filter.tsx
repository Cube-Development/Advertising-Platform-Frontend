import { ACCOUNTING_OPTIONS, IAccountingTab } from "@entities/admin";
import { MultiSelect } from "@shared/ui";
import { LucideIcon } from "lucide-react";
import { FC } from "react";

interface IAccountingFilterProps {
  title: string;
  icon: LucideIcon;
  baseList: IAccountingTab[];
  onChange?: (item: IAccountingTab) => void;
  defaultValue?: number;
}

export const AccountingFilter: FC<IAccountingFilterProps> = ({
  title,
  icon: Icon,
  baseList,
  onChange = () => {},
  defaultValue = -1,
}) => {
  const options = ACCOUNTING_OPTIONS({ LIST: baseList });

  const handleValueChange = (value: number[]) => {
    const item = baseList[value[0]];
    onChange(item);
  };

  return (
    <div className="grid grid-flow-row gap-2">
      <div className="flex items-center gap-2 md:justify-center ">
        <Icon size={20} className="text-[var(--Personal-colors-main)]" />
        <span className="font-semibold truncate gradient_color">{title}</span>
      </div>
      <MultiSelect
        options={options}
        onValueChange={handleValueChange}
        defaultValue={defaultValue !== -1 ? [defaultValue] : [options[0]?.id]}
        showCheckBox={false}
        showButtonClear={false}
        single
        className="!p-2 "
      />
    </div>
  );
};
