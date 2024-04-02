import { IAddPLatformData, IOption } from "@shared/types/common";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ArrowIcon, InfoIcon } from "@shared/assets";
import { UseFormSetValue } from "react-hook-form";
import { SELECTOPTIONS } from "@shared/config/common";
import { ISelectOption } from "@shared/types/translate";

interface SelectOptionsProps {
  textData: string;
  options: IOption[];
  type: keyof IAddPLatformData;
  onChange: UseFormSetValue<IAddPLatformData>;
  single: boolean;
  isRow?: boolean;
}

export const SelectOptions: FC<SelectOptionsProps> = ({
  options,
  type,
  onChange,
  single,
  isRow,
  textData,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>([]);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const allText: ISelectOption = t(textData, { returnObjects: true });
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
    onChange(type, newOptions as []);
  };

  const handleOptionChange = (
    event: React.MouseEvent<HTMLLIElement | EventTarget>,
  ) => {
    const selectedId = Number(
      (event.target as HTMLLIElement).getAttribute("data-value"),
    );

    const option: IOption = options.find((option) => option.id === selectedId)!;
    setSelectedOption(option);
    onChange(type, selectedId);
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
    <div className={isRow ? styles.wrapper__row : styles.wrapper}>
      <div className={styles.left}>
        <p>{allText.title}</p>
        {allText.text && <InfoIcon />}
      </div>

      <div className={styles.menu} ref={menuRef}>
        <button
          type="button"
          onClick={handleButtonClick}
          className={
            isMenuOpen || selectedOption || selectedOptions.length
              ? styles.active
              : ""
          }
        >
          <div>
            {single ? (
              <>
                {selectedOption ? selectedOption.name : allText.default_value}
              </>
            ) : (
              <>
                {selectedOptions.length ? (
                  <>
                    {t("add_platform.choosed")}: {selectedOptions.length} /{" "}
                    {options.length}
                  </>
                ) : (
                  allText.default_value
                )}
              </>
            )}
            <ArrowIcon />
          </div>
        </button>

        {isMenuOpen && (
          <div className={styles.options}>
            <ul
              className={
                options.length > SELECTOPTIONS.scrollAddLen ? styles.scroll : ""
              }
            >
              {single ? (
                <>
                  {options.map((option, index) => (
                    <li
                      key={index}
                      onClick={handleOptionChange}
                      data-value={option.id}
                      className={
                        selectedOption?.id === option.id ? styles.active : ""
                      }
                    >
                      {option.name}
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {options.map((option, index) => (
                    <li
                      key={index}
                      onClick={handleOptionsChange}
                      data-value={option.id}
                      className={
                        selectedOptions.includes(option.id) ? styles.active : ""
                      }
                    >
                      {option.name}
                      <input
                        type="checkbox"
                        value={option.id}
                        onChange={handleOptionsChange}
                        checked={selectedOptions.includes(option.id)}
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
