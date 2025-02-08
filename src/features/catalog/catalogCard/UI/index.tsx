import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { ChannelCardDescription, ChannelCardMatch } from "../components";
import {
  ICatalogCard,
  ICatalogChannel,
  IChangeCards,
  IFormat,
  platformToIcon,
} from "@entities/project";
import {
  ArrowSmallVerticalIcon,
  BoyIcon,
  EyeIcon,
  GirlIcon,
  RatingIcon,
  SubsIcon,
} from "@shared/assets";
import { BREAKPOINT, ChannelLanguages } from "@shared/config";
import { pageFilter, paths } from "@shared/routing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui";
import { useWindowWidth } from "@shared/hooks";

interface CatalogCardProps extends IChangeCards, ICatalogCard {
  card: ICatalogChannel;
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
  const startFormat: IFormat = card?.selected_format
    ? card.format.find(
        (format) => format?.format === card.selected_format?.format,
      )!
    : card.format[0];
  const [selectedFormat, setSelectedFormat] = useState<IFormat>(startFormat);
  const screen = useWindowWidth();
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
              <Link
                to={`${paths.channel.replace(":id", card?.id)}`}
                className={styles.logo__img_wrapper}
              >
                <img src={card?.avatar} alt="logo" />
              </Link>
              <div className={styles.rate}>
                <RatingIcon />
              </div>
            </div>
          </div>
          <div className={styles.column__info}>
            <div className={styles.info}>
              <Link
                to={`${paths.channel.replace(":id", card?.id)}`}
                className={`${styles.title} truncate`}
              >
                {card?.name}
                {/* языки */}
                {card?.channel_languages && (
                  <div className={styles.languages}>
                    {[...card.channel_languages]
                      .sort((a, b) => a - b)
                      .map((lang) => {
                        const languageInfo = ChannelLanguages.find(
                          (l) => l.id === lang,
                        );

                        if (!languageInfo) return "...";

                        return (
                          <img
                            className={styles.languages__icon}
                            key={languageInfo.id}
                            src={`/images/${languageInfo.icon}.svg`}
                            alt={languageInfo.name}
                          />
                        );
                      })}
                  </div>
                )}
                {/* языки */}
              </Link>
              <p className={`${styles.category} truncate`}>{card?.category}</p>
              {screen >= BREAKPOINT.MD && (
                <ChannelCardDescription description={card?.description} />
              )}
            </div>
          </div>

          {screen >= BREAKPOINT.LG && (
            <div className={styles.column__data}>
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
              <div className={styles.channel__data_middle}>
                <div>
                  <BoyIcon />
                </div>
                <div
                  className="colorline"
                  style={{ "--male": `${card?.male}%` } as React.CSSProperties}
                  data-male={`${card?.male}%`}
                  data-female={`${card?.female}%`}
                />
                <div>
                  <GirlIcon />
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
            </div>
          )}
          <div className={styles.column__cross}>
            <ChannelCardMatch
              match={card.match ? Math.ceil(card.match) : undefined}
            />
            <div className={styles.platform__icon}>
              {card?.platform && card?.platform in platformToIcon
                ? platformToIcon[card.platform!]()
                : "..."}
            </div>
          </div>
        </div>
        {screen < BREAKPOINT.LG && screen >= BREAKPOINT.MD ? (
          <Accordion type="single" collapsible>
            <AccordionItem
              value={`item-${card.id}`}
              className={styles.channel__data__md}
            >
              <AccordionTrigger onClick={handleChangeOpenSubcard}>
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
                  <div className={styles.arrow}>
                    <ArrowSmallVerticalIcon
                      className={
                        isSubcardOpen
                          ? "icon__grey rotate"
                          : "icon__grey rotate__down"
                      }
                    />
                  </div>
                </div>
              </AccordionTrigger>
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
            </AccordionItem>
          </Accordion>
        ) : screen < BREAKPOINT.MD ? (
          <>
            <ChannelCardDescription description={card?.description} />

            <Accordion type="single" collapsible>
              <AccordionItem
                value={`item-${card.id}`}
                className={styles.channel__xs}
              >
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
                            {
                              "--male": `${card?.male}%`,
                            } as React.CSSProperties
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
                  <p className="gradient_color">
                    {isSubcardOpen
                      ? t("catalog.see_less")
                      : t("catalog.see_more")}
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
            </Accordion>
          </>
        ) : (
          <></>
        )}
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
