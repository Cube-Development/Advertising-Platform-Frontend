import { pageFilter } from "@shared/config/pageFilter";
import { platformStatusFilter } from "@shared/config/platformFilter";
import { useAppSelector } from "@shared/store";
import { BarFilter } from "@widgets/barFilter";
import { BloggerModPlatform } from "@widgets/bloggerModPlatform";
import { BloggerPlatform } from "@widgets/bloggerPlatform";
import { FC } from "react";

const BloggerPlatformCard = [
  {
    id: 31231132,
    author: true,
    verified: true,
    partner: true,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "Uzbek MDK",
    category: "Юмор и развлечения",
    offers: 5,
    complite: 999,
    cancel: 999,
    wait: 999,
    start: 999,
    status: 0,
  },
  {
    id: 31231132,
    verified: true,
    partner: true,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "Uzbek MDK",
    category: "Юмор и развлечения",
    offers: 5,
    complite: 999,
    cancel: 999,
    wait: 999,
    start: 999,
    status: 0,
  },
  {
    id: 31231132,
    partner: true,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "Uzbek MDK",
    category: "Юмор и развлечения",
    offers: 5,
    complite: 999,
    cancel: 999,
    wait: 999,
    start: 999,
    status: 0,
  },
];

const BloggerCancelPlatformCard = [
  {
    id: 31231132,
    date_event: "22/01/2024",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "Uzbek MDK",
    category: "Юмор и развлечения",
    offers: 5,
    complite: 999,
    cancel: 999,
    wait: 999,
    start: 999,
    status: 2,
  },
  {
    id: 31231132,
    date_event: "22/01/2024",
    date: "22/01/2024",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "Uzbek MDK",
    category: "Юмор и развлечения",
    offers: 5,
    complite: 999,
    cancel: 999,
    wait: 999,
    start: 999,
    status: 2,
  },
];
const BloggerModPlatformCard = {
  id: 31231132,
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
  name: "Uzbek MDK",
  date: "22/01/2024",
  category: "Юмор и развлечения",
  status: 0,
};

const BloggerDeactivatePlatformCard = [
  {
    id: 31231132,
    author: true,
    verified: true,
    partner: true,
    date_event: "22/01/2024",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "Uzbek MDK",
    category: "Юмор и развлечения",
    complite: 999,
    cancel: 999,
    wait: 999,
    start: 999,
    status: 3,
  },
  {
    id: 31231132,
    verified: true,
    partner: true,
    date_event: "22/01/2024",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "Uzbek MDK",
    category: "Юмор и развлечения",
    complite: 999,
    cancel: 999,
    wait: 999,
    start: 999,
    status: 3,
  },
  {
    id: 31231132,
    partner: true,
    date_event: "22/01/2024",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "Uzbek MDK",
    category: "Юмор и развлечения",
    complite: 999,
    cancel: 999,
    wait: 999,
    start: 999,
    status: 3,
  },
];

const BloggerBanPlatformCard = [
  {
    id: 31231132,
    date_event: "22/01/2024",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "Uzbek MDK",
    category: "Юмор и развлечения",
    complite: 999,
    cancel: 999,
    wait: 999,
    start: 999,
    status: 4,
  },
  {
    id: 31231132,
    date_event: "22/01/2024",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "Uzbek MDK",
    category: "Юмор и развлечения",
    complite: 999,
    cancel: 999,
    wait: 999,
    start: 999,
    status: 4,
  },
];

const BloggerPlatformCards = BloggerPlatformCard;
const BloggerModPlatformCards = [
  BloggerModPlatformCard,
  BloggerModPlatformCard,
  BloggerModPlatformCard,
];

export const PlatformsPage: FC = () => {
  const { statusFilter } = useAppSelector((state) => state.filter);

  return (
    <>
      <BarFilter page={pageFilter.platform} />
      {statusFilter === platformStatusFilter.active ? (
        <BloggerPlatform cards={BloggerPlatformCards} />
      ) : statusFilter === platformStatusFilter.moderation ? (
        <BloggerModPlatform cards={BloggerModPlatformCards} />
      ) : statusFilter === platformStatusFilter.reject ? (
        <BloggerPlatform cards={BloggerCancelPlatformCard} />
      ) : statusFilter === platformStatusFilter.deactivate ? (
        <BloggerPlatform cards={BloggerDeactivatePlatformCard} />
      ) : (
        statusFilter === platformStatusFilter.ban && (
          <BloggerPlatform cards={BloggerBanPlatformCard} />
        )
      )}
    </>
  );
};
