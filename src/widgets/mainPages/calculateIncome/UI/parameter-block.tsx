import { MultiSelect, MultiSelectProps } from "@shared/ui";
import { FC } from "react";
import { IParameterOption } from "../model";

interface IParameterBlockProps
  extends Pick<MultiSelectProps, "options" | "defaultValue"> {
  title: string;
  onChange: (value: IParameterOption) => void;
}

export const ParameterBlock: FC<IParameterBlockProps> = ({
  title,
  onChange,
  ...props
}) => {
  const handleChangeValue = (value: number[]) => {
    const new_value = props.options.find((item) => item.id === value[0])!;
    onChange(new_value as IParameterOption);
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-orange-500 lg:text-sm">
        {title}
      </label>
      <MultiSelect
        {...props}
        onValueChange={handleChangeValue}
        showButtonClear={false}
        showCheckBox={false}
        single={true}
      />
    </div>
  );
};
