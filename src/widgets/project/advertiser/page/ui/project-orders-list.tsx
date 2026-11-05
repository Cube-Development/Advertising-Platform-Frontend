import {
  AdvSavedSubcard,
  AdvSubcard,
  ENUM_ADV_MANAGER_PROJECT_STATUS,
  ENUM_ADV_MY_PROJECT_STATUS,
  ENUM_PROJECT_TYPES,
  getProjectSubcardReq,
  IAdvProjectCard,
  IAdvProjectSubcard,
  IAdvSubprojects,
  useGetAdvManagerSubprojectsQuery,
  useGetAdvSubprojectsQuery,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import {
  AcceptPost,
  CheckPost,
  Feedback,
  RejectPost,
  ReplaceChannel,
  ReplacePost,
  SeePost,
} from "@features/order";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { Skeleton } from "@shared/ui/shadcn-ui";
import { Chat } from "@widgets/communication";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

interface ProjectOrdersListProps {
  projectId: string;
  typeFilter: ENUM_PROJECT_TYPES;
  statusFilter?: ENUM_ADV_MANAGER_PROJECT_STATUS | ENUM_ADV_MY_PROJECT_STATUS;
  /** Карточка проекта — нужна AdvSubcard; у сохранённого проекта её нет */
  card?: IAdvProjectCard;
}

const OrderSkeleton: FC = () => (
  <Skeleton className="bg-skeleton-light h-[220px] w-full rounded-[20px]" />
);

/**
 * Заказы проекта на его странице — вместо аккордеона в карточке списка.
 * Свой и сохранённый проект — POST /order/project/orders, с менеджером — GET /tariff/order.
 * «Показать ещё» увеличивает elements_on_page: так инвалидация тегов перезапрашивает весь список
 */
export const ProjectOrdersList: FC<ProjectOrdersListProps> = ({
  projectId,
  typeFilter,
  statusFilter,
  card,
}) => {
  const { t } = useTranslation();
  const language = useFindLanguage();
  const [limit, setLimit] = useState<number>(
    INTERSECTION_ELEMENTS.ADV_PROJECT_ORDERS,
  );

  const params: getProjectSubcardReq = {
    project_id: projectId,
    language: language?.id || USER_LANGUAGES_LIST[0].id,
    page: 1,
    elements_on_page: limit,
  };

  const isManager = typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT;

  const myOrders = useGetAdvSubprojectsQuery(params, { skip: isManager });
  const managerOrders = useGetAdvManagerSubprojectsQuery(params, {
    skip: !isManager,
  });

  const { data, isLoading, isFetching } = isManager ? managerOrders : myOrders;
  const orders = (data as IAdvSubprojects | undefined)?.orders ?? [];
  const hasMore = !!data && orders.length < (data.elements ?? 0);

  return (
    <div className="grid grid-flow-row gap-4">
      <h2 className="md:text-xl text-base font-semibold text-[var(--Personal-colors-black)]">
        {t("adv_project_page.orders_title")}
        {data?.elements ? (
          <span className="ml-2 text-[var(--Personal-colors-main)]">
            {data.elements.toLocaleString()}
          </span>
        ) : null}
      </h2>

      {isLoading ? (
        <div className="grid grid-flow-row gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <OrderSkeleton key={index} />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <p className="rounded-[20px] bg-white/60 py-10 text-center text-sm text-slate-500 shadow-lg">
          {t("adv_project_page.empty_orders")}
        </p>
      ) : (
        <div className="grid grid-flow-row gap-3">
          {/* Заказы — в одной карточке с разделителями, как раньше в раскрытом аккордеоне;
              на мобильных у AdvSubcard нет своих отступов — даём их обёрткой */}
          <div className="overflow-hidden rounded-[20px] border border-[var(--Card-separator)] bg-white shadow-lg [&>div:last-child>div]:border-b-0">
            {orders.map((subcard: IAdvProjectSubcard) => (
              <div
                key={subcard.id}
                className="max-md:border-b max-md:border-black/10 max-md:p-3 max-md:last:border-b-0"
              >
                {typeFilter === ENUM_PROJECT_TYPES.SAVED_PROJECT || !card ? (
                  <AdvSavedSubcard subcard={subcard} SeePostBtn={SeePost} />
                ) : (
                  <AdvSubcard
                    card={card}
                    subcard={subcard}
                    FeedbackBtn={Feedback}
                    AcceptBtn={AcceptPost}
                    RejectBtn={RejectPost}
                    CheckBtn={CheckPost}
                    SeePostBtn={SeePost}
                    ChannelChatBtn={Chat}
                    ReplaceChannelBtn={ReplaceChannel}
                    ReplacePostBtn={ReplacePost}
                    typeFilter={typeFilter}
                    statusFilter={statusFilter!}
                  />
                )}
              </div>
            ))}
          </div>

          {hasMore && (
            <div
              className="flex cursor-pointer justify-center py-2"
              onClick={() =>
                !isFetching &&
                setLimit(
                  (prev) => prev + INTERSECTION_ELEMENTS.ADV_PROJECT_ORDERS,
                )
              }
            >
              {isFetching ? <SpinnerLoader /> : <ShowMoreBtn />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
