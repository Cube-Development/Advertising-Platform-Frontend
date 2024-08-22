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
import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { AddToCart } from "./addToCart";
import { Information } from "./information";
import { ReccomendationList } from "./reccomendationList";
import styles from "./styles.module.scss";

interface ChannelInfoProps {}

export const ChannelInfo: FC<ChannelInfoProps> = () => {
  // const channel_id = "68e794a4-2cc6-4722-8a15-4144cbd53da6";
  const { id: channel_id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const elements = INTERSECTION_ELEMENTS.reccomendCards;
  const { watch, reset, setValue, getValues } = useForm<getCatalogReq>({
    defaultValues: {
      language: language?.id || Languages[0].id,
      page: 1,
      elements_on_page: elements,
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

  const guestId = Cookies.get("guest_id");
  const formFields = watch();
  const { filter, sort, language: lang } = formFields;

  const { data: card } = useGetChannelByIdQuery({
    channel_id: channel_id || "",
    language: language?.id || Languages[0].id,
  });

  const { data: reccomendCards, isFetching: isCatalogLoading } =
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
          <Information card={channel} />
          <AddToCart card={channel} />
        </div>
        <ReccomendationList
          cards={cards}
          onChangeCard={handleChangeCards}
          changePage={handleOnChangePage}
        />
      </div>
    </div>
  );
};
