import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import { IOption } from "@shared/types";
import { MultiSelect, MultiSelectProps } from "@shared/ui";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface SelectFilterProps extends MultiSelectProps {
  textData: string;
  options: IOption[];
  type: any;
  isRow?: boolean;
  isFilter?: boolean;
  isCatalog?: boolean;
  isCatalogSorting?: boolean;
  isCatalogPlatform?: boolean;
  onChangeOption: UseFormSetValue<any>;
  formState: any;
  // defaultValue?: IOption | number[];
  isPlatformFilter?: boolean;
  isDisabled?: boolean;
}

export const SelectFilter: FC<SelectFilterProps> = ({
  options,
  type,
  onChangeOption,
  single = false,
  showButtonClear = true,
  showListClear = true,
  showCheckBox = true,
  isRow,
  textData,
  isFilter,
  isCatalog,
  // isCatalogSorting,
  // isCatalogPlatform,
  formState,
  defaultValue,
  // isPlatformFilter,
  isDisabled = false,
}) => {
  const { t } = useTranslation();
  // const allOptions: IOption[] = isFilter
  //   ? options?.map((option) => ({
  //       ...option,
  //       name: t(option?.name),
  //     }))
  //   : options;

  // const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(
  //   !single && defaultValue ? (defaultValue as unknown as number[]) : [],
  // );

  // console.log("selectedOptions", selectedOptions);

  // const [selectedOption, setSelectedOption] = useState<IOption | null>(
  //   isFilter
  //     ? allOptions[0]
  //     : single && defaultValue
  //       ? (defaultValue as unknown as IOption)
  //       : null,
  // );

  // const [isMenuOpen, setMenuOpen] = useState(false);
  // const menuRef = useRef<HTMLDivElement>(null);
  const screen = useWindowWidth();

  const allText = { title: t(textData) };
  // : (t(textData!, { returnObjects: true }) as ISelectOption);
  // console.log("allText", allText);
  // const closeMenu = () => {
  //   setMenuOpen(false);
  // };

  const handleMultiOptionsChange = (newOptions: (number | null)[]) => {
    if (isCatalog || isFilter) {
      console.log("newOptions", newOptions);
      const updatedFilter = {
        ...formState?.filter,
        [type]: single ? newOptions[0] : newOptions,
      };
      onChangeOption("filter", updatedFilter);
    } else {
      onChangeOption(type, single ? newOptions[0] : newOptions);
    }
  };

  // const handleOptionsChange = (
  //   event:
  //     | React.MouseEvent<HTMLLIElement | EventTarget>
  //     | React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   event.stopPropagation();
  //   // console.log(event.target);
  //   const selectedValue = Number(
  //     event.target instanceof HTMLInputElement
  //       ? (event.target as HTMLInputElement).value
  //       : (event.target as HTMLLIElement).getAttribute("data-value"),
  //   );
  //   // console.log("selectedValue", selectedValue);
  //   const newOptions = selectedOptions.includes(selectedValue)
  //     ? selectedOptions.filter((value) => value !== selectedValue)
  //     : [...selectedOptions, selectedValue];
  //   setSelectedOptions(newOptions);
  //   if (isCatalog) {
  //     const updatedFilter = {
  //       ...formState?.filter,
  //       [type]: newOptions,
  //     };
  //     onChangeOption("filter", updatedFilter);
  //   } else {
  //     onChangeOption(type, newOptions as []);
  //   }
  // };

  // const handleOptionChange = (
  //   event: React.MouseEvent<HTMLLIElement | EventTarget>,
  // ) => {
  //   // console.log(event.target);
  //   event.stopPropagation();
  //   const selectedId = Number(
  //     (event.target as HTMLLIElement).getAttribute("data-value"),
  //   );
  //   console.log(selectedId);
  //   const option: IOption = allOptions!.find(
  //     (option) => option?.id === selectedId,
  //   )!;
  //   setSelectedOption(option);
  //   if (isCatalogPlatform) {
  //     const updatedFilter = {
  //       ...formState?.filter,
  //       [type]: selectedId,
  //     };
  //     onChangeOption("filter", updatedFilter);
  //   } else {
  //     onChangeOption(type, isCatalogSorting ? option?.type : selectedId);
  //   }
  //   closeMenu();
  // };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //     closeMenu();
  //   }
  // };

  // const handleButtonClick = () => {
  //   setMenuOpen(!isMenuOpen);
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (single && !isFilter) {
  //     setSelectedOption(defaultValue as IOption);
  //   } else {
  //     setSelectedOptions(defaultValue as number[]);
  //   }
  // }, [defaultValue]);
  // console.log("type", type, defaultValue, selectedOptions);
  return (
    <>
      <div
        // className={`${isFilter ? styles.filter__wrapper : styles.parameters} ${isRow ? styles.wrapper__row : styles.wrapper}`}
        className={`${styles.filter__wrapper} ${isRow ? styles.wrapper__row : styles.wrapper}`}
      >
        {screen >= BREAKPOINT.MD ? (
          <div className={styles.left}>
            <p>{allText?.title}:</p>
          </div>
        ) : (
          <></>
        )}
        {/* {isFilter ? (
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
            {allText?.text && <InfoTooltip text={allText?.text} />}
          </div>
        )} */}

        {/* <div className={styles.menu} ref={menuRef}>
          <button
            type="button"
            onClick={handleButtonClick}
            className={`
          ${isFilter ? styles.filter : ""}  
        
          ${
            type === channelParameterData.category && defaultValue && isDisabled
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
                    defaultValue &&
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
        </div> */}
      </div>
      <MultiSelect
        options={options}
        onValueChange={handleMultiOptionsChange}
        defaultValue={defaultValue}
        // placeholder={allText?.default_value}
        disabled={isDisabled}
        single={single}
        showButtonClear={showButtonClear}
        showListClear={showListClear}
        showCheckBox={showCheckBox}
        className="p-2"
      />
    </>
  );
};
