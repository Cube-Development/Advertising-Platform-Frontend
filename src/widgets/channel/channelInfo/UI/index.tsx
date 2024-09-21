import {
  channelData,
  Description,
  IReadChannelData,
  Parameters,
  PLATFORM_PARAMETERS,
  SkeletonChannelDescription,
  SkeletonChannelParameters,
  SkeletonChannelStatistics,
  Statistics,
  useGetChannelByIdQuery,
} from "@entities/channel";
import { platformTypesNum } from "@entities/platform";
import {
  getCatalogReq,
  ICatalogChannel,
  IFormat,
  sortingFilter,
  useGetCatalogQuery,
} from "@entities/project";
import { roles } from "@entities/user";
import {
  BREAKPOINT,
  INTERSECTION_ELEMENTS,
  Languages,
  PAGE_ANIMATION,
} from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { AddToCart, SkeletonChannelAddToCart } from "./addToCart";
import { RecommendationList } from "./recommendationList";
import { Reviews } from "./reviews";
import styles from "./styles.module.scss";

interface ChannelInfoProps {}

export const ChannelInfo: FC<ChannelInfoProps> = () => {
  const { id: channel_id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const guestId = Cookies.get("guest_id");
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const { role } = useAppSelector((state) => state.user);

  const { watch, reset, setValue, getValues } = useForm<getCatalogReq>({
    defaultValues: {
      language: language?.id || Languages[0].id,
      page: 1,
      elements_on_page: INTERSECTION_ELEMENTS.recommendCardsChannel,
      filter: {
        platform: platformTypesNum.telegram,
        male: PLATFORM_PARAMETERS.defaultSexMale,
        female: 100 - PLATFORM_PARAMETERS.defaultSexMale,
        business: [],
        age: [],
        language: [],
        region: [],
      },
      sort: sortingFilter.price_down,
    },
  });

  const formFields = watch();
  const { filter, sort, language: lang } = formFields;

  const { data: card, isLoading } = useGetChannelByIdQuery({
    channel_id: channel_id || "",
    language: language?.id || Languages[0].id,
  });

  const { data: reccomendCards, isFetching: isRecommendCardsLoading } =
    useGetCatalogQuery({
      ...formFields,
      guest_id: guestId,
    });

  const [cards, setCards] = useState<ICatalogChannel[]>(
    reccomendCards?.channels || [],
  );

  const [channel, setChannel] = useState<IReadChannelData>(card!);

  useEffect(() => {
    if (card) {
      setChannel(card);
    }
  }, [card]);

  useEffect(() => {
    if (reccomendCards) {
      setCards([...cards, ...reccomendCards.channels]);
    }
  }, [reccomendCards]);

  const handleOnChangePage = () => {
    setValue(channelData.page, formFields.page + 1);
  };

  const handleChangeCards = (cartChannel: ICatalogChannel) => {};

  const [selectedFormat, setSelectedFormat] = useState<IFormat | null>(null);

  const handleChangeFormat = (selectedValue: IFormat) => {
    setSelectedFormat(selectedValue);
  };

  useEffect(() => {
    if (card) {
      setSelectedFormat(card?.format[0]);
    }
  }, [card?.format[0]]);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let custom = 0;
  return (
    <>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <motion.div
              className={styles.info__wrapper}
              initial="hidden"
              animate="visible"
            >
              <div className={styles.info}>
                {!isLoading ? (
                  <>
                    <motion.div
                      custom={custom++}
                      variants={PAGE_ANIMATION.animationLeft}
                    >
                      <Description card={card!} />
                    </motion.div>
                    <motion.div
                      custom={custom++}
                      variants={PAGE_ANIMATION.animationLeft}
                    >
                      <Parameters card={card!} />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <SkeletonChannelDescription />
                    <SkeletonChannelParameters />
                  </>
                )}
                {screen <= BREAKPOINT.LG && role !== roles.blogger && (
                  <>
                    {!isLoading ? (
                      <>
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          custom={custom++}
                          variants={PAGE_ANIMATION.animationRight}
                        >
                          <AddToCart
                            card={channel}
                            selectedFormat={selectedFormat!}
                            changeFormat={handleChangeFormat}
                          />
                        </motion.div>
                      </>
                    ) : (
                      <SkeletonChannelAddToCart />
                    )}
                  </>
                )}
              </div>
              <div>
                {!isLoading ? (
                  <motion.div
                    custom={custom++}
                    variants={PAGE_ANIMATION.animationLeft}
                  >
                    <Statistics card={card!} selectedFormat={selectedFormat!} />
                  </motion.div>
                ) : (
                  <SkeletonChannelStatistics />
                )}
              </div>

              <Reviews isLoadingReviews={isLoading} card={card!} />
            </motion.div>

            {screen > BREAKPOINT.LG && role !== roles.blogger && (
              <>
                {!isLoading ? (
                  <>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={PAGE_ANIMATION.animationRight}
                    >
                      <AddToCart
                        card={channel}
                        selectedFormat={selectedFormat!}
                        changeFormat={handleChangeFormat}
                      />
                    </motion.div>
                  </>
                ) : (
                  <SkeletonChannelAddToCart />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {role !== roles.blogger && (
        <RecommendationList
          cards={cards}
          isLoading={isRecommendCardsLoading}
          onChangeCard={handleChangeCards}
          changePage={handleOnChangePage}
        />
      )}
    </>
  );
};
