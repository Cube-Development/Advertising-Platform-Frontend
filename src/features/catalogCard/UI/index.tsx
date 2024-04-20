import { FC, useState } from "react";
import styles from "./styles.module.scss";
import {
  ICatalogCard,
  IChangeCards,
  IFormat,
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
import { pageFilter } from "@shared/config/pageFilter";

interface CatalogCardProps extends IChangeCards, ICatalogCard {
  card: IPlatform;
  page?: pageFilter.cart;
}

export const CatalogCard: FC<CatalogCardProps> = ({
  card,
  AddToBasketBtn,
  FormatList,
  onChangeCard,
  page,
}) => {
  const { t } = useTranslation();
  const startFormat: IFormat = card.selected_format
    ? card.format.find(
        (format) => format.format === card.selected_format?.format,
      )!
    : card.format[0];
  const [selectedFormat, setSelectedFormat] = useState<IFormat>(startFormat);

  const handleChangeFormat = (selectedValue: IFormat) => {
    setSelectedFormat(selectedValue);
    if (
      card.selected_format &&
      card.selected_format.format !== selectedValue.format
    ) {
      onChangeCard({
        ...card,
        selected_format: selectedValue,
      });
    }
  };

  const handleChangeCard = () => {
    onChangeCard({
      ...card,
      selected_format: selectedFormat,
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
              <span>{selectedFormat.views!.toLocaleString()}</span>
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
                {selectedFormat.cpv!.toLocaleString()} {t(`symbol`)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.channel__cross}>
          <p>{t("platform.cross")}</p>
          <div
            className={styles.circle}
            style={{ "--percentage": `${card.match}%` } as React.CSSProperties}
          >
            <span>{card.match}%</span>
          </div>
          <div className={styles.platform__icon}>
            {card.platform && card.platform in platformToIcon
              ? platformToIcon[card.platform!]()
              : "..."}
          </div>
        </div>
      </div>
      <AddToBasketBtn
        selectedFormat={selectedFormat}
        FormatList={FormatList}
        changeFormat={handleChangeFormat}
        changeCard={handleChangeCard}
        card={card}
        page={page}
      />
    </div>
  );
};
8;
