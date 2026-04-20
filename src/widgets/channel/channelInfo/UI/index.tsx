import {
  Description,
  Parameters,
  SkeletonChannelDescription,
  SkeletonChannelParameters,
  SkeletonChannelStatistics,
  Statistics,
} from "@entities/channel";
import { ENUM_ROLES } from "@entities/user";
import { BREAKPOINT, PAGE_ANIMATION } from "@shared/config";
import { motion } from "framer-motion";
import { FC } from "react";
import { AddToCart, SkeletonChannelAddToCart } from "./addToCart";
import { RecommendationList } from "./recommendationList";
import { Reviews } from "./reviews";
import styles from "./styles.module.scss";
import { ChannelCart } from "./cart";
import { useChannelInfo } from "../model";
import { ClearActiveProject } from "@features/project";
import { useTranslation } from "react-i18next";

interface ChannelInfoProps {}

export const ChannelInfo: FC<ChannelInfoProps> = () => {
  const { t } = useTranslation();
  const {
    isLoading,
    card,
    channel,
    selectedFormat,
    handleChangeFormat,
    handleChangeCartCards,
    isCartActionLoading,
    currentCart,
    role,
    isFetchingCart,
    screen,
    recomendCards,
    isRecommendCardsLoading,
    handleChangeRecommendCards,
    handleOnChangePage,
    projectId,
  } = useChannelInfo();

  let custom = 0;
  return (
    <>
      <div className="container">
        <div className={styles.wrapper}>
          <ClearActiveProject
            projectId={projectId}
            i18nKey="channel.badge.text"
          />
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
                {screen <= BREAKPOINT.LG && role !== ENUM_ROLES.BLOGGER && (
                  <>
                    {!isLoading ? (
                      <>
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          custom={custom++}
                          variants={PAGE_ANIMATION.animationRight}
                        >
                          <div className="space-y-6 sticky top-var(--sticky-blog-top) right-0">
                            <AddToCart
                              card={channel}
                              selectedFormat={selectedFormat!}
                              changeFormat={handleChangeFormat}
                              onChange={handleChangeCartCards}
                              isLoading={isCartActionLoading}
                            />
                            {currentCart && currentCart?.count > 0 ? (
                              <ChannelCart
                                cart={currentCart}
                                role={role}
                                isLoading={isFetchingCart}
                              />
                            ) : null}
                          </div>
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

            {screen > BREAKPOINT.LG && role !== ENUM_ROLES.BLOGGER && (
              <>
                {!isLoading ? (
                  <>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={PAGE_ANIMATION.animationRight}
                    >
                      <div className="space-y-6 sticky top-var(--sticky-blog-top) right-0">
                        <AddToCart
                          card={channel}
                          selectedFormat={selectedFormat!}
                          changeFormat={handleChangeFormat}
                          onChange={handleChangeCartCards}
                          isLoading={isCartActionLoading}
                        />
                        {currentCart && currentCart?.count > 0 ? (
                          <ChannelCart
                            cart={currentCart}
                            role={role}
                            isLoading={isFetchingCart}
                          />
                        ) : null}
                      </div>
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
      {/* {role !== ENUM_ROLES.BLOGGER && (
        <RecommendationList
          cards={recomendCards?.channels || []}
          isLoading={isRecommendCardsLoading}
          onChangeCard={handleChangeRecommendCards}
          changePage={handleOnChangePage}
        />
      )} */}
    </>
  );
};
