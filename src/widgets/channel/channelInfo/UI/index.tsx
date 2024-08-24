import {
  channelData,
  IReadChannelData,
  PLATFORM_PARAMETERS,
  useGetChannelByIdQuery,
} from "@entities/channel";
import { platformTypesNum } from "@entities/platform";
import {
  getCatalogReq,
  ICatalogChannel,
  sortingFilter,
  useGetCatalogQuery,
} from "@entities/project";
import {
  INTERSECTION_ELEMENTS,
  Languages,
  PAGE_ANIMATION,
  STATS,
} from "@shared/config";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { AddToCart, SkeletonChannelAddToCart } from "./addToCart";
import { Information } from "./information";
import { RecommendationList } from "./recommendationList";
import styles from "./styles.module.scss";

interface ChannelInfoProps {}

export const ChannelInfo: FC<ChannelInfoProps> = () => {
  const { id: channel_id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const guestId = Cookies.get("guest_id");

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

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Information
            card={channel}
            statistics={STATS}
            isLoading={isLoading}
          />
          {!isLoading ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={PAGE_ANIMATION.animationRight}
            >
              <AddToCart card={channel} />
            </motion.div>
          ) : (
            <SkeletonChannelAddToCart />
          )}
        </div>
        <RecommendationList
          cards={cards}
          isLoading={isRecommendCardsLoading}
          onChangeCard={handleChangeCards}
          changePage={handleOnChangePage}
        />
      </div>
    </div>
  );
};
