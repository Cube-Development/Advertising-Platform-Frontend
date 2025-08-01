import { MultiSelect, MultiSelectProps } from "@shared/ui";
import { FC } from "react";
import { DOCUMENT_OPTIONS, IDocumentTab } from "../model";
import { LucideIcon } from "lucide-react";

interface IDocumentFilterProps {
  title: string;
  icon: LucideIcon;
  baseList: IDocumentTab[];
  onChange?: (item: IDocumentTab) => void;
  defaultValue?: number;
}

export const DocumentFilter: FC<IDocumentFilterProps> = ({
  title,
  icon: Icon,
  baseList,
  onChange = () => {},
  defaultValue = -1,
}) => {
  const options = DOCUMENT_OPTIONS({ LIST: baseList });

  const handleValueChange = (value: number[]) => {
    const item = baseList[value[0]];
    onChange(item);
  };

  return (
    <div className="grid grid-flow-row gap-2">
      <div className="flex items-center justify-center gap-2">
        <Icon size={20} className="text-[var(--Personal-colors-main)]" />
        <span className="font-semibold gradient_color">{title}</span>
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
