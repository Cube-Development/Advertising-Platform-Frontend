import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ENUM_VIEWER_ROLES,
  IAgencyOrderCard,
  projectStatus,
} from "@entities/project";
import { OrderCard } from "../order-card/order-card";
import {
  CheckPost,
  ReplaceChannel,
  ReplacePost,
  SeePost,
} from "@features/order";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui";

interface OrdersListProps {
  orders: IAgencyOrderCard[];
  is_request_approve: projectStatus;
  project_id: string;
  viewer: ENUM_VIEWER_ROLES;
  code: number;
}

export const OrdersList: FC<OrdersListProps> = ({
  orders,
  is_request_approve,
  project_id,
  viewer,
  code,
}) => {
  const { t } = useTranslation();
  const [accordionValue, setAccordionValue] = useState<string>("");
  const shouldShowAccordion = (orders?.length ?? 0) > 2;
  const visibleOrders = shouldShowAccordion ? orders?.slice(0, 2) : orders;
  const hiddenOrders = shouldShowAccordion ? orders?.slice(2) : [];

  return (
    <div className="shadow-lg rounded-[20px] border-[1px] border-[var(--Card-separator)] overflow-hidden bg-white/60">
      {visibleOrders?.map((order) => (
        <OrderCard
          key={order.id}
          is_request_approve={is_request_approve}
          project_id={project_id}
          subcard={order}
          CheckBtn={CheckPost}
          SeePostBtn={SeePost}
          ReplaceChannelBtn={ReplaceChannel}
          ReplacePostBtn={ReplacePost}
          viewer={viewer}
          code={code}
        />
      ))}
      {shouldShowAccordion && (
        <Accordion
          type="single"
          collapsible
          value={accordionValue}
          onValueChange={setAccordionValue}
          className="w-full"
        >
          <AccordionItem value="more-orders" className="border-none">
            <AccordionContent className="pt-0">
              {hiddenOrders?.map((order) => (
                <OrderCard
                  key={order.id}
                  is_request_approve={is_request_approve}
                  project_id={project_id}
                  subcard={order}
                  CheckBtn={CheckPost}
                  SeePostBtn={SeePost}
                  ReplaceChannelBtn={ReplaceChannel}
                  ReplacePostBtn={ReplacePost}
                  viewer={viewer}
                  code={code}
                />
              ))}
            </AccordionContent>
            <div className="flex justify-center">
              <AccordionTrigger className="my-5 px-4 py-3 bg-[var(--URL)] text-white rounded-lg hover:opacity-80 transition-all duration-500 font-medium mobile-xl:text-base text-sm hover:no-underline [&[data-state=open]>svg]:rotate-180">
                {accordionValue === "more-orders"
                  ? t("project_page.hide")
                  : t("project_page.show_all")}
              </AccordionTrigger>
            </div>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};
