import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SeePost } from "@features/order";
import {
  DownloadApproveReport,
  EditProject,
  RunSavedProject,
} from "@features/project";
import {
  getProjectSubcardReq,
  ISavedProjectCard,
  IAdvProjectSubcard,
  useGetAdvSubprojectsQuery,
  AdvSavedSubcard,
  useDeleteSavedProjectMutation,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { ArrowSmallVerticalIcon } from "@shared/assets";
import { BREAKPOINT, ENUM_ACCORDION_TYPES } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccountsLoader,
  MyPagination,
  SpinnerLoader,
} from "@shared/ui";
import styles from "./styles.module.scss";
import { Loader, Trash2 } from "lucide-react";
import { useToast } from "@shared/ui";

interface SavedProjectCardProps {
  card: ISavedProjectCard;
}

const Card: FC<SavedProjectCardProps> = ({ card }) => {
  const { t } = useTranslation();
  const [deleteSavedProject, { isLoading: isLoadingDelete }] =
    useDeleteSavedProjectMutation();
  const { toast } = useToast();
  const handleDeleteSavedProject = async (project_id: string) => {
    if (isLoadingDelete) return;
    deleteSavedProject({ project_id })
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: "success...",
        });
      })
      .catch(() => {
        toast({
          variant: "error",
          title: "error...",
        });
      });
  };
  return (
    <div className={`${styles.card} ${styles.request_approve}`}>
      <div className={styles.card__description}>
        <div className={styles.card__description__data}>
          <div className={styles.card__description__data__title}>
            <p className="truncate">{card?.project_name}</p>
            <span>№{card?.identifier}</span>
          </div>
          <div className={styles.card__description__data__date}>
            <span>{card?.created}</span>
          </div>
        </div>
        <div className={styles.card__description__status}>
          <span>{t("orders_advertiser.card.status.saved")}</span>
          <div
            className="cursor-pointer absolute top-5 right-5"
            onClick={() => handleDeleteSavedProject(card?.id)}
          >
            {isLoadingDelete ? (
              <Loader className="animate-spin md:size-7 size-5 stroke-[2px] text-red-500" />
            ) : (
              <Trash2 className="md:size-7 size-5 stroke-[2px] text-red-500" />
            )}
          </div>
        </div>
      </div>
      <div className={styles.card__info}>
        <div className={styles.card__info__data}>
          <div>
            <p>{t("orders_advertiser.card.channels")}:</p>
            <span>{card?.orders?.toLocaleString()}</span>
          </div>
          <div>
            <p>{t("orders_advertiser.card.views")}:</p>
            <span>~ {card?.views?.toLocaleString()}</span>
          </div>
          <div>
            <p>{t("orders_advertiser.card.cost")}:</p>
            <span>
              <span>{card?.budget?.toLocaleString()}</span>
              <small>{t("symbol")}</small>
            </span>
          </div>
        </div>
        <div className="md:hidden block">
          <DownloadApproveReport project_id={card?.id} />
        </div>
        <div className={styles.card__info__btns}>
          <div className={styles.card__info__btns__actions}>
            <EditProject project_id={card?.id} />
            {/* TODO: add launch project */}
            <RunSavedProject project_id={card?.id} totalAmount={card?.budget} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SavedProjectCard: FC<SavedProjectCardProps> = ({ card }) => {
  const [isSubcardOpen, setSubcardOpen] = useState(false);
  const screen = useWindowWidth();
  const { t } = useTranslation();
  const language = useFindLanguage();
  const swiperRef = useRef<SwiperCore | null>(null);

  const getParams: getProjectSubcardReq = {
    project_id: card?.id,
    language: language?.id || USER_LANGUAGES_LIST[0].id,
    page: 1,
  };

  const { data: subcardsSaved, isLoading: isLoadingSaved } =
    useGetAdvSubprojectsQuery(getParams, {
      skip: !isSubcardOpen,
    });

  const handleChangeOpenSubcard = (): void => {
    setSubcardOpen(!isSubcardOpen);
  };

  const accordionRef = useRef(null);

  const handleClickOutside = () => {
    const state = (accordionRef.current! as HTMLElement).getAttribute(
      "data-state",
    );
    state === ENUM_ACCORDION_TYPES.OPEN
      ? setSubcardOpen(true)
      : setSubcardOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {screen > BREAKPOINT.MD ? (
        <div
          style={
            {
              "--zIndexTop": "-3",
              "--zIndexBottom": "-4",
            } as React.CSSProperties
          }
          className={`${styles.wrapper} border__gradient `}
        >
          <Card card={card} />
          <div className="md:block hidden w-[94%] mx-auto">
            <DownloadApproveReport project_id={card?.id} />
          </div>
          <AccordionItem
            style={
              {
                "--zIndexTop": "-1",
                "--zIndexBottom": "-2",
                "--borderMass": "2px",
              } as React.CSSProperties
            }
            // className="border__gradient"
            value={`item-${card?.id}`}
            ref={accordionRef}
            className="border-none"
          >
            <AccordionContent>
              <div className={`${styles.subcard} `}>
                {subcardsSaved?.orders?.map((subcard, index) => (
                  <AdvSavedSubcard
                    key={index}
                    subcard={subcard as IAdvProjectSubcard}
                    SeePostBtn={SeePost}
                  />
                ))}
              </div>
            </AccordionContent>
            <AccordionTrigger onClick={() => handleChangeOpenSubcard()}>
              <div className={styles.card__btn}>
                {isSubcardOpen
                  ? t(`orders_advertiser.card.see_less`)
                  : t(`orders_advertiser.card.see_more`)}
                {!isLoadingSaved ? (
                  <ArrowSmallVerticalIcon
                    className={
                      isSubcardOpen
                        ? "icon__white rotate"
                        : "icon__white rotate__down"
                    }
                  />
                ) : (
                  <div className="loader">
                    <AccountsLoader />
                  </div>
                )}
              </div>
            </AccordionTrigger>
          </AccordionItem>
        </div>
      ) : (
        <>
          {/* abdsh */}
          <div
            className={`${styles.disable_radius} overflow-hidden relative h-[500px] border__gradient`}
          >
            <div
              className={`absolute top-0 left-0 w-full transition-transform duration-500 ${
                isSubcardOpen ? "-translate-x-full" : "translate-x-0"
              } ${styles.wrapper}`}
            >
              <Card card={card} />
            </div>
            <div
              className={`absolute top-0 left-0 w-full transition-transform duration-500 ${
                isSubcardOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {isLoadingSaved && (
                <div className="grid justify-center items-center h-full pt-[100px]">
                  <SpinnerLoader />
                </div>
              )}
              <div className={`swipper__carousel`}>
                <Swiper
                  slidesPerView={1}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  speed={500}
                  spaceBetween={50}
                  loop={true}
                >
                  {subcardsSaved?.orders.map((subcard, index) => (
                    <SwiperSlide
                      key={index}
                      className={`${styles.subcard__md}`}
                    >
                      <div className={styles.top}>
                        <AdvSavedSubcard
                          key={index}
                          subcard={subcard as IAdvProjectSubcard}
                          SeePostBtn={SeePost}
                        />
                        <MyPagination
                          cardIndex={index}
                          count={subcardsSaved?.orders?.length || 1}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div
            className={styles.card__btn}
            onClick={() => setSubcardOpen((prev) => !prev)}
          >
            {isLoadingSaved ? (
              <div className="loader">
                <AccountsLoader />
              </div>
            ) : (
              <ArrowSmallVerticalIcon
                className={
                  isSubcardOpen
                    ? "icon__white rotate side"
                    : "icon__white rotate__down side"
                }
              />
            )}
          </div>
        </>
      )}
    </>
  );
};
