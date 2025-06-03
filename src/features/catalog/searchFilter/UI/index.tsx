import { channelData } from "@entities/channel";
import { DEBOUNCE, getCatalogReq } from "@entities/project";
import { useDebounce } from "@shared/hooks";
import { CustomInput } from "@shared/ui";
import { Search, X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SearchFilterProps {
  type: channelData;
  onChange: UseFormSetValue<getCatalogReq | any>;
  value?: string;
}

export const SearchFilter: FC<SearchFilterProps> = ({
  type,
  onChange,
  value,
}) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState<string>(value || "");

  const debouncedPosition = useDebounce(searchText, DEBOUNCE.search);

  const handleChange = () => {
    if (searchText) {
      onChange(type, searchText);
    } else {
      onChange(type, null);
    }
  };

  useEffect(() => {
    handleChange();
  }, [debouncedPosition]);

  useEffect(() => {
    setSearchText(value || "");
  }, [value]);

  const handleClear = () => {
    setSearchText("");
    onChange(type, null);
  };

  return (
    <div className="relative">
      <Search
        color="var(--Personal-colors-main)"
        className="absolute z-10 -translate-y-1/2 left-3 top-1/2"
        size={20}
      />
      <X
        size={20}
        color="var(--Inside-container)"
        className="absolute z-10 -translate-y-1/2 cursor-pointer right-2 top-1/2"
        onClick={handleClear}
      />
      <CustomInput
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={t("catalog.search.search")}
        className="px-[40px] md:px-[40px]"
      />
    </div>
  );
};
