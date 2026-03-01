import { IOption } from "@shared/types";
import { ChevronDown, XIcon } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { CustomCheckbox } from "../customCheckbox";
import {
  cn,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Separator,
} from "../shadcn-ui";
import styles from "./styles.module.scss";

export interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: IOption[];
  onValueChange?: (value: any[]) => void;
  defaultValue?: any;
  placeholder?: string;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
  single?: boolean;
  showButtonClear?: boolean;
  showListClear?: boolean;
  showCheckBox?: boolean;
  searchable?: boolean;
  hideText?: boolean;
  hideButtons?: boolean;
  alignContent?: "start" | "center" | "end";
  matchAnchorWidth?: boolean;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      onValueChange = () => {},
      defaultValue = [],
      placeholder: pl,
      modalPopover = false,
      asChild = false,
      className = "",
      single = false,
      showButtonClear = true,
      showListClear = true,
      showCheckBox = true,
      searchable = false,
      hideText = false,
      hideButtons = true,
      alignContent = "start",
      matchAnchorWidth = true,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const placeholder = pl ? pl : t("components.select.placeholder");
    const [selectedValues, setSelectedValues] =
      React.useState<number[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    React.useEffect(() => {
      setSelectedValues(defaultValue);
    }, [defaultValue]);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      event.stopPropagation();
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: number) => {
      if (single) {
        setSelectedValues([option]);
        onValueChange([option]);
        setIsPopoverOpen(false);
      } else {
        const newSelectedValues = selectedValues?.includes(option)
          ? selectedValues.filter((value) => value !== option)
          : [...selectedValues, option];
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = (event: React.MouseEvent) => {
      event.stopPropagation();
      setIsPopoverOpen((prev) => !prev);
    };

    const toggleAll = () => {
      if (selectedValues?.length === options?.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option?.id);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <button
            ref={ref}
            {...props}
            type="button"
            onClick={handleTogglePopover}
            className={cn(
              "px-[16px] py-[10px] md:px-[30px] md:py-[10px] rounded-[12px] border  bg-[var(--Personal-colors-White)]  disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:opacity-50",
              styles.wrapper,
              className,
              isPopoverOpen ? styles.open : "",
            )}
          >
            {selectedValues?.length > 0 ? (
              <div className={styles.filter}>
                <div className={styles.text}>
                  {single ? (
                    (() => {
                      const singleOption = options?.find(
                        (option) => option?.id === selectedValues[0],
                      );
                      return (
                        <div className={styles.filter}>
                          {singleOption?.img && (
                            <singleOption.img className="w-4 h-4 text-gray-400" />
                          )}
                          {!hideText && (
                            <span className="truncate">
                              {singleOption?.name}
                            </span>
                          )}
                        </div>
                      );
                    })()
                  ) : (
                    <>
                      {t("components.select.chosen")}: {selectedValues?.length}{" "}
                      / {options?.length}
                    </>
                  )}
                </div>
                <div className={styles.icons}>
                  {showButtonClear && (
                    <>
                      <XIcon
                        size={16}
                        className={cn(
                          "cursor-pointer text-muted-foreground",
                          isPopoverOpen ? "rotate" : "rotate__down",
                        )}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClear();
                        }}
                      />
                      <Separator
                        orientation="vertical"
                        className="flex h-full min-h-4"
                      />
                    </>
                  )}
                  <ChevronDown
                    size={16}
                    className={cn(
                      `cursor-pointer text-muted-foreground`,
                      isPopoverOpen ? "rotate" : "rotate__down",
                    )}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.filter}>
                <span className={styles.text}>{placeholder}</span>
                <ChevronDown
                  size={16}
                  className={cn(
                    `cursor-pointer text-muted-foreground`,
                    isPopoverOpen ? "rotate" : "rotate__down",
                  )}
                />
              </div>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          avoidCollisions={false}
          className={cn(
            matchAnchorWidth && "w-[var(--radix-popper-anchor-width)]",
            " p-0 ",
          )}
          align={alignContent}
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            {searchable && (
              <CommandInput
                placeholder={t("components.select.search")}
                onKeyDown={handleInputKeyDown}
              />
            )}
            <CommandList
              className="max-h-[none] overflow-visible"
              onClick={(e) => e.stopPropagation()}
            >
              <ScrollArea
                className={cn(options?.length > 5 && "h-[30svh] max-h-[200px]")}
              >
                <CommandEmpty>{t("components.select.not_found")}</CommandEmpty>
                <CommandGroup
                  className={cn(
                    matchAnchorWidth && "w-[var(--radix-popper-anchor-width)]",
                    "gap-1 ",
                  )}
                >
                  {!single && (
                    <CommandItem
                      key="all"
                      onSelect={toggleAll}
                      style={{ all: "unset" }}
                    >
                      <div className={styles.item}>
                        <CustomCheckbox
                          isSelected={selectedValues.length === options.length}
                        />
                        <span>{t("components.select.select_all")}</span>
                      </div>
                    </CommandItem>
                  )}
                  {options.map((option) => {
                    const isSelected = selectedValues?.includes(option?.id);
                    return (
                      <CommandItem
                        key={option?.id}
                        onSelect={() => toggleOption(option?.id)}
                        style={{ all: "unset" }}
                      >
                        <div className={styles.item}>
                          {showCheckBox && (
                            <CustomCheckbox isSelected={isSelected} />
                          )}
                          {option?.img && (
                            <option.img className="w-4 h-4 text-gray-400" />
                          )}
                          {!hideText && (
                            <span className="truncate">{option?.name}</span>
                          )}
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </ScrollArea>
              {!hideButtons && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <div className="flex items-center justify-between">
                      {selectedValues.length > 0 && showListClear && (
                        <>
                          <CommandItem
                            onSelect={handleClear}
                            className="justify-center flex-1 cursor-pointer"
                          >
                            {t("components.select.clear")}
                          </CommandItem>
                          <Separator
                            orientation="vertical"
                            className="flex h-full min-h-6"
                          />
                        </>
                      )}
                      <CommandItem
                        onSelect={() => setIsPopoverOpen(false)}
                        className="justify-center flex-1 max-w-full cursor-pointer"
                      >
                        {t("components.select.close")}
                      </CommandItem>
                    </div>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

MultiSelect.displayName = "MultiSelect";
