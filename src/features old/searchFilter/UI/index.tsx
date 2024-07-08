import { FC } from "react";
import styles from "./styles.module.scss";
import { SearchIcon } from "@shared/assets";

interface Filter {
  sort: string;
  query: string;
}

interface PostFilterProps {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

export const SearchFilter: FC = () => {
  return (
    <div className={styles.search}>
      <SearchIcon />
      <input
        // value={filter.query}
        // onChange={e=> setFilter({...filter, query: e.target.value})}
        placeholder="Search..."
      />
    </div>
  );
};
