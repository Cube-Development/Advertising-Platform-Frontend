import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { CatalogSearch } from "./catalogSearch";
import { CatalogList } from "./catalogList";
import { useTranslation } from "react-i18next";
import { IAddCart, IToCart, IFormat, IPlatform } from "@shared/types/platform";
import { CatalogCart } from "./catalogCart";

const allcards = [
  {
    id: "1",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description:
      "Канал с развлекательными видео, актуальными новостями об Узбекистане и мире, также с познавательными лайфхаками и тд",
    format: [
      { format: 0, views: 32222, price: 150000, er: 27, cpv: 121 },
      { format: 1, views: 42222, price: 250000, er: 37, cpv: 221 },
      { format: 2, views: 52222, price: 350000, er: 47, cpv: 321 },
    ],
    subscribers: 301975,
    male: 10,
    female: 90,
    platform: 1,
  },
  {
    id: "2",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description:
      "Канал с развлекательными видео, актуальными новостями об Узбекистане и мире, также с познавательными лайфхаками и тд",
    format: [
      { format: 0, views: 32222, price: 150000, er: 27, cpv: 121 },
      { format: 1, views: 42222, price: 250000, er: 37, cpv: 221 },
      { format: 2, views: 52222, price: 350000, er: 47, cpv: 321 },
    ],
    subscribers: 301975,
    male: 10,
    female: 90,
    platform: 1,
  },
  {
    id: "3",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description:
      "Канал с развлекательными видео, актуальными новостями об Узбекистане и мире, также с познавательными лайфхаками и тд",
    format: [
      { format: 0, views: 32222, price: 150000, er: 27, cpv: 121 },
      { format: 1, views: 42222, price: 250000, er: 37, cpv: 221 },
      { format: 2, views: 52222, price: 350000, er: 47, cpv: 321 },
    ],
    subscribers: 301975,
    male: 10,
    female: 90,
    platform: 1,
  },
  {
    id: "4",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description:
      "Канал с развлекательными видео, актуальными новостями об Узбекистане и мире, также с познавательными лайфхаками и тд",
    format: [
      { format: 0, views: 32222, price: 150000, er: 27, cpv: 121 },
      { format: 1, views: 42222, price: 250000, er: 37, cpv: 221 },
      { format: 2, views: 52222, price: 350000, er: 47, cpv: 321 },
    ],
    subscribers: 301975,
    male: 10,
    female: 90,
    platform: 1,
  },
  {
    id: "5",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description:
      "Канал с развлекательными видео, актуальными новостями об Узбекистане и мире, также с познавательными лайфхаками и тд",
    format: [
      { format: 0, views: 32222, price: 150000, er: 27, cpv: 121 },
      { format: 1, views: 42222, price: 250000, er: 37, cpv: 221 },
      { format: 2, views: 52222, price: 350000, er: 47, cpv: 321 },
    ],
    subscribers: 301975,
    male: 10,
    female: 90,
    platform: 1,
  },
  {
    id: "6",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description:
      "Канал с развлекательными видео, актуальными новостями об Узбекистане и мире, также с познавательными лайфхаками и тд",
    format: [
      { format: 0, views: 32222, price: 150000, er: 27, cpv: 121 },
      { format: 1, views: 42222, price: 250000, er: 37, cpv: 221 },
      { format: 2, views: 52222, price: 350000, er: 47, cpv: 321 },
    ],
    subscribers: 301975,
    male: 10,
    female: 90,
    platform: 1,
  },
  {
    id: "7",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description:
      "Канал с развлекательными видео, актуальными новостями об Узбекистане и мире, также с познавательными лайфхаками и тд",
    format: [
      { format: 0, views: 32222, price: 150000, er: 27, cpv: 121 },
      { format: 1, views: 42222, price: 250000, er: 37, cpv: 221 },
      { format: 2, views: 52222, price: 350000, er: 47, cpv: 321 },
    ],
    subscribers: 301975,
    male: 10,
    female: 90,
    platform: 1,
  },
  {
    id: "8",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description:
      "Канал с развлекательными видео, актуальными новостями об Узбекистане и мире, также с познавательными лайфхаками и тд",
    format: [
      { format: 0, views: 32222, price: 150000, er: 27, cpv: 121 },
      { format: 1, views: 42222, price: 250000, er: 37, cpv: 221 },
      { format: 2, views: 52222, price: 350000, er: 47, cpv: 321 },
    ],
    subscribers: 301975,
    male: 10,
    female: 90,
    platform: 1,
  },
  {
    id: "9",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description:
      "Канал с развлекательными видео, актуальными новостями об Узбекистане и мире, также с познавательными лайфхаками и тд",
    format: [
      { format: 0, views: 32222, price: 150000, er: 27, cpv: 121 },
      { format: 1, views: 42222, price: 250000, er: 37, cpv: 221 },
      { format: 2, views: 52222, price: 350000, er: 47, cpv: 321 },
    ],
    subscribers: 301975,
    male: 10,
    female: 90,
    platform: 1,
  },
  {
    id: "10",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description:
      "Канал с развлекательными видео, актуальными новостями об Узбекистане и мире, также с познавательными лайфхаками и тд",
    format: [
      { format: 0, views: 32222, price: 150000, er: 27, cpv: 121 },
      { format: 1, views: 42222, price: 250000, er: 37, cpv: 221 },
      { format: 2, views: 52222, price: 350000, er: 47, cpv: 321 },
    ],
    subscribers: 301975,
    male: 10,
    female: 90,
    platform: 1,
  },
  {
    id: "11",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description:
      "Канал с развлекательными видео, актуальными новостями об Узбекистане и мире, также с познавательными лайфхаками и тд",
    format: [
      { format: 0, views: 32222, price: 150000, er: 27, cpv: 121 },
      { format: 1, views: 42222, price: 250000, er: 37, cpv: 221 },
      { format: 2, views: 52222, price: 350000, er: 47, cpv: 321 },
    ],
    subscribers: 301975,
    male: 10,
    female: 90,
    platform: 1,
  },
  {
    id: "12",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description:
      "Канал с развлекательными видео, актуальными новостями об Узбекистане и мире, также с познавательными лайфхаками и тд",
    format: [
      { format: 0, views: 32222, price: 150000, er: 27, cpv: 121 },
      { format: 1, views: 42222, price: 250000, er: 37, cpv: 221 },
      { format: 2, views: 52222, price: 350000, er: 47, cpv: 321 },
    ],
    subscribers: 301975,
    male: 10,
    female: 90,
    platform: 1,
  },
  {
    id: "13",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description:
      "fdkmfdsКанал с развлекательными видео, актуальными новостями об Узбекистане и мире, также с познавательными лайфхаками и тдlmsl",
    format: [{ format: 0, views: 32222, price: 150000, er: 27, cpv: 121 }],
    subscribers: 301975,
    male: 50,
    female: 50,
    platform: 2,
  },
  {
    id: "14",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description: "fdkmfdslmsl",
    format: [{ format: 0, views: 32222, price: 150000, er: 27, cpv: 121 }],
    subscribers: 301975,
    male: 70,
    female: 30,
    platform: 1,
  },
];

const filter = { platform: 0 };

export const CatalogBlock: FC = () => {
  const [cards, setCards] = useState<IPlatform[]>(allcards);
  const [currentCart, setCart] = useState<IToCart[]>([]);

  const [currentFilters, setFilters] = useState();

  const { t } = useTranslation();

  const handleChangeCards = (cart: IToCart) => {
    setCards([...cards.filter((card) => card.id !== cart.channel.channel_id)]);
    setCart([...currentCart, cart]);
    // запрос в бек
    console.log(cart.channel);
  };

  return (
    <div className="container">
      <div className={`${styles.wrapper}`}>
        <div className={styles.title}>{t("catalog.catalog")}</div>
        <div className={styles.content}>
          <div>
            <CatalogSearch />
          </div>
          <div>
            <div className={styles.content__right}>
              <CatalogList cards={cards} onChangeCard={handleChangeCards} />
              <div className={styles.cart}>
                {currentCart.length ? (
                  <CatalogCart currentCart={currentCart} />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
