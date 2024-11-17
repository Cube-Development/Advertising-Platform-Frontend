import {
  adminChannelStatus,
  channelStatus,
  IAdminChannelData,
} from "@entities/admin";
import {
  channelParameterData,
  IAddChannelData,
  PLATFORM_PARAMETERS,
  useGetChannelAgesQuery,
  useGetChannelLanguagesQuery,
  useGetChannelRegionsQuery,
  useGetCompanyCategoriesQuery,
} from "@entities/channel";
import { platformTypes } from "@entities/platform";
import {
  AcceptChannel,
  BanChannel,
  ChannelCardMenu,
  RejectChannel,
  UpdateChannel,
} from "@features/adminPanel";
import { SelectOptions, SelectSex } from "@features/other";
import { ArrowSmallVerticalIcon } from "@shared/assets";
import { Languages } from "@shared/config";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  useToast,
} from "@shared/ui";
import { FC, MutableRefObject } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import styles from "./styles.module.scss";

interface ChannelCardProps {
  card: IAdminChannelData;
  accordionRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  index: number;
}

export const ChannelCard: FC<ChannelCardProps> = ({
  card,
  accordionRefs,
  index,
}) => {
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const { toast } = useToast();

  const handleCopyLink = (text: string = "") => {
    navigator.clipboard.writeText(text);
    toast({
      variant: "default",
      title: t("copy.default"),
    });
  };

  const contentRes = {
    language: language?.id || Languages[0].id,
    page: 1,
  };

  let defaultValues = {
    insertion_code: "",
    male: PLATFORM_PARAMETERS.defaultSexMale,
    female: 100 - PLATFORM_PARAMETERS.defaultSexMale,
    category: undefined,
    description: undefined,
    text_limit: PLATFORM_PARAMETERS.defaultTextLimit,
    region: [],
    language: [],
    age: [],
    format: [],
  };

  const { handleSubmit, setValue, getValues, watch, reset } =
    useForm<IAddChannelData>({
      defaultValues: defaultValues,
    });
  const formFields = watch();

  const { data: categories } = useGetCompanyCategoriesQuery(contentRes);
  const { data: ages } = useGetChannelAgesQuery(contentRes);
  const { data: regions } = useGetChannelRegionsQuery(contentRes);
  const { data: languages } = useGetChannelLanguagesQuery(contentRes);

  return (
    <AccordionItem
      value={`item-adminChannel-${card?.id}`}
      className={styles.wrapper}
      ref={(el) => (accordionRefs.current[index] = el)}
    >
      <div className={styles.top}>
        <div className={styles.info}>
          <div className={styles.logo}>
            <img src={card?.avatar || ""} alt="channel_avatar" />
          </div>
          <div className={styles.title}>
            <p className="truncate">{card?.name}</p>
            <span className="truncate" onClick={() => handleCopyLink(card?.id)}>
              # {card?.id}
            </span>
          </div>
        </div>
        <div className={`${styles.column} ${styles.user}`}>
          <p className="truncate" onClick={() => handleCopyLink(card?.userId)}>
            №{card?.userId}
          </p>
        </div>
        <div className={styles.column}>
          <p>
            {t(
              platformTypes.find((item) => item.id === card?.platform)?.name ||
                "",
            )}
          </p>
        </div>
        <div className={styles.column}>
          <p>{card?.date}</p>
        </div>
        <div
          className={`${styles.status} ${
            card?.status === channelStatus.active
              ? styles.active
              : card?.status === channelStatus.moderation
                ? styles.moderation
                : card?.status === channelStatus.banned
                  ? styles.banned
                  : card?.status === channelStatus.inactive
                    ? styles.inactive
                    : styles.moderationReject
          }`}
        >
          <p className="truncate">
            {t(
              adminChannelStatus.find((item) => item.id === card?.status)
                ?.name || "",
            )}
          </p>
        </div>
        <div className={styles.settings}>
          <ChannelCardMenu id={card?.id} />
          <AccordionTrigger className={styles.trigger}>
            <div className="arrow">
              <ArrowSmallVerticalIcon className="icon__grey rotate__down" />
            </div>
          </AccordionTrigger>
        </div>
      </div>
      <AccordionContent className={styles.content}>
        <div className={styles.info}>
          <div className={styles.info__top}>
            <div className={styles.block}>
              <p>{t("admin_panel.channels.card.rate")}:</p>
              <span>{card?.rate || 0}</span>
            </div>
            <div className={styles.block}>
              <p>{t("admin_panel.channels.card.complete")}:</p>
              <span>{card?.complete || 0}</span>
            </div>
            <div className={styles.block}>
              <p>{t("admin_panel.channels.card.complaints")}:</p>
              <span>{card?.complaints || 0}</span>
            </div>
          </div>
          <div className={styles.info__bottom}>
            <div className={styles.block}>
              <p>{t("admin_panel.channels.card.on_hold")}:</p>
              <span>{card?.on_hold || 0}</span>
            </div>
            <div className={styles.block}>
              <p>{t("admin_panel.channels.card.cancel")}:</p>
              <span>{card?.cancel || 0}</span>
            </div>
            <div className={styles.block}>
              <p>{t("admin_panel.channels.card.not_complete")}:</p>
              <span>{card?.not_complete || 0}</span>
            </div>
            <div className={styles.block}>
              <p>{t("admin_panel.channels.card.in_progress")}:</p>
              <span>{card?.in_progress || 0}</span>
            </div>
          </div>
        </div>
        <div className={styles.description}>
          <p>{t("admin_panel.channels.card.description")}</p>
          <div>
            <span>{card?.description}</span>
          </div>
        </div>
        <div className={styles.parameters}>
          <div className={styles.block}>
            <SelectOptions
              onChange={setValue}
              options={categories?.contents || []}
              single={true}
              type={channelParameterData.category}
              textData={"catalog.category"}
              isRow={true}
              isCatalog={true}
              defaultValues={
                (categories?.contents || []).find(
                  (item) => item.id === formFields.category,
                )!
              }
            />
          </div>
          <div className={styles.block}>
            <SelectOptions
              onChange={setValue}
              getValues={getValues}
              options={ages?.contents || []}
              single={false}
              type={channelParameterData.age}
              textData={"catalog.age"}
              isRow={true}
              isCatalog={true}
              defaultValues={formFields.age}
            />
          </div>

          <div className={styles.block}>
            <SelectOptions
              onChange={setValue}
              getValues={getValues}
              options={languages?.contents || []}
              single={false}
              type={channelParameterData.language}
              textData={"catalog.languages"}
              isRow={true}
              isCatalog={true}
              defaultValues={formFields.language}
            />
          </div>
          <div className={styles.block}>
            <SelectOptions
              onChange={setValue}
              getValues={getValues}
              options={regions?.contents || []}
              single={false}
              type={channelParameterData.region}
              textData={"catalog.region"}
              isRow={true}
              isCatalog={true}
              defaultValues={formFields.region}
            />
          </div>
          <div className={styles.block}>
            <SelectSex
              onChange={setValue}
              getValues={getValues}
              title={"catalog.sex.title"}
              isRow={true}
              isCatalog={true}
              defaultValues={formFields.male}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          {card?.status === channelStatus.active ? (
            <>
              <BanChannel id={card?.id} />
              <UpdateChannel id={card?.id} />
            </>
          ) : card?.status === channelStatus.moderation ? (
            <>
              <RejectChannel id={card?.id} />
              <AcceptChannel id={card?.id} />
            </>
          ) : card?.status === channelStatus.banned ? (
            <>
              <RejectChannel id={card?.id} />
              <AcceptChannel id={card?.id} />
            </>
          ) : card?.status === channelStatus.inactive ? (
            <>
              <RejectChannel id={card?.id} />
              <AcceptChannel id={card?.id} />
            </>
          ) : (
            <>
              <RejectChannel id={card?.id} />
              <AcceptChannel id={card?.id} />
            </>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
