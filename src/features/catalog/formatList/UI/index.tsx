import { platformTypesNum } from "@entities/platform";
import { IFormatListProps } from "@entities/project";
import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import { MultiSelect } from "@shared/ui";
import { FC, useMemo } from "react";
import styles from "./styles.module.scss";

export const FormatList: FC<IFormatListProps> = ({
  changeFormat,
  card,
  selectedFormat,
  isSmall,
  isBig,
  isSmallCatalogCard,
}) => {
  const screen = useWindowWidth();

  const isMultiple = useMemo(() => {
    if (
      Array.isArray(selectedFormat) ||
      card?.platform === platformTypesNum.site
    ) {
      return true;
    } else {
      return false;
    }
  }, [selectedFormat, card]);

  const options = useMemo(() => {
    if ((screen > BREAKPOINT.SM && !isSmall) || isBig) {
      return card?.format?.map((format) => ({
        name: format?.format_name?.big,
        id: format?.format,
      }));
    } else {
      return card?.format?.map((format) => ({
        name: format?.format_name?.small,
        id: format?.format,
      }));
    }
  }, [screen, card?.format]);

  const defaultValue = useMemo(() => {
    if (isMultiple) {
      // selectedFormat может быть массивом объектов
      const selectedIds = Array.isArray(card?.selected_format)
        ? card?.selected_format?.map((format) => format?.format)
        : [card?.selected_format?.format];

      return options
        ?.filter((option) => selectedIds.includes(option.id))
        ?.map((option) => option.id); // возвращаем массив id
    }

    // isMultiple === false → одиночный выбор
    return [
      options?.find((option) => option.id === selectedFormat?.format)?.id,
    ];
  }, [options, selectedFormat?.format, isMultiple]);

  const handleMultiOptionsChange = (values: number[]) => {
    if (isMultiple) {
      const selectedFormat = card?.format?.filter((format) =>
        values.includes(format.format),
      );
      console.log("selectedFormat", selectedFormat);

      changeFormat(selectedFormat as any);
      return;
    }
    const selectedFormat = card?.format?.find(
      (format) => format.format === values[0],
    );
    if (selectedFormat) changeFormat(selectedFormat);
  };

  return (
    <MultiSelect
      options={options || []}
      onValueChange={handleMultiOptionsChange}
      defaultValue={defaultValue}
      single={!isMultiple}
      placeholder={isMultiple ? options?.[0]?.name : ""}
      // placeholder={allText?.default_value}
      // disabled={disabled}
      // single={single}
      showButtonClear={isMultiple}
      // showListClear={showListClear}
      showCheckBox={isMultiple}
      className={styles.multiselect}
      matchAnchorWidth={false}
      alignContent={isSmallCatalogCard ? "end" : "start"}
    />
  );
};
