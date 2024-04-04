import { FC, ReactElement, useState } from "react";
import styles from "./styles.module.scss";
import {
  IAddCart,
  IAddToBasketProps,
  ICatalogCard,
  IChangeCards,
  IFormat,
  IFormatListProps,
  IPlatform,
} from "@shared/types/platform";
import {
  EyeIcon,
  ManIcon,
  RatingIcon,
  SubsIcon,
  WomanIcon,
} from "@shared/assets";
import { useTranslation } from "react-i18next";
import { platformToIcon } from "@shared/config/platformData";

interface CatalogCardProps extends IChangeCards, ICatalogCard {
  card: IPlatform;
  // onChangeCard: (channel: IAddCart) => void;
  // AddToBasketBtn: FC<IAddToBasketProps>;
  // FormatList: FC<IFormatListProps>;
  // isCart?: boolean;
}

export const CatalogCard: FC<CatalogCardProps> = ({
  card,
  AddToBasketBtn,
  FormatList,
  onChangeCard,
  isCart,
}) => {
  const { t } = useTranslation();
  const [selectedFormat, setSelectedFormat] = useState<IFormat>(card.format[0]);

  const handleChangeFormat = (selectedValue: IFormat) => {
    setSelectedFormat(selectedValue);
  };

  const handleChangeCard = () => {
    onChangeCard({
      channel: {
        channel_id: card.id,
        format: selectedFormat.format,
      },
      format: selectedFormat,
    });
  };

  return (
    <div className={styles.channel}>
      <div className={styles.channel__top}>
        <div className={styles.channel__logo}>
          <div>
            <img src={card.avatar} alt="" />
          </div>
          <div className={styles.rate}>
            <RatingIcon />
          </div>
        </div>

        <div className={styles.channel__description}>
          <div className={styles.description}>
            <h1>{card.name}</h1>
            <p>{card.category}</p>
            <span>{card.description}</span>
          </div>
        </div>

        <div className={styles.channel__info}>
          <div className={styles.channel__info_row}>
            <div className={styles.info}>
              <div>
                <SubsIcon />
              </div>
              <span>{card.subscribers.toLocaleString()}</span>
            </div>
            <div className={styles.info}>
              <div>
                <EyeIcon />
              </div>
              <span>{selectedFormat.views.toLocaleString()}</span>
            </div>
          </div>
          <div className={styles.channel__info_middle}>
            <div>
              <ManIcon />
            </div>
            <div
              className="colorline"
              style={{ "--male": `${card.male}%` } as React.CSSProperties}
              data-male={`${card.male}%`}
              data-female={`${card.female}%`}
            />
            <div>
              <WomanIcon />
            </div>
          </div>
          <div className={styles.channel__info_row}>
            <div className={styles.info}>
              <p>ER:</p>
              <span>{selectedFormat.er}%</span>
            </div>
            <div className={styles.info}>
              <p>CPV:</p>
              <span>
                {selectedFormat.cpv.toLocaleString()} {t(`symbol`)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.channel__cross}>
          <p>{t("platform.cross")}</p>
          <div
            className={styles.circle}
            style={{ "--percentage": `${89}%` } as React.CSSProperties}
          >
            <span>89 %</span>
          </div>
          <div className={styles.platform__icon}>
            {platformToIcon.hasOwnProperty(card.platform)
              ? platformToIcon[card.platform]()
              : null}
          </div>
        </div>
      </div>

      {/* <div className={styles.channel_bottom}> */}
      <AddToBasketBtn
        formats={card.format}
        selectedFormat={selectedFormat}
        FormatList={FormatList}
        changeFormat={handleChangeFormat}
        сhangeCard={handleChangeCard}
        isCart={isCart}
      />
      {/* </div> */}
    </div>
  );
};
8;
