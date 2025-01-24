import {
  Description,
  IReadChannelData,
  Parameters,
  SkeletonChannelDescription,
  SkeletonChannelParameters,
  SkeletonChannelStatistics,
  Statistics,
  useGetChannelByIdQuery,
} from "@entities/channel";
import {
  catalogAPI,
  getRecommendChannels,
  ICatalogChannel,
  IFormat,
  useAddToCommonCartMutation,
  useAddToManagerCartMutation,
  useAddToPublicCartMutation,
  useGetRecommedChannelsQuery,
  useRemoveFromCommonCartMutation,
  useRemoveFromManagerCartMutation,
  useRemoveFromPublicCartMutation,
} from "@entities/project";
import { GenerateGuestId, roles } from "@entities/user";
import { BREAKPOINT, Languages, PAGE_ANIMATION } from "@shared/config";
import { useAppDispatch, useAppSelector, useWindowWidth } from "@shared/hooks";
import { ToastAction, useToast } from "@shared/ui";
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
  const userId = Cookies.get("user_id");
  const guestId = Cookies.get("guest_id") || GenerateGuestId();
  const projectId = Cookies.get("project_id");

  const { id: channel_id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const screen = useWindowWidth();
  const { isAuth, role } = useAppSelector((state) => state.user);

  const { watch } = useForm<getRecommendChannels>({
    defaultValues: {
      language: language?.id || Languages[0].id,
      channels: [channel_id],
    },
  });

  const formFields = watch();

  const baseParams = {
    channel_id: channel_id || "",
    language: language?.id || Languages[0].id,
  };

  const channelInfoParams =
    userId && role !== roles.manager
      ? { ...baseParams, user_id: userId }
      : projectId && role === roles.manager
        ? { ...baseParams, project_id: projectId }
        : { ...baseParams, guest_id: guestId };

  const { data: card, isLoading } = useGetChannelByIdQuery(channelInfoParams);

  const { data: recomendCards, isFetching: isRecommendCardsLoading } =
    useGetRecommedChannelsQuery(
      { ...formFields },
      {
        skip: role === roles.blogger,
      }
    );

  const [channel, setChannel] = useState<IReadChannelData>(card!);

  // commonCart
  const [addToCommonCart] = useAddToCommonCartMutation();
  const [removeFromCommonCart] = useRemoveFromCommonCartMutation();
  // publicCart
  const [addToPublicCart] = useAddToPublicCartMutation();
  const [removeFromPublicCart] = useRemoveFromPublicCartMutation();
  // managerCart
  const [addToManagerCart] = useAddToManagerCartMutation();
  const [removeFromManagerCart] = useRemoveFromManagerCartMutation();

  const [selectedFormat, setSelectedFormat] = useState<IFormat | undefined>(
    channel?.selected_format
  );

  useEffect(() => {
    if (card) {
      setChannel(card);
    }
  }, [card]);

  const handleOnChangePage = () => {
    // setValue(channelParameterData.page, formFields.page + 1);
  };

  // const handleChangeCards = () => {
  // const handleNewRecommendCards = () => {
  // }
  // const handleChangeCards = (cartChannel: ICatalogChannel) => {
  //   let newCards: ICatalogChannel[] = [];
  //   const currentCard = (
  //     isAuth ? catalogAuth?.channels : catalog?.channels
  //   )?.find((card) => card.id === cartChannel?.id);

  //   const addReq = {
  //     channel_id: channel?.id!,
  //     format: selectedFormat?.format!,
  //     language: language?.id || Languages[0].id,
  //   };

  //   const removeReq = {
  //     channel_id: channel?.id!,
  //     language: language?.id || Languages[0].id,
  //   };

  //   if (channel && !channel.selected_format && selectedFormat) {
  //     const newCard = { ...channel, selected_format: selectedFormat };
  //     if (!isAuth && guestId) {
  //       addToPublicCart({ ...addReq, guest_id: guestId })
  //         .unwrap()
  //         .then((data) => {
  //           setChannel(newCard);
  //         })
  //         .catch((error) => {
  //           toast({
  //             variant: "error",
  //             title: t("toasts.catalog.add.error"),
  //             action: <ToastAction altText="Ok">Ok</ToastAction>,
  //           });
  //           console.error("Ошибка при добавлении в корзину", error);
  //         });
  //     } else if (isAuth && role === roles.advertiser) {
  //       addToCommonCart(addReq)
  //         .unwrap()
  //         .then((data) => {
  //           setChannel(newCard);
  //         })
  //         .catch((error) => {
  //           toast({
  //             variant: "error",
  //             title: t("toasts.catalog.add.error"),
  //             action: <ToastAction altText="Ok">Ok</ToastAction>,
  //           });
  //           console.error("Ошибка при добавлении в корзину", error);
  //         });
  //     } else if (isAuth && role === roles.manager && projectId) {
  //       addToManagerCart({ ...addReq, project_id: projectId })
  //         .unwrap()
  //         .then((data) => {
  //           setChannel(newCard);
  //         })
  //         .catch((error) => {
  //           toast({
  //             variant: "error",
  //             title: t("toasts.catalog.add.error"),
  //             action: <ToastAction altText="Ok">Ok</ToastAction>,
  //           });
  //           console.error("Ошибка при добавлении в корзину", error);
  //         });
  //     }
  //   } else if (
  //     channel?.selected_format?.format !== selectedFormat?.format &&
  //     selectedFormat
  //   ) {
  //     const newCard = { ...channel, selected_format: selectedFormat };
  //     if (!isAuth && guestId) {
  //       addToPublicCart({ ...addReq, guest_id: guestId })
  //         .unwrap()
  //         .then((data) => {
  //           setChannel(newCard);
  //         })
  //         .catch((error) => {
  //           toast({
  //             variant: "error",
  //             title: t("toasts.catalog.add.error"),
  //             action: <ToastAction altText="Ok">Ok</ToastAction>,
  //           });
  //           console.error("Ошибка при добавлении в корзину", error);
  //         });
  //     } else if (isAuth && role === roles.advertiser) {
  //       addToCommonCart(addReq)
  //         .unwrap()
  //         .then((data) => {
  //           setChannel(newCard);
  //         })
  //         .catch((error) => {
  //           toast({
  //             variant: "error",
  //             title: t("toasts.catalog.add.error"),
  //             action: <ToastAction altText="Ok">Ok</ToastAction>,
  //           });
  //           console.error("Ошибка при добавлении в корзину", error);
  //         });
  //     } else if (isAuth && role === roles.manager && projectId) {
  //       addToManagerCart({ ...addReq, project_id: projectId })
  //         .unwrap()
  //         .then((data) => {
  //           setChannel(newCard);
  //         })
  //         .catch((error) => {
  //           toast({
  //             variant: "error",
  //             title: t("toasts.catalog.add.error"),
  //             action: <ToastAction altText="Ok">Ok</ToastAction>,
  //           });
  //           console.error("Ошибка при добавлении в корзину", error);
  //         });
  //     }
  //   } else {
  //     const newCard = { ...channel, selected_format: undefined };
  //     if (!isAuth && guestId) {
  //       removeFromPublicCart({ ...removeReq, guest_id: guestId })
  //         .unwrap()
  //         .then((data) => {
  //           setChannel(newCard);
  //         })
  //         .catch((error) => {
  //           toast({
  //             variant: "error",
  //             title: t("toasts.catalog.remove.error"),
  //             action: <ToastAction altText="Ok">Ok</ToastAction>,
  //           });
  //           console.error("Ошибка при удалении с корзины", error);
  //         });
  //     } else if (isAuth && role === roles.advertiser) {
  //       removeFromCommonCart(removeReq)
  //         .unwrap()
  //         .then((data) => {
  //           setChannel(newCard);
  //         })
  //         .catch((error) => {
  //           toast({
  //             variant: "error",
  //             title: t("toasts.catalog.remove.error"),
  //             action: <ToastAction altText="Ok">Ok</ToastAction>,
  //           });
  //           console.error("Ошибка при удалении с корзины", error);
  //         });
  //     } else if (isAuth && role === roles.manager && projectId) {
  //       removeFromManagerCart({ ...removeReq, project_id: projectId })
  //         .unwrap()
  //         .then((data) => {
  //           setChannel(newCard);
  //         })
  //         .catch((error) => {
  //           toast({
  //             variant: "error",
  //             title: t("toasts.catalog.remove.error"),
  //             action: <ToastAction altText="Ok">Ok</ToastAction>,
  //           });
  //           console.error("Ошибка при удалении с корзины", error);
  //         });
  //     }
  //   }
  // };

  const handleSuccsessAdd = () => {};

  const handleChangeCartCards = () => {
    const currentCard = channel;
    console.log("handleChangeCartCards", currentCard);
    const cartChannel = { ...channel, selected_format: selectedFormat };
    handleChangeCards(
      cartChannel as unknown as ICatalogChannel,
      currentCard as unknown as ICatalogChannel
    );
  };

  const handleChangeRecommendCards = (cartChannel: ICatalogChannel) => {
    const currentCard = recomendCards?.channels?.find(
      (card) => card.id === cartChannel?.id
    );
    console.log("handleChangeCartCards", currentCard);
    handleChangeCards(cartChannel, currentCard);
  };

  const handleChangeCards = (
    cartChannel: ICatalogChannel,
    currentCard: ICatalogChannel | undefined
  ) => {
    if (cartChannel?.selected_format && currentCard) {
      const addReq = {
        channel_id: cartChannel?.id,
        format: cartChannel?.selected_format.format,
        match: cartChannel?.match,
        language: language?.id || Languages[0].id,
      };
      const removeReq = {
        channel_id: cartChannel?.id,
        language: language?.id || Languages[0].id,
      };
      if (
        currentCard?.selected_format?.format ===
        cartChannel?.selected_format?.format
      ) {
        const newCard = { ...channel, selected_format: undefined };
        if (!isAuth && guestId) {
          removeFromPublicCart({ ...removeReq, guest_id: guestId })
            .unwrap()
            .then(() => {
              currentCard.id === channel.id && setChannel(newCard);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.remove.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка при удалении с корзины", error);
            });
        } else if (isAuth && role === roles.advertiser) {
          removeFromCommonCart(removeReq)
            .unwrap()
            .then(() => {
              currentCard.id === channel.id && setChannel(newCard);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.remove.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка при удалении с корзины", error);
            });
        } else if (isAuth && role === roles.manager && projectId) {
          removeFromManagerCart({ ...removeReq, project_id: projectId })
            .unwrap()
            .then(() => {
              currentCard.id === channel.id && setChannel(newCard);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.remove.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка при удалении с корзины", error);
            });
        }
      } else if (
        currentCard?.selected_format?.format !==
        cartChannel?.selected_format?.format
      ) {
        const newCard = { ...channel, selected_format: selectedFormat };
        if (!isAuth && guestId) {
          addToPublicCart({ ...addReq, guest_id: guestId })
            .unwrap()
            .then(() => {
              currentCard.id === channel.id && setChannel(newCard);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.add.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка при добавлении в корзину", error);
            });
        } else if (isAuth && role === roles.advertiser) {
          addToCommonCart(addReq)
            .unwrap()
            .then(() => {
              currentCard.id === channel.id && setChannel(newCard);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.add.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка при добавлении в корзину", error);
            });
        } else if (isAuth && role === roles.manager && projectId) {
          addToManagerCart({ ...addReq, project_id: projectId })
            .unwrap()
            .then(() => {
              currentCard.id === channel.id && setChannel(newCard);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.add.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка при добавлении в корзину", error);
            });
        }
      }
      const newCards =
        recomendCards?.channels?.filter((item) => item.id !== cartChannel.id) ||
        [];
      dispatch(
        catalogAPI.util.updateQueryData(
          "getRecommedChannels",
          { ...formFields },
          (draft) => {
            draft.channels = newCards;
          }
        )
      );
    }
  };

  const handleChangeFormat = (selectedValue: IFormat) => {
    setSelectedFormat(selectedValue);
  };

  useEffect(() => {
    if (card) {
      if (card.selected_format) {
        setSelectedFormat(card?.selected_format);
      } else {
        setSelectedFormat(card?.format[0]);
      }
    }
  }, [card]);

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
                            onChange={handleChangeCartCards}
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
                        onChange={handleChangeCartCards}
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
          cards={recomendCards?.channels || []}
          isLoading={isRecommendCardsLoading}
          onChangeCard={handleChangeRecommendCards}
          changePage={handleOnChangePage}
        />
      )}
    </>
  );
};
