import { IOption } from "@shared/types";
import { CheckIcon, ChevronDown, XIcon } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import {
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
import { cn } from "../shadcn-ui/lib/utils";
import styles from "./styles.module.scss";
import { CustomCheckbox } from "../customCheckbox";

export interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
      placeholder = "components.select.placeholder",
      modalPopover = false,
      asChild = false,
      className = "",
      single = false,
      showButtonClear = true,
      showListClear = true,
      showCheckBox = true,
      searchable = false,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const [selectedValues, setSelectedValues] =
      React.useState<number[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    React.useEffect(() => {
      setSelectedValues(defaultValue);
    }, [defaultValue]);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
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
        const newSelectedValues = selectedValues.includes(option)
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

    const handleTogglePopover = () => {
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
            className={`${styles.wrapper} ${className} ${isPopoverOpen ? styles.open : ""}`}
          >
            {selectedValues?.length > 0 ? (
              <div className={styles.filter}>
                <span className={styles.text}>
                  {single ? (
                    (() => {
                      const singleOption = options?.find(
                        (option) => option?.id === selectedValues[0],
                      );

                      return (
                        <div className={styles.filter}>
                          {singleOption?.img && (
                            <singleOption.img className="h-4 w-4" />
                          )}
                          {singleOption?.name}
                        </div>
                      );
                    })()
                  ) : (
                    <>
                      {t("components.select.chosen")}: {selectedValues?.length}{" "}
                      / {options?.length}
                    </>
                  )}
                </span>
                <div className={styles.icons}>
                  {showButtonClear && (
                    <>
                      <XIcon
                        className={`h-4 cursor-pointer text-muted-foreground  ${isPopoverOpen ? "rotate" : "rotate__down"}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClear();
                        }}
                      />
                      <Separator
                        orientation="vertical"
                        className="flex min-h-4 h-full"
                      />
                    </>
                  )}
                  <ChevronDown
                    className={`h-4 cursor-pointer text-muted-foreground  ${isPopoverOpen ? "rotate" : "rotate__down"}`}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.filter}>
                <span className={styles.text}>{placeholder}</span>
                <ChevronDown
                  className={`h-4 cursor-pointer text-muted-foreground ${isPopoverOpen ? "rotate" : "rotate__down"}`}
                />
              </div>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            {searchable && (
              <CommandInput
                placeholder={t("components.select.search")}
                onKeyDown={handleInputKeyDown}
              />
            )}
            <CommandList className="max-h-[none] overflow-visible">
              <ScrollArea className="h-[200px]">
                <CommandEmpty>{t("components.select.not_found")}</CommandEmpty>
                <CommandGroup className="w-[var(--radix-popper-anchor-width)] gap-1">
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
                    const isSelected = selectedValues.includes(option?.id);
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
                          {option?.img && <option.img className="h-4 w-4" />}
                          <span className="truncate">{option?.name}</span>
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </ScrollArea>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  {selectedValues.length > 0 && showListClear && (
                    <>
                      <CommandItem
                        onSelect={handleClear}
                        className="flex-1 justify-center cursor-pointer"
                      >
                        {t("components.select.clear")}
                      </CommandItem>
                      <Separator
                        orientation="vertical"
                        className="flex min-h-6 h-full"
                      />
                    </>
                  )}
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    className="flex-1 justify-center cursor-pointer max-w-full"
                  >
                    {t("components.select.close")}
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

MultiSelect.displayName = "MultiSelect";
