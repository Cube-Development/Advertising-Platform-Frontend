import {
  GetPostRes,
  IAgencyOrderCard,
  IOrderFeature,
  orderStatus,
  platformToIcon,
  projectStatus,
  useGetPostQuery,
  ENUM_VIEWER_ROLES,
} from "@entities/project";
import {
  ReplaceChannelProps,
  ReplacePostProps,
  SeePost,
} from "@features/order";
import {
  BoyIcon,
  EyeIcon,
  GirlIcon,
  RatingIcon,
  SubsIcon,
} from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import { useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FileText, History, SquareArrowOutUpRight } from "lucide-react";
import { RejectOffer, SendLink } from "@features/offer";

interface OrderCardProps {
  is_request_approve: projectStatus;
  project_id: string;
  subcard: IAgencyOrderCard;
  CheckBtn: FC<IOrderFeature>;
  SeePostBtn: FC<{ post: GetPostRes; post_deeplink: string }>;
  ReplaceChannelBtn: FC<ReplaceChannelProps>;
  ReplacePostBtn: FC<ReplacePostProps>;
  viewer: ENUM_VIEWER_ROLES;
  code: number;
}

export const OrderCard: FC<OrderCardProps> = ({
  is_request_approve,
  project_id,
  subcard,
  CheckBtn,
  SeePostBtn,
  ReplaceChannelBtn,
  ReplacePostBtn,
  viewer,
  code,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { data: post, error } = useGetPostQuery({ order_id: subcard.id });
  if (error) {
    toast({
      variant: "error",
      title: t("toasts.orders_advertiser.reject_post.error"),
    });
    console.error("error: ", error);
  }

  const haveDesire = subcard?.desire?.length;

  return (
    <div className="grid md:grid-flow-row md:[grid-template:'min-content_min-content_1fr/1fr'] gap-[10px] px-[15px] py-[20px] border-b border-b-[rgba(0,0,0,0.2)]">
      <div
        className={`grid items-center content-start relative lg:[grid-template:1fr/12fr_5fr] [grid-template:1fr_auto_auto/1fr] lg:gap-0 gap-[15px]`}
      >
        <div className="absolute mobile-xl:top-0 mobile-xl:left-0 top-[-13px] left-[-8px] [&_svg]:size-[15px]">
          {subcard?.platform && subcard?.platform in platformToIcon
            ? platformToIcon[subcard.platform!]()
            : "..."}
        </div>
        <div className="grid lg:[grid-template:1fr/0.7fr_2fr_1.1fr] mobile-xl:[grid-template:1fr/0.7fr_2fr] [grid-template:auto_1fr/1fr] mobile-xl:gap-0 gap-[15px] lg:pr-5 pr-0 whitespace-nowrap lg:h-[150px] md:h-[unset]">
          <div className="grid mobile-xl:grid-flow-row grid-flow-col items-center content-center mobile-xl:gap-[5px] gap-[10px] mobile-xl:border-r-[1px] border-r-0 border-[var(--Card-separator)] mobile-xl::pr-[10px] pr-0 min-w-[200px] w-fit">
            <div className="grid grid-flow-row gap-1 items-center">
              <Link
                to={`${ENUM_PATHS.CHANNEL.replace(":id", subcard?.channel_id || subcard?.id)}`}
                target="_blank"
                className="grid justify-center items-center cursor-pointer [&>img]:rounded-full [&>img]:border [&>img]:border-[var(--Personal-colors-main)] mobile-xl:[&>img]:size-[64px] [&>img]:size-[40px]"
              >
                <img src={subcard?.avatar} alt="" />
              </Link>
              <div className="grid items-center justify-center mobile-xl:[&>svg]:w-[70px] [&>svg]:w-[50px] [&>svg]:h-auto ">
                <RatingIcon rate={subcard?.rate || 0} />
              </div>
            </div>
            <div className="grid grid-flow-row gap-1 items-center">
              <div className="grid grid-flow-row items-center content-center gap-[8px] mobile-xl:text-center text-left">
                <p className="text-[var(--Personal-colors-black)] text-xs font-semibold leading-none truncate">
                  {subcard?.name}
                </p>
                <span className="text-[#9e9e9e] text-[10px] font-medium leading-none truncate">
                  {subcard?.category}
                </span>
              </div>
              <Link
                to={subcard?.url}
                target="_blank"
                className="truncate flex items-center gap-1 text-[var(--URL)] text-xs font-medium leading-none"
              >
                <SquareArrowOutUpRight className="mobile-xl:size-[18px] size-[14px] !stroke-[2px]" />
                <span className="truncate">{subcard?.url}</span>
              </Link>
            </div>
          </div>
          <div className="grid lg:[grid-template:1fr/repeat(2,1fr)] [grid-template:repeat(2,1fr)/1fr]">
            <div className="grid [grid-template:repeat(2,1fr)/1fr] justify-items-center justify-center items-center content-center md:border-r-[1px] border-r-0 border-[var(--Card-separator)] px-[10px]">
              <div className="w-full grid [align-items:flex-end] h-full lg:pb-[15px] pb-[10px] border-b-[1px] border-[var(--Card-separator)]">
                <div className="grid lg:grid-flow-row grid-flow-col lg:justify-center justify-between gap-[10px] lg:text-center text-left">
                  <p className="text-black/40 text-xs font-medium leading-none text-center">
                    {t(`orders_advertiser.subcard.date`)}
                  </p>
                  <span className="text-black/85 font-semibold leading-none text-xs text-center ">
                    {typeof subcard?.publish_date === "object"
                      ? subcard?.publish_date?.date_from.toString() +
                        " - " +
                        subcard?.publish_date?.date_to.toString()
                      : subcard?.publish_date.toString()}
                  </span>
                </div>
              </div>
              <div className="w-full grid [align-items:flex-start] h-full lg:pt-[15px] lg:pb-[0px] pt-[10px] pb-[10px] lg:border-0 border-b-[1px] border-[var(--Card-separator)]">
                <div className="grid lg:grid-flow-row grid-flow-col lg:justify-center justify-between gap-[10px] lg:text-center text-left">
                  <p className="text-black/40 text-xs font-medium leading-none text-center">
                    {t(`orders_advertiser.subcard.price`)}
                  </p>
                  <span className="text-black/85 font-semibold leading-none text-xs text-center ">
                    {subcard?.price?.toLocaleString()} {t(`symbol`)}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid [grid-template:repeat(2,1fr)/1fr] justify-items-center justify-center items-center content-center md:border-r-[1px] border-r-0 border-[var(--Card-separator)] px-[10px]">
              <div className="w-full grid [align-items:flex-end] h-full pb-[10px] border-b-[1px] border-[var(--Card-separator)]">
                <div className="grid lg:grid-flow-row grid-flow-col lg:justify-center justify-between gap-[10px] lg:text-center text-left">
                  <p className="text-black/40 text-xs font-medium leading-none text-center">
                    {t(`orders_advertiser.subcard.time`)}
                  </p>
                  <span className="text-black/85 font-semibold leading-none text-xs text-center ">
                    {subcard?.publish_time?.time_from?.slice(0, 5)} -{" "}
                    {subcard?.publish_time?.time_to?.slice(0, 5)}
                  </span>
                </div>
              </div>
              <div className="w-full grid [align-items:flex-start] h-full lg:pt-[15px] pt-[10px]">
                <div className="grid lg:grid-flow-row grid-flow-col lg:justify-center justify-between gap-[10px] lg:text-center text-left">
                  <p className="text-black/40 text-xs font-medium leading-none text-center">
                    {t(`orders_advertiser.subcard.accommodation`)}
                  </p>
                  <span className="text-black/85 font-semibold leading-none text-xs text-center truncate">
                    {subcard?.format?.small}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:grid [grid-template:repeat(3,1fr)/1fr] rounded-[10px] bg-[rgba(15,105,201,0.1)] p-[10px_12px] ml-[10px]">
            <div className="grid grid-flow-col items-center justify-between">
              <div className="grid grid-flow-row gap-[10px] items-center">
                <div className="grid items-center justify-center [&>svg]:w-[14px] [&>svg]:h-auto">
                  <SubsIcon />
                </div>
                <span className="text-[var(--Personal-colors-black)] text-center text-[10px] leadnig-none font-medium">
                  {subcard?.subscribers?.toLocaleString()}
                </span>
              </div>
              <div className="grid grid-flow-row gap-[10px] items-center">
                <div className="grid items-center justify-center [&>svg]:w-[14px] [&>svg]:h-auto">
                  <EyeIcon />
                </div>
                <span className="text-[var(--Personal-colors-black)] text-center text-[10px] leadnig-none font-medium">
                  {subcard?.views?.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="grid grid-flow-col items-center justify-center gap-[5px]">
              <div className="grid items-center justify-center [&>svg]:w-[15px] [&>svg]:h-auto">
                <BoyIcon />
              </div>
              <div
                className="colorline"
                style={{ "--male": `${subcard?.male}%` } as React.CSSProperties}
                data-male={`${subcard?.male}%`}
                data-female={`${subcard?.female}%`}
              />
              <div className="grid items-center justify-center [&>svg]:w-[15px] [&>svg]:h-auto">
                <GirlIcon />
              </div>
            </div>
            <div className="grid grid-flow-col items-center justify-between">
              <div className="grid grid-flow-row gap-[10px] items-center">
                <p className="text-black/60 text-center text-[8px] font-semibold leading-none">
                  ER:
                </p>
                <span className="text-[var(--Personal-colors-black)] text-center text-[10px] leadnig-none font-medium">
                  {subcard?.er}%
                </span>
              </div>
              <div className="grid grid-flow-row gap-[10px] items-center">
                <p className="text-black/60 text-center text-[8px] font-semibold leading-none">
                  CPV:
                </p>
                <span className="text-[var(--Personal-colors-black)] text-center text-[10px] leadnig-none font-medium">
                  {subcard?.cpv?.toLocaleString()} {t(`symbol`)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:hidden [grid-template:repeat(3,1fr)/1fr] rounded-[10px] bg-[rgba(15,105,201,0.1)] p-[10px_12px]">
          <div className="grid grid-flow-col items-center justify-between">
            <div className="grid grid-flow-row gap-[10px] items-center">
              <div className="grid items-center justify-center [&>svg]:w-[14px] [&>svg]:h-auto">
                <SubsIcon />
              </div>
              <span className="text-[var(--Personal-colors-black)] text-center text-[10px] leadnig-none font-medium">
                {subcard?.subscribers?.toLocaleString()}
              </span>
            </div>
            <div className="grid grid-flow-row gap-[10px] items-center">
              <div className="grid items-center justify-center [&>svg]:w-[14px] [&>svg]:h-auto">
                <EyeIcon />
              </div>
              <span className="text-[var(--Personal-colors-black)] text-center text-[10px] leadnig-none font-medium">
                {subcard?.views?.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="grid grid-flow-col items-center justify-center gap-[5px]">
            <div className="grid items-center justify-center [&>svg]:w-[15px] [&>svg]:h-auto">
              <BoyIcon />
            </div>
            <div
              className="colorline"
              style={{ "--male": `${subcard?.male}%` } as React.CSSProperties}
              data-male={`${subcard?.male}%`}
              data-female={`${subcard?.female}%`}
            />
            <div className="grid items-center justify-center [&>svg]:w-[15px] [&>svg]:h-auto">
              <GirlIcon />
            </div>
          </div>
          <div className="grid grid-flow-col items-center justify-between">
            <div className="grid grid-flow-row gap-[10px] items-center">
              <p className="text-black/60 text-center text-[8px] font-semibold leading-none">
                ER:
              </p>
              <span className="text-[var(--Personal-colors-black)] text-center text-[10px] leadnig-none font-medium">
                {subcard?.er}%
              </span>
            </div>
            <div className="grid grid-flow-row gap-[10px] items-center">
              <p className="text-black/60 text-center text-[8px] font-semibold leading-none">
                CPV:
              </p>
              <span className="text-[var(--Personal-colors-black)] text-center text-[10px] leadnig-none font-medium">
                {subcard?.cpv?.toLocaleString()} {t(`symbol`)}
              </span>
            </div>
          </div>
        </div>

        {viewer === ENUM_VIEWER_ROLES.CUSTOMER ? (
          <div className="">
            {subcard?.api_status === orderStatus.canceled ? (
              <div
                className={
                  "grid grid-flow-row items-center justify-center content-center gap-[10px] h-full "
                }
              >
                <p className="text-center lg:text-base text-sm font-semibold leading-none">
                  {t(`orders_advertiser.order_status.rejected.title`)}
                </p>
                <span className="text-center text-[10px] font-normal leading-none">
                  {t(`orders_advertiser.order_status.rejected.text2`)}
                </span>
                <SeePostBtn
                  post={post!}
                  post_deeplink={subcard?.post_deeplink}
                />
                {subcard?.post_url && <CheckBtn url={subcard?.post_url} />}
              </div>
            ) : subcard?.api_status === orderStatus.completed ? (
              <div
                className={
                  "grid grid-flow-row items-center justify-center content-center gap-[10px] h-full "
                }
              >
                <p className="text-center lg:text-base text-sm font-semibold leading-none">
                  {t(`orders_advertiser.order_status.completed.title`)}
                </p>
                <SeePostBtn
                  post={post!}
                  post_deeplink={subcard?.post_deeplink}
                />
                {subcard?.post_url && <CheckBtn url={subcard?.post_url} />}
              </div>
            ) : subcard?.api_status === orderStatus.wait ? (
              <div
                className={
                  "grid grid-flow-row items-center justify-center content-center gap-[10px] h-full "
                }
              >
                <p className="text-center lg:text-base text-sm font-semibold leading-none">
                  {t(`orders_advertiser.order_status.waiting.title`)}
                </p>
                <SeePostBtn
                  post={post!}
                  post_deeplink={subcard?.post_deeplink}
                />
                {subcard?.post_url && <CheckBtn url={subcard?.post_url} />}
              </div>
            ) : subcard?.api_status === orderStatus.order_review ? (
              <div
                className={
                  "grid grid-flow-row items-center justify-center content-center gap-[10px] h-full "
                }
              >
                <div className="grid grid-flow-row gap-[10px]">
                  <p className="text-center lg:text-base text-sm font-semibold leading-none">
                    {is_request_approve === projectStatus.approved
                      ? t(
                          `orders_advertiser.order_status.agreed.title.approved`,
                        )
                      : haveDesire
                        ? t(
                            `orders_advertiser.order_status.agreed.title.changed`,
                          )
                        : t(
                            `orders_advertiser.order_status.agreed.title.request_approve`,
                          )}
                  </p>
                  <SeePostBtn
                    post={post!}
                    post_deeplink={subcard?.post_deeplink}
                  />
                  <div className="grid grid-flow-row gap-[5px]">
                    <div className="grid grid-cols-2 gap-[5px]">
                      <ReplaceChannelBtn
                        order={subcard}
                        status={is_request_approve!}
                        project_id={project_id}
                        code={code}
                      />
                      <ReplacePostBtn
                        order={subcard}
                        status={is_request_approve!}
                        code={code}
                      />
                    </div>
                    {subcard?.post_url && <CheckBtn url={subcard?.post_url} />}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div>
            {subcard?.api_status === orderStatus.wait ? (
              <div className="grid grid-flow-row items-center justify-center content-center gap-[10px] h-full text-center">
                <div className="">
                  <p className="text-center lg:text-base text-sm font-semibold leading-none">
                    {t(`offers_blogger.offer_status.active.title`)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-[10px]">
                  <RejectOffer
                    order_id={subcard.id}
                    code={code}
                    project_id={project_id}
                  />
                  <SendLink
                    order_id={subcard.id}
                    code={code}
                    project_id={project_id}
                    date={
                      typeof subcard?.publish_date === "object"
                        ? subcard?.publish_date?.date_from
                        : subcard?.publish_date
                    }
                    time={subcard?.publish_time?.time_from?.slice(0, 5)}
                  />
                </div>
                <SeePost post={post!} post_deeplink={subcard?.post_deeplink} />
              </div>
            ) : subcard?.api_status === orderStatus.completed ? (
              <div className="grid grid-flow-row items-center justify-center content-center gap-[10px] h-full text-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <FileText className="size-5" />
                  <p className="text-center lg:text-base text-sm font-semibold leading-none">
                    {t("offers_blogger.offer_status.complete.title")}
                  </p>
                </div>
                <div className="grid grid-flow-row gap-2 items-center justify-center">
                  <SeePost
                    post={post!}
                    post_deeplink={subcard?.post_deeplink}
                  />
                  {subcard?.post_url && <CheckBtn url={subcard?.post_url} />}
                </div>
              </div>
            ) : subcard?.api_status === orderStatus.canceled ? (
              <div className="grid grid-flow-row items-center justify-center content-center gap-[10px] h-full text-center">
                <div className="grid grid-flow-row gap-2 items-center justify-center">
                  <p className="text-center lg:text-base text-sm font-semibold leading-none">
                    {t(`offers_blogger.offer_status.cancel.title`)}
                  </p>
                  <span className="text-center lg:text-sm text-xs font-medium leading-none">
                    {t(`offers_blogger.offer_status.cancel.text`)}
                  </span>
                </div>
                <SeePost post={post!} post_deeplink={subcard?.post_deeplink} />
              </div>
            ) : (
              <div className="grid grid-flow-row items-center justify-center content-center gap-[10px] h-full text-center">
                <div className="flex items-center justify-center">
                  <History className="md:size-10 size-7 stroke-[1.5px] stroke-[var(--Personal-colors-main)]" />
                </div>
                <p className="text-center lg:text-base text-sm font-semibold leading-none">
                  {t("offers_blogger.offer_status.not_activated.text")}
                </p>
                <SeePost post={post!} post_deeplink={subcard?.post_deeplink} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
