import { FC } from "react";
import styles from "./styles.module.scss";
import { useAppSelector } from "@shared/store";
import { pageFilter } from "@shared/config/pageFilter";
import { UseFormSetValue } from "react-hook-form";
import { AddChannel } from "@features/channel";
import {
  BarStatusFilter,
  BarTop,
  BarTypesFilter,
  SelectOptions,
  TurnkeyProject,
  filterData,
} from "@features/other";
import { NewProject } from "@features/project";
import { roles } from "@entities/user";
import { projectTypesFilter } from "@entities/project";
import { platformTypes } from "@entities/platform";

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
          AddChannelBtn={AddChannel}
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
          <BarStatusFilter page={page} />
        )}
        {page !== pageFilter.order && (
          <div className={styles.filter}>
            <SelectOptions
              onChange={setValue!}
              options={platformTypes}
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
