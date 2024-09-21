import { IReadChannelData } from "@entities/channel/types";
import {
  FeatherIcon,
  HeartIcon,
  ProtectIcon2,
  RatingIcon,
  StarIcon4,
} from "@shared/assets";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { platformToIcon } from "@entities/project";
import { useTranslation } from "react-i18next";

interface DescriptionProps {
  card: IReadChannelData;
}

interface SeeMoreLessComponentProps {
  text: string;
  rows: number;
}

const CheckRowsComponent: FC<SeeMoreLessComponentProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(1);

  const updateLineCount = () => {
    if (containerRef.current) {
      const element = containerRef.current;
      const computedStyle = window.getComputedStyle(element);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const clientHeight = element.clientHeight;
      const numberOfLines = Math.floor(clientHeight / lineHeight);
      setLineCount(numberOfLines);
    }
  };

  useEffect(() => {
    updateLineCount();
    window.addEventListener("resize", updateLineCount);
    return () => {
      window.removeEventListener("resize", updateLineCount);
    };
  }, [text]);

  console.log(lineCount);
  return (
    <>
      {lineCount === 1 ? (
        <div ref={containerRef}>
          <p>{text}</p>
        </div>
      ) : (
        <SeeMoreLessInlineComponent text={text} rows={1} />
      )}
    </>
  );
};

const SeeMoreLessInlineComponent: FC<SeeMoreLessComponentProps> = ({
  text,
  rows,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const handleChangeIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`${styles.block2} `}>
      <p className={`${!isOpen ? styles.short_text : ""}`}>{text}</p>
      <div>
        <button onClick={handleChangeIsOpen}>
          {!isOpen ? t("more_less.more") : t("more_less.less")}
        </button>
      </div>
    </div>
  );
};

const SeeMoreLessComponent: FC<SeeMoreLessComponentProps> = ({
  text,
  rows,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const handleChangeIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`${styles.block} `}>
      <p
        style={
          {
            "--rows": rows,
          } as React.CSSProperties
        }
        className={`${!isOpen ? styles.short_text : ""}`}
      >
        {text}
      </p>
      <div>
        <button onClick={handleChangeIsOpen}>
          {!isOpen ? t("more_less.more") : t("more_less.less")}
        </button>
      </div>
    </div>
  );
};

export const Description: FC<DescriptionProps> = ({ card }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.channel__logo__wrapper}>
        <div className={styles.channel__logo}>
          <div className={styles.logo}>
            <img src={card?.avatar} alt="" />
            <RatingIcon />
          </div>
          <button className={styles.add_channel}>
            <p>{t("channel.description.button")}</p>
            <HeartIcon />
          </button>
        </div>
      </div>
      <div>
        <div className={styles.channel__description}>
          <div className={styles.title}>
            <p className="truncate">{card?.name}</p>
          </div>
          <div className={styles.icons}>
            <FeatherIcon />
            <ProtectIcon2 />
            <StarIcon4 />
          </div>
          <div className={styles.description}>
            <p>{card?.description}</p>
            {/* <SeeMoreLessComponent
              text={(card?.description + " ").repeat(10)}
              rows={2}
            />
            <YourComponent
              text={(card?.description + " ").repeat(10)}
              rows={0}
            /> */}
            {/* <CheckRowsComponent
              text={(card?.description + " ").repeat(2)}
              rows={2}
            /> */}
          </div>
          <div className={styles.link}>
            {card?.platform || 0 in platformToIcon
              ? platformToIcon[card?.platform || 0]()
              : null}
            <p>{card?.url}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
