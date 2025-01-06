// import {
//   channelStatusFilter,
//   getChannelsByStatusReq,
//   IModerationChannel,
//   useGetChannelsByStatusQuery,
// } from "@entities/channel";
// import {
//   dateSortingTypes,
//   platformTypes,
//   platformTypesNum,
// } from "@entities/platform";
// import { useGetViewBloggerChannelQuery } from "@entities/views";
// import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
// import { pageFilter } from "@shared/routing";
// import { BarFilter } from "@widgets/barFilter";
// import { ActiveChannels, ModerationChannels } from "@widgets/channel";
// import { FC, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useTranslation } from "react-i18next";
// import styles from "./styles.module.scss";

// export const MyChannelsPage: FC = () => {
//   const { i18n } = useTranslation();
//   const language = Languages.find((lang) => {
//     return i18n.language === lang.name;
//   });

//   const { setValue, watch } = useForm<{
//     platform: platformTypesNum;
//     status: channelStatusFilter | string;
//     page: number;
//   }>({
//     defaultValues: {
//       platform: platformTypes[0].id,
//       status: channelStatusFilter.active,
//       page: 1,
//     },
//   });
//   const formState = watch();
//   const { platform, status, page } = formState;

//   const getParams: getChannelsByStatusReq = {
//     language: language?.id || Languages[0].id,
//     page: formState.page,
//     elements_on_page: INTERSECTION_ELEMENTS.myChannels,
//     date_sort: dateSortingTypes.decrease,
//     status: formState.status,
//   };

//   const { data, isFetching } = useGetChannelsByStatusQuery(getParams);
//   const { refetch: views } = useGetViewBloggerChannelQuery();

//   useEffect(() => {
//     if (status !== channelStatusFilter.inactive) {
//       views();
//     }
//   }, [status, formState.page]);

//   useEffect(() => {
//     setTimeout(() => {
//       setValue("page", 1);
//     }, 500);
//   }, [platform, status]);

//   return (
//     <div className="container">
//       <div className={styles.wrapper}>
//         <BarFilter
//           page={pageFilter.platform}
//           setValue={setValue}
//           listLength={!data?.channels?.length}
//           changeStatus={(status) => setValue("status", status)}
//           statusFilter={formState.status}
//         />

//         {formState.status !== channelStatusFilter.moderation ? (
//           <ActiveChannels
//             cards={(formState.status === data?.status && data?.channels) || []}
//             handleOnChangePage={() => setValue("page", page + 1)}
//             isLoading={isFetching}
//             isLast={data?.isLast || false}
//             statusFilter={formState.status as channelStatusFilter}
//           />
//         ) : (
//           <ModerationChannels
//             statusFilter={formState.status}
//             cards={
//               ((formState.status === data?.status &&
//                 data?.channels) as IModerationChannel[]) || []
//             }
//             handleOnChangePage={() => setValue("page", page + 1)}
//             isLoading={isFetching}
//             isLast={data?.isLast || false}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

import React, { Suspense } from "react";
import {
  channelStatusFilter,
  getChannelsByStatusReq,
  IModerationChannel,
  useGetChannelsByStatusQuery,
} from "@entities/channel";
import {
  dateSortingTypes,
  platformTypes,
  platformTypesNum,
} from "@entities/platform";
import { useGetViewBloggerChannelQuery } from "@entities/views";
import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { BarFilter } from "@widgets/barFilter";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { SuspenseLoader } from "@shared/ui";

// Ленивый импорт компонентов
const ActiveChannels = React.lazy(() =>
  import("@widgets/channel").then((module) => ({
    default: module.ActiveChannels,
  })),
);
const ModerationChannels = React.lazy(() =>
  import("@widgets/channel").then((module) => ({
    default: module.ModerationChannels,
  })),
);

export const MyChannelsPage: FC = () => {
  const { i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const { setValue, watch } = useForm<{
    platform: platformTypesNum;
    status: channelStatusFilter | string;
    page: number;
  }>({
    defaultValues: {
      platform: platformTypes[0].id,
      status: channelStatusFilter.active,
      page: 1,
    },
  });
  const formState = watch();
  const { platform, status, page } = formState;

  const getParams: getChannelsByStatusReq = {
    language: language?.id || Languages[0].id,
    page: formState.page,
    elements_on_page: INTERSECTION_ELEMENTS.myChannels,
    date_sort: dateSortingTypes.decrease,
    status: formState.status,
  };

  const { data, isFetching } = useGetChannelsByStatusQuery(getParams);
  const { refetch: views } = useGetViewBloggerChannelQuery();

  useEffect(() => {
    if (status !== channelStatusFilter.inactive) {
      views();
    }
  }, [status, formState.page]);

  useEffect(() => {
    setTimeout(() => {
      setValue("page", 1);
    }, 500);
  }, [platform, status]);

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="container">
        <div className={styles.wrapper}>
          <BarFilter
            page={pageFilter.platform}
            setValue={setValue}
            listLength={!data?.channels?.length}
            changeStatus={(status) => setValue("status", status)}
            statusFilter={formState.status}
          />

          {formState.status !== channelStatusFilter.moderation ? (
            <ActiveChannels
              cards={
                (formState.status === data?.status && data?.channels) || []
              }
              handleOnChangePage={() => setValue("page", page + 1)}
              isLoading={isFetching}
              isLast={data?.isLast || false}
              statusFilter={formState.status as channelStatusFilter}
            />
          ) : (
            <ModerationChannels
              statusFilter={formState.status}
              cards={
                ((formState.status === data?.status &&
                  data?.channels) as IModerationChannel[]) || []
              }
              handleOnChangePage={() => setValue("page", page + 1)}
              isLoading={isFetching}
              isLast={data?.isLast || false}
            />
          )}
        </div>
      </div>
    </Suspense>
  );
};
