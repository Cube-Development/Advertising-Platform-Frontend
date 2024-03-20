import { MyInput } from "@shared/ui";
import { FC } from "react";

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
    <div>
      <MyInput
        // value={filter.query}
        // onChange={e=> setFilter({...filter, query: e.target.value})}
        placeholder="Search..."
      />
    </div>
  );
};
