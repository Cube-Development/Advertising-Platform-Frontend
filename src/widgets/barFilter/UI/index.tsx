import { AddPlatform } from "@features/addPlatform";
import { BarStatusFilter } from "@features/barStatusFilter";
import { BarTop } from "@features/barTop";
import { BarTypesFilter } from "@features/barTypesFilter";
import { NewProject } from "@features/newProject";
import { SelectOptions } from "@features/selectOptions";
import { TurnkeyProject } from "@features/turnkeyProject";
import { pageFilter } from "@shared/config/pageFilter";
import { filterData, networkTypes } from "@shared/config/platformData";
import { projectTypesFilter } from "@shared/config/projectFilter";
import { useAppSelector } from "@shared/store";
import { FC } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

interface BarFilterProps {
  page: pageFilter;
  listLength: boolean;
}

export const BarFilter: FC<BarFilterProps> = ({ page, listLength }) => {
  const { typeFilter } = useAppSelector((state) => state.filter);

  const {
    setValue,
    formState: { errors },
  } = useForm<any>();

  return (
    <section className="container sidebar">
      <section className={styles.wrapper}>
        <BarTop
          listLength={listLength}
          NewProjectBtn={NewProject}
          TurnkeyProjectBtn={TurnkeyProject}
          AddPlatformBtn={AddPlatform}
          page={page}
        />

        {page === pageFilter.order ? (
          <>
            <BarTypesFilter />
            {typeFilter === projectTypesFilter.savedProject || (
              <BarStatusFilter page={page} />
            )}
          </>
        ) : (
          <BarStatusFilter page={page} />
        )}
        <div className={styles.filter}>
          <SelectOptions
            onChange={setValue}
            options={networkTypes}
            textData="filter.title"
            single={true}
            type={filterData.platform}
            isFilter={true}
          />
        </div>
      </section>
    </section>
  );
};
