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
  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | number>("");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  console.log(textData);
  const allText: ISelectOption = t(`${textData}`, { returnObjects: true });
  console.log(allText);
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleOptionsChange = (
    event:
      | React.MouseEvent<HTMLLIElement | EventTarget>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedValue =
      event.target instanceof HTMLLIElement
        ? (event.target as HTMLLIElement).getAttribute("data-value")
        : (event.target as HTMLInputElement).value;

    if (selectedValue) {
      const newOptions = selectedOptions.includes(selectedValue)
        ? selectedOptions.filter((value) => value !== selectedValue)
        : [...selectedOptions, selectedValue];
      setSelectedOptions(newOptions);
      onChange(type, newOptions as []);
    }
  };

  const handleOptionChange = (
    event: React.MouseEvent<HTMLLIElement | EventTarget>,
  ) => {
    const selectedValue = Number(
      (event.target as HTMLLIElement).getAttribute("data-value"),
    );
    setSelectedOption(selectedValue);
    onChange(type, selectedValue);
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
    <div className={isRow ? styles.wrapper__row : styles.wrapper} ref={menuRef}>
      <div className={styles.left}>
        <p>{t(allText.title)}</p>
        {allText.text && <InfoIcon />}
      </div>

      <div className={styles.menu}>
        <button
          type="button"
          onClick={handleButtonClick}
          className={isMenuOpen ? styles.active : ""}
        >
          <div>
            {single ? (
              <>
                {selectedOption === ""
                  ? t(allText.default_value)
                  : selectedOption}
              </>
            ) : (
              <>
                {selectedOptions.length === 0 ? (
                  t(allText.default_value)
                ) : (
                  <>
                    {t("add_platform.choosed")}: {selectedOptions.length} /{" "}
                    {options.length}
                  </>
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
                  {options.map((option) => (
                    <li
                      key={option.value}
                      onClick={handleOptionChange}
                      data-value={option.value}
                      className={
                        selectedOption == option.value ? styles.active : ""
                      }
                    >
                      {option.label}
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {options.map((option) => (
                    <li
                      key={option.value}
                      onClick={handleOptionsChange}
                      data-value={option.value}
                      className={
                        selectedOptions.includes(option.value)
                          ? styles.active
                          : ""
                      }
                    >
                      {option.label}
                      <input
                        type="checkbox"
                        value={option.value}
                        onChange={handleOptionsChange}
                        checked={selectedOptions.includes(option.value)}
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
