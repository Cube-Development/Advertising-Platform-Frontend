import { NewProject } from "@features/newProject";
import { BarTop } from "@features/barTop";
import { BarTypesFilter } from "@features/barTypesFilter";
import { BarStatusFilter } from "@features/barStatusFilter";
import { TurnkeyProject } from "@features/turnkeyProject";
import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { useAppSelector } from "@shared/store";
import { pageFilter } from "@shared/config/pageFilter";
import { projectTypesFilter } from "@shared/config/projectFilter";
import { AddPlatform } from "@features/addPlatform";
import { filterData, networkTypes } from "@shared/config/platformData";
import { useForm } from "react-hook-form";
import { SelectOptions } from "@features/selectOptions";

interface BarFilterProps {
  page: pageFilter;
}

export const BarFilter: FC<BarFilterProps> = ({ page }) => {
  const [isZeroProject, setZeroProject] = useState(true);
  const { typeFilter } = useAppSelector((state) => state.filter);

  const {
    setValue,
    formState: { errors },
  } = useForm<any>();

  return (
    <section className={styles.profile__filter}>
      <div className="container sidebar">
        <BarTop
          isZeroProject={isZeroProject}
          isZeroPlatform={true}
          NewProjectBtn={NewProject}
          TurnkeyProjectBtn={TurnkeyProject}
          AddPlatformBtn={AddPlatform}
          page={page}
        />

        <hr />
        <div>
          <SelectOptions
            onChange={setValue}
            options={networkTypes}
            textData="filter.title"
            single={true}
            type={filterData.platform}
            isFilter={true}
          />
        </div>
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
      </div>
    </section>
  );
};
