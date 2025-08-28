import { addChannelQueries } from "@entities/channel";
import { ENUM_ROLES, TYPE_USER_ROLES } from "@entities/user";
import { AddChannel } from "@features/channel";
import { SeeCatalog } from "@features/mainPages";
import { PAGE_ANIMATION } from "@shared/config/animation";
import { ENUM_PATHS } from "@shared/routing";
import { ITextBlock } from "@shared/types";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Element } from "react-scroll";
import { OptionCard } from "./UI";
import styles from "./cta.module.scss";
import { CONFIG } from "./model";

interface CtaProps {
  role: TYPE_USER_ROLES;
}

export const Cta: FC<CtaProps> = ({ role }) => {
  const { t } = useTranslation();
  let custom: number = 0;
  const {
    text: text_block,
    background: main_background,
    options: getOptions,
  } = CONFIG[role];

  const text = t(text_block, { returnObjects: true }) as ITextBlock;

  const OPTIONS = getOptions(text?.options);

  return (
    <Element name="registration" className="container">
      <motion.div
        id="registration"
        initial="hidden"
        whileInView="visible"
        viewport={PAGE_ANIMATION.viewport}
        className={styles.wrapper}
      >
        <div className={styles.cta}>
          <div className={styles.cta__content}>
            <motion.h1
              custom={custom++}
              variants={PAGE_ANIMATION.animationLeft}
              className={styles.cta__content__title}
            >
              {text?.title}
            </motion.h1>
            <motion.h2
              custom={custom++}
              variants={PAGE_ANIMATION.animationLeft}
              className={`gradient_color ${styles.cta__content__subtitle}`}
            >
              {text?.subtitle}
            </motion.h2>
          </div>
          <div className={styles.cta__options}>
            {OPTIONS.map((option, index) => (
              <OptionCard key={index} option={option} custom={custom++} />
            ))}
          </div>
          <motion.div
            custom={custom++}
            variants={PAGE_ANIMATION.animationLeft}
            className={styles.cta__button}
          >
            {role === ENUM_ROLES.ADVERTISER ? (
              <SeeCatalog />
            ) : (
              <AddChannel
                path={buildPathWithQuery(ENUM_PATHS.ADD_CHANNEL, {
                  [queryParamKeys.addChannel]: addChannelQueries.main,
                })}
              />
            )}
          </motion.div>
        </div>
        <div className={styles.wrapper__image}>
          <img src={main_background} alt="main background" />
        </div>
      </motion.div>
    </Element>
  );
};
