import { IOption } from "@shared/types/common";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ArrowSmallVerticalIcon, InfoIcon } from "@shared/assets";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { SELECTOPTIONS } from "@shared/config/common";
import { ISelectOption } from "@shared/types/translate";
import { platformData } from "@shared/config/platformData";

interface SelectOptionsProps {
  textData: string;
  options: IOption[];
  // type: keyof IAddPLatformData;
  // onChange: UseFormSetValue<IAddPLatformData>;
  type: any;
  onChange: UseFormSetValue<any>;
  single: boolean;
  isRow?: boolean;
  isFilter?: boolean;
  isCatalog?: boolean;
  isCatalogSorting?: boolean;
  getValues?: UseFormGetValues<any>;
  defaultValues?: IOption | number[];
}

export const SelectOptions: FC<SelectOptionsProps> = ({
  options,
  type,
  onChange,
  single,
  isRow,
  textData,
  isFilter,
  isCatalog,
  isCatalogSorting,
  getValues,
  defaultValues,
}) => {
  const { t } = useTranslation();
  const allOptions: IOption[] = isFilter
    ? options?.map((option) => ({
        ...option,
        name: t(option?.name),
      }))
    : options;

  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(
    !single && defaultValues ? (defaultValues as unknown as number[]) : [],
  );
  const [selectedOption, setSelectedOption] = useState<IOption | null>(
    isFilter
      ? allOptions[0]
      : single && defaultValues
        ? (defaultValues as unknown as IOption)
        : null,
  );

  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const allText: ISelectOption = isFilter
    ? { title: t(textData) }
    : t(textData!, { returnObjects: true });

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleOptionsChange = (
    event:
      | React.MouseEvent<HTMLLIElement | EventTarget>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedValue = Number(
      event.target instanceof HTMLLIElement
        ? (event.target as HTMLLIElement).getAttribute("data-value")
        : (event.target as HTMLInputElement).value,
    );
    const newOptions = selectedOptions.includes(selectedValue)
      ? selectedOptions.filter((value) => value !== selectedValue)
      : [...selectedOptions, selectedValue];
    setSelectedOptions(newOptions);
    if (isCatalog) {
      const { filter } = isCatalog && getValues && getValues();
      const updatedFilter = {
        ...filter,
        [type]: newOptions,
      };
      onChange("filter", updatedFilter);
    } else {
      onChange(type, newOptions as []);
    }
  };

  const handleOptionChange = (
    event: React.MouseEvent<HTMLLIElement | EventTarget>,
  ) => {
    const selectedId = Number(
      (event.target as HTMLLIElement).getAttribute("data-value"),
    );
    const option: IOption = allOptions!.find(
      (option) => option?.id === selectedId,
    )!;
    setSelectedOption(option);
    onChange(type, isCatalogSorting ? option?.type : selectedId);
    closeMenu();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeMenu();
    }
  };

  const handleButtonClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${isFilter ? styles.filter__wrapper : styles.parameters} ${isRow ? styles.wrapper__row : styles.wrapper}`}
    >
      <div className={styles.left}>
        {isFilter ? (
          <>
            <p>{allText?.title}:</p>
          </>
        ) : (
          <>
            <p>{allText?.title}</p>
            {allText?.text && <InfoIcon />}
          </>
        )}
      </div>

      <div className={styles.menu} ref={menuRef}>
        <button
          type="button"
          onClick={handleButtonClick}
          className={`
          ${isFilter ? styles.filter : ""}  
          
          ${
            type === platformData.category && defaultValues
              ? styles.disabled__menu
              : isMenuOpen || selectedOption || selectedOptions?.length
                ? styles.active
                : ""
          }
          `}
        >
          <div>
            {single ? (
              <div className={styles.filter}>
                {selectedOption?.img ? <selectedOption.img /> : null}
                <span>
                  {selectedOption
                    ? selectedOption?.name
                    : allText.default_value}
                </span>
              </div>
            ) : (
              <span>
                {selectedOptions?.length ? (
                  <>
                    {t("add_platform.choosed")}: {selectedOptions?.length} /{" "}
                    {allOptions?.length}
                  </>
                ) : (
                  allText?.default_value
                )}
              </span>
            )}
            <div className={isMenuOpen ? "rotate" : "rotate__down"}>
              <ArrowSmallVerticalIcon
                className={
                  type === platformData.category && defaultValues
                    ? "default__icon__grey"
                    : (isMenuOpen ||
                          selectedOption ||
                          selectedOptions?.length) &&
                        !isFilter
                      ? "active__icon"
                      : "default__icon__grey"
                }
              />
            </div>
          </div>
        </button>

        {isMenuOpen && (
          <div className={`${styles.options} show`}>
            <ul
              className={
                allOptions.length > SELECTOPTIONS.scrollAddLen
                  ? styles.scroll
                  : ""
              }
            >
              {single ? (
                <>
                  {allOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={handleOptionChange}
                      data-value={option?.id}
                      className={`${isFilter ? styles.filter : ""} ${selectedOption?.id === option?.id ? styles.active : ""}`}
                    >
                      {option?.img ? <option.img /> : null}
                      {option?.name}
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {allOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={handleOptionsChange}
                      data-value={option?.id}
                      className={
                        selectedOptions.includes(option?.id)
                          ? styles.active
                          : ""
                      }
                    >
                      {option?.name}
                      <input
                        type="checkbox"
                        value={option?.id}
                        onChange={handleOptionsChange}
                        checked={selectedOptions.includes(option?.id)}
                      />
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
