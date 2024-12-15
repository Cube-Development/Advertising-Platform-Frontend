import {
  adminChannelStatus,
  channelStatus,
  IAdminChannelData,
  useGetAdminChannelInfoQuery,
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
  UnbanChannel,
  UpdateChannel,
} from "@features/adminPanel";
import { SelectDescription, SelectOptions, SelectSex } from "@features/other";
import { ArrowSmallVerticalIcon } from "@shared/assets";
import { Languages } from "@shared/config";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccountsLoader,
  useToast,
} from "@shared/ui";
import { FC, MutableRefObject, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import styles from "./styles.module.scss";
import noUserAvatar from "/images/notFound/noUserAvatar.jpg";
import { IFormat } from "@entities/project";

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

  const handleCopyLink = (text: string | number = "") => {
    navigator.clipboard.writeText(text.toString());
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

  const [isSubcardOpen, setSubcardOpen] = useState(false);

  const { data: channel, isLoading } = useGetAdminChannelInfoQuery(
    { id: card?.channel?.id },
    {
      skip: !isSubcardOpen,
    },
  );

  const handleChangeOpenSubcard = (): void => {
    setSubcardOpen(!isSubcardOpen);
  };

  useEffect(() => {
    if (channel) {
      reset({
        male: channel?.male,
        female: channel?.female,
        category: channel?.category?.id,
        description: channel?.description,
        text_limit: channel?.text_limit,
        region: channel?.region?.map((item) => item?.id),
        language: channel?.language?.map((item) => item?.id),
        age: channel?.age?.map((item) => item?.id),
        format: channel?.format?.map((format: IFormat) => ({
          name: format?.format,
          price: format?.price,
        })),
      });
    }
  }, [channel, reset]);

  return (
    <AccordionItem
      value={`item-adminChannel-${card?.channel?.id}`}
      className={styles.wrapper}
      ref={(el) => (accordionRefs.current[index] = el)}
    >
      <div className={styles.top}>
        <div className={styles.info}>
          <div className={styles.logo}>
            <img
              src={card?.channel?.avatar || noUserAvatar}
              alt="channel_avatar"
            />
          </div>
          <div className={styles.title}>
            <p className="truncate">{card?.channel?.name}</p>
            <span
              className="truncate"
              onClick={() => handleCopyLink(card?.channel?.id)}
            >
              # {card?.channel?.id}
            </span>
          </div>
        </div>
        <div className={`${styles.column} ${styles.user}`}>
          <p
            className="truncate"
            onClick={() => handleCopyLink(card?.owner_id)}
          >
            №{card?.owner_id}
          </p>
        </div>
        <div className={styles.column}>
          <p>
            {t(
              platformTypes.find((item) => item.id === card?.channel?.platform)
                ?.name || "",
            )}
          </p>
        </div>
        <div className={styles.column}>
          <p>{card?.created}</p>
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
          <ChannelCardMenu id={card?.channel?.id} />
          <AccordionTrigger
            className={styles.trigger}
            onClick={() => handleChangeOpenSubcard()}
          >
            {isLoading ? (
              <div className={styles.loader}>
                <AccountsLoader />
              </div>
            ) : (
              <div className="arrow">
                <ArrowSmallVerticalIcon className="icon__grey rotate__down" />
              </div>
            )}
          </AccordionTrigger>
        </div>
      </div>
      <AccordionContent className={styles.content}>
        {!!channel && (
          <>
            <div className={styles.info}>
              <div className={styles.info__top}>
                <div className={styles.block}>
                  <p>{t("admin_panel.channels.card.rate")}:</p>
                  <span>{channel?.grade || 0}</span>
                </div>
                <div className={styles.block}>
                  <p>{t("admin_panel.channels.card.complete")}:</p>
                  <span>{channel?.complete || 0}</span>
                </div>
                <div className={styles.block}>
                  <p>{t("admin_panel.channels.card.complaints")}:</p>
                  <span>{channel?.complaints || 0}</span>
                </div>
              </div>
              <div className={styles.info__bottom}>
                <div className={styles.block}>
                  <p>{t("admin_panel.channels.card.on_hold")}:</p>
                  <span>{channel?.on_hold || 0}</span>
                </div>
                <div className={styles.block}>
                  <p>{t("admin_panel.channels.card.cancel")}:</p>
                  <span>{channel?.cancel || 0}</span>
                </div>
                <div className={styles.block}>
                  <p>{t("admin_panel.channels.card.not_complete")}:</p>
                  <span>{channel?.not_complete || 0}</span>
                </div>
                <div className={styles.block}>
                  <p>{t("admin_panel.channels.card.in_progress")}:</p>
                  <span>{channel?.in_progress || 0}</span>
                </div>
              </div>
            </div>
            <SelectDescription
              onChange={setValue}
              type={channelParameterData.description}
              title={"add_platform.description.description.title"}
              text={"add_platform.description.description.text"}
              placeholder={"add_platform.description.description.default_value"}
              defaultValues={channel?.description}
            />
            <div className={styles.parameters}>
              <div className={styles.block}>
                <SelectOptions
                  onChange={setValue}
                  options={categories?.contents || []}
                  single={true}
                  type={channelParameterData.category}
                  textData={"add_platform.description.category"}
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
                  textData={"add_platform.description.age"}
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
                  textData={"add_platform.description.languages"}
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
                  textData={"add_platform.description.region"}
                  isRow={true}
                  isCatalog={true}
                  defaultValues={formFields.region}
                />
              </div>
              <div className={styles.block}>
                <SelectSex
                  onChange={setValue}
                  getValues={getValues}
                  title={"add_platform.description.sex.title"}
                  isRow={true}
                  isCatalog={true}
                  defaultValues={formFields.male}
                />
              </div>
            </div>
            <div className={styles.buttons}>
              {card?.status === channelStatus.active ? (
                <>
                  <BanChannel id={card?.channel?.id} />
                  <UpdateChannel id={card?.channel?.id} />
                </>
              ) : card?.status === channelStatus.moderation ? (
                <>
                  <RejectChannel id={card?.channel?.id} />
                  <AcceptChannel id={card?.channel?.id} />
                </>
              ) : card?.status === channelStatus.banned ? (
                <>
                  <UnbanChannel id={card?.channel?.id} />
                  <UpdateChannel id={card?.channel?.id} disabled={true} />
                </>
              ) : card?.status === channelStatus.inactive ? (
                <>
                  <RejectChannel id={card?.channel?.id} />
                  <AcceptChannel id={card?.channel?.id} />
                </>
              ) : (
                <>
                  <RejectChannel id={card?.channel?.id} />
                  <AcceptChannel id={card?.channel?.id} />
                </>
              )}
            </div>
          </>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
