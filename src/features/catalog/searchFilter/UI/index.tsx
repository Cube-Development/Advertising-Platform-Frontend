import { channelData } from "@entities/channel";
import { DEBOUNCE, getCatalogReq } from "@entities/project";
import { SearchIcon } from "@shared/assets";
import { useDebounce } from "@shared/hooks";
import { FC, useEffect, useState } from "react";
import { UseFormResetField, UseFormSetValue } from "react-hook-form";
import styles from "./styles.module.scss";

interface SearchFilterProps {
  type: channelData;
  onChange: UseFormSetValue<getCatalogReq>;
  resetField: UseFormResetField<getCatalogReq>;
}

export const SearchFilter: FC<SearchFilterProps> = ({
  type,
  onChange,
  resetField,
}) => {
  const [searchText, setSearchText] = useState<string>("");

  const debouncedPosition = useDebounce(searchText, DEBOUNCE.search);

  const handleChange = (newPosition: number | null) => {
    if (searchText) {
      onChange(type, searchText);
    } else {
      resetField(type);
      console.log("resetField");
    }
  };

  useEffect(() => {
    handleChange(debouncedPosition as number | null);
  }, [debouncedPosition]);

  return (
    <div className={styles.search}>
      <SearchIcon />
      <input
        // value={filter.query}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};
