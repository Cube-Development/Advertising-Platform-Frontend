import { PLATFORM_PARAMETERS, channelParameterData } from "@entities/channel";
import { ArrowSmallVerticalIcon, InfoIcon } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import { IOption, ISelectOption } from "@shared/types";
import { FC, useEffect, useRef, useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface SelectOptionsProps {
  textData: string;
  options: IOption[];
  type: any;
  single: boolean;
  isRow?: boolean;
  isFilter?: boolean;
  isCatalog?: boolean;
  isCatalogSorting?: boolean;
  isCatalogPlatform?: boolean;
  onChange: UseFormSetValue<any>;
  getValues?: UseFormGetValues<any>;
  defaultValues?: IOption | number[];
  isPlatformFilter?: boolean;
  isDisabled?: boolean;
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
  isCatalogPlatform,
  getValues,
  defaultValues,
  isPlatformFilter,
  isDisabled,
}) => {
  const { t } = useTranslation();
  const allOptions: IOption[] = isFilter
    ? options?.map((option) => ({
        ...option,
        name: t(option?.name),
      }))
    : options;

  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(
    !single && defaultValues ? (defaultValues as unknown as number[]) : []
  );

  const [selectedOption, setSelectedOption] = useState<IOption | null>(
    isFilter
      ? allOptions[0]
      : single && defaultValues
        ? (defaultValues as unknown as IOption)
        : null
  );

  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [screen, setScreen] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const allText: ISelectOption = isFilter
    ? { title: t(textData) }
    : t(textData!, { returnObjects: true });

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleOptionsChange = (
    event:
      | React.MouseEvent<HTMLLIElement | EventTarget>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
    // console.log(event.target);
    const selectedValue = Number(
      event.target instanceof HTMLInputElement
        ? (event.target as HTMLInputElement).value
        : (event.target as HTMLLIElement).getAttribute("data-value")
    );
    // console.log("selectedValue", selectedValue);
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
    event: React.MouseEvent<HTMLLIElement | EventTarget>
  ) => {
    // console.log(event.target);
    event.stopPropagation();
    const selectedId = Number(
      (event.target as HTMLLIElement).getAttribute("data-value")
    );
    console.log(selectedId);
    const option: IOption = allOptions!.find(
      (option) => option?.id === selectedId
    )!;
    setSelectedOption(option);
    if (isCatalogPlatform) {
      const { filter } = getValues && getValues();
      const updatedFilter = {
        ...filter,
        [type]: selectedId,
      };
      onChange("filter", updatedFilter);
    } else {
      onChange(type, isCatalogSorting ? option?.type : selectedId);
    }
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

  useEffect(() => {
    if (single && !isFilter) {
      setSelectedOption(defaultValues as IOption);
    } else {
      setSelectedOptions(defaultValues as number[]);
    }
  }, [defaultValues]);

  return (
    <>
      <div
        className={`${isFilter ? styles.filter__wrapper : styles.parameters} ${isRow ? styles.wrapper__row : styles.wrapper}`}
      >
        {isFilter ? (
          screen >= BREAKPOINT.MD ? (
            <div className={styles.left}>
              <p>{allText?.title}:</p>
            </div>
          ) : (
            <></>
          )
        ) : (
          <div className={styles.left}>
            <p>{allText?.title}</p>
            {allText?.text && <InfoIcon />}
          </div>
        )}

        <div className={styles.menu} ref={menuRef}>
          <button
            type="button"
            onClick={handleButtonClick}
            className={`
          ${isFilter ? styles.filter : ""}  
        
          ${
            type === channelParameterData.category &&
            defaultValues &&
            isDisabled
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
                  {selectedOption?.img ? <selectedOption.img /> : ""}
                  {(!isFilter ||
                    screen >= BREAKPOINT.SM ||
                    !isPlatformFilter) && (
                    <span className="truncate">
                      {selectedOption
                        ? selectedOption?.name
                        : allText.default_value}
                    </span>
                  )}
                </div>
              ) : (
                <span>
                  {selectedOptions?.length ? (
                    <>
                      {t("add_platform.description.choosed")}:{" "}
                      {selectedOptions?.length} / {allOptions?.length}
                    </>
                  ) : (
                    allText?.default_value
                  )}
                </span>
              )}
              <div
                className={`w-[16px] h-[14px] ${isMenuOpen ? "rotate" : "rotate__down"}`}
              >
                <ArrowSmallVerticalIcon
                  className={
                    type === channelParameterData.category &&
                    defaultValues &&
                    isDisabled
                      ? "icon__grey"
                      : (isMenuOpen ||
                            selectedOption ||
                            selectedOptions?.length) &&
                          !isFilter
                        ? "active__icon"
                        : "icon__grey"
                  }
                />
              </div>
            </div>
          </button>

          {isMenuOpen && (
            <div className={`${styles.options} show`}>
              <ul
                className={
                  allOptions.length > PLATFORM_PARAMETERS.scrollAddLen
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
                        className={`${isFilter ? styles.filter : ""} ${selectedOption?.id === option?.id ? styles.active : ""} truncate`}
                      >
                        {option?.img ? <option.img /> : null}
                        {screen >= BREAKPOINT.SM || !isPlatformFilter ? (
                          <span
                            onClick={handleOptionChange}
                            data-value={option?.id}
                            className="truncate"
                          >
                            {option?.name}
                          </span>
                        ) : (
                          ""
                        )}
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
                        <span
                          onClick={handleOptionsChange}
                          data-value={option?.id}
                        >
                          {option?.name}
                        </span>
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
      {/* <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select> */}
      {/* <div
        className={`${isFilter ? styles.filter__wrapper : styles.parameters} ${isRow ? styles.wrapper__row : styles.wrapper}`}
      >
        {isFilter ? (
          screen >= BREAKPOINT.MD ? (
            <div className={styles.left}>
              <p>{allText?.title}:</p>
            </div>
          ) : (
            <></>
          )
        ) : (
          <div className={styles.left}>
            <p>{allText?.title}</p>
            {allText?.text && <InfoIcon />}
          </div>
        )}
        <div className="p-4 max-w-xl">
          <MultiSelect
            options={frameworksList}
            onValueChange={setSelectedFrameworks}
            defaultValue={selectedFrameworks}
            placeholder="Select frameworks"
            variant="inverted"
            animation={2}
            // maxCount={frameworksList.length}
            maxCount={1}
          />
        </div>
      </div> */}
      {/* <div
        className={`${isFilter ? styles.filter__wrapper : styles.parameters} ${isRow ? styles.wrapper__row : styles.wrapper}`}
      >
        {isFilter ? (
          screen >= BREAKPOINT.MD ? (
            <div className={styles.left}>
              <p>{allText?.title}:</p>
            </div>
          ) : (
            <></>
          )
        ) : (
          <div className={styles.left}>
            <p>{allText?.title}</p>
            {allText?.text && <InfoIcon />}
          </div>
        )}
        <MultiSelectSecond FRAMEWORKS={frameworksList}/>
      </div> */}
    </>
  );
};
