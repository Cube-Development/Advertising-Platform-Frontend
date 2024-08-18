import {
  ICatalogCard,
  ICatalogChannel,
  IChangeCards,
  IFormat,
} from "@entities/project";
import {
  ArrowSmallVerticalIcon,
  BoyIcon,
  EyeIcon,
  FeatherIcon,
  GirlIcon,
  ProtectIcon2,
  RatingIcon,
  StarIcon4,
  SubsIcon,
} from "@shared/assets";
import { pageFilter } from "@shared/routing";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ReccomendCardProps extends IChangeCards, ICatalogCard {
  card: ICatalogChannel;
  page?: pageFilter.cart;
}

export const ReccomendCard: FC<ReccomendCardProps> = ({
  card,
  AddToBasketBtn,
  FormatList,
  onChangeCard,
  page,
}) => {
  const { t } = useTranslation();
  const startFormat: IFormat = card?.selected_format
    ? card.format.find(
        (format) => format?.format === card.selected_format?.format,
      )!
    : card.format[0];
  const [selectedFormat, setSelectedFormat] = useState<IFormat>(startFormat);
  const [isSubcardOpen, setSubcardOpen] = useState(false);

  const handleChangeOpenSubcard = (): void => {
    setSubcardOpen(!isSubcardOpen);
  };

  const handleChangeFormat = (selectedValue: IFormat) => {
    setSelectedFormat(selectedValue);
    if (
      card?.selected_format &&
      card?.selected_format?.format !== selectedValue?.format
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
    <div className={styles.wrapper}>
      <div className={styles.channel}>
        <div className={styles.channel__top}>
          <div className={styles.column__logo}>
            <div className={styles.logo}>
              <div>
                <img src={card?.avatar} alt="logo" />
              </div>
            </div>
          </div>
          <div className={styles.column__info}>
            <div className={styles.info}>
              <p className={styles.title}>{card?.name}</p>
              <p className={styles.category}>{card?.category}</p>
              <div className={styles.rate}>
                <RatingIcon />
              </div>
            </div>
          </div>
          <div className={styles.column__parameters}>
            <FeatherIcon />
            <ProtectIcon2 />
            <StarIcon4 />
          </div>
        </div>
        <span className={styles.description}>{card?.description}</span>
        <AccordionItem value={`item-${card.id}`} className={styles.channel__xs}>
          <div className={styles.channel__data__xs}>
            <div className={styles.channel__data_row}>
              <div className={styles.data}>
                <div>
                  <SubsIcon />
                </div>
                <span>{card?.subscribers?.toLocaleString()}</span>
              </div>
              <div className={styles.data}>
                <div>
                  <EyeIcon />
                </div>
                <span>{selectedFormat?.views!.toLocaleString()}</span>
              </div>
            </div>
            <AccordionContent className={styles.channel__content}>
              <div className={styles.channel__data_middle}>
                <div className={styles.middle}>
                  <div>
                    <BoyIcon />
                  </div>
                  <div
                    className="colorline"
                    style={
                      { "--male": `${card?.male}%` } as React.CSSProperties
                    }
                    data-male={`${card?.male}%`}
                    data-female={`${card?.female}%`}
                  />
                  <div>
                    <GirlIcon />
                  </div>
                </div>
              </div>
              <div className={styles.channel__data_row}>
                <div className={styles.data}>
                  <p>ER:</p>
                  <span>{selectedFormat?.er}%</span>
                </div>
                <div className={styles.data}>
                  <p>CPV:</p>
                  <span>
                    {selectedFormat?.cpv!.toLocaleString()} {t(`symbol`)}
                  </span>
                </div>
              </div>
            </AccordionContent>
          </div>
          <AccordionTrigger
            onClick={handleChangeOpenSubcard}
            className={styles.channel__data__xs__bottom}
          >
            <p>
              {isSubcardOpen ? t("catalog.see_less") : t("catalog.see_more")}
            </p>
            <ArrowSmallVerticalIcon
              className={
                isSubcardOpen
                  ? "active__icon rotate"
                  : "active__icon rotate__down"
              }
            />
          </AccordionTrigger>
        </AccordionItem>
      </div>

      <AddToBasketBtn
        isSmall={true}
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
