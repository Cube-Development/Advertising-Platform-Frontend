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
// import styles from "./styles.module.scss";

// export const MyChannelsPage: FC = () => {
// const language = useFindLanguage();

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
import { useFindLanguage } from "@entities/user";
import { useGetViewBloggerChannelQuery } from "@entities/views";
import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { pageFilter, paths } from "@shared/routing";
import { SuspenseLoader } from "@shared/ui";
import { buildPathWithQuery, queryParamKeys, QueryParams } from "@shared/utils";
import { BarFilter } from "@widgets/barFilter";
import React, { FC, Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

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
  useClearCookiesOnPage();
  const language = useFindLanguage();
  const navigate = useNavigate();
  const { channel_status } = QueryParams();

  const { setValue, watch } = useForm<{
    platform: platformTypesNum;
    status: channelStatusFilter | string;
    page: number;
  }>({
    defaultValues: {
      platform: platformTypes[0].id,
      status:
        channel_status &&
        !!Object.values(channelStatusFilter).includes(
          channel_status as channelStatusFilter,
        )
          ? channel_status
          : channelStatusFilter.active,
      // status: channelStatusFilter.active,
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

  useEffect(() => {
    const newPath = buildPathWithQuery(paths.myChannels, {
      [queryParamKeys.channelStatus]: formState.status,
    });
    navigate(newPath, { replace: true });
  }, [formState.status]);

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
