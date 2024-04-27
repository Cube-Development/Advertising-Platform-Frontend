import { AddPlatform } from "@features/addPlatform";
import { BarStatusFilter } from "@features/barStatusFilter";
import { BarTop } from "@features/barTop";
import { BarTypesFilter } from "@features/barTypesFilter";
import { TurnkeyProject } from "@features/turnkeyProject";
import { FC } from "react";
import styles from "./styles.module.scss";
import { useAppSelector } from "@shared/store";
import { pageFilter } from "@shared/config/pageFilter";
import { projectTypesFilter } from "@shared/config/projectFilter";
import { filterData, networkTypes } from "@shared/config/platformData";
import { SelectOptions } from "@features/selectOptions";
import { UseFormSetValue } from "react-hook-form";
import { NewProject } from "@features/newProject";
import { roles } from "@shared/config/roles";

interface BarFilterProps {
  page: pageFilter;
  listLength: boolean;
  setValue?: UseFormSetValue<any>;
}

export const BarFilter: FC<BarFilterProps> = ({
  page,
  setValue,
  listLength,
}) => {
  const { typeFilter } = useAppSelector((state) => state.filter);
  const { role } = useAppSelector((state) => state.user);

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
          role === roles.advertiser ? (
            <>
              <BarTypesFilter />
              {typeFilter === projectTypesFilter.savedProject || (
                <BarStatusFilter page={page} />
              )}
            </>
          ) : (
            role === roles.manager && (
              <>
                <BarStatusFilter page={page} />
              </>
            )
          )
        ) : (
          // <>
          //   <BarTypesFilter />
          //   {typeFilter === projectTypesFilter.savedProject || (
          //     <BarStatusFilter page={page} />
          //   )}
          // </>
          <BarStatusFilter page={page} />
        )}
        {page !== pageFilter.order && (
          <div className={styles.filter}>
            <SelectOptions
              onChange={setValue!}
              options={networkTypes}
              textData="filter.title"
              single={true}
              type={filterData.platform}
              isFilter={true}
            />
          </div>
        )}
      </section>
    </section>
  );
};
