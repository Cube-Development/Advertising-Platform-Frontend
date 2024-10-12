import { channelData } from "@entities/channel";
import { DEBOUNCE, getCatalogReq } from "@entities/project";
import { SearchIcon } from "@shared/assets";
import { useDebounce } from "@shared/hooks";
import { FC, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import styles from "./styles.module.scss";

interface SearchFilterProps {
  type: channelData;
  onChange: UseFormSetValue<getCatalogReq>;
}

export const SearchFilter: FC<SearchFilterProps> = ({ type, onChange }) => {
  const [searchText, setSearchText] = useState<string | null>("");

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
