import { offerStatusFilter, pageFilter } from "@shared/config/filter";
import { useAppSelector } from "@shared/store";
import { BarFilter } from "@widgets/barFilter";
import { BloggerOffer } from "@widgets/bloggerOffer";
import { FC } from "react";

const BlogggerActiveCards = [
  {
    id: 31231132,
    status: 0,
    name: "MDK",
    category: "Юмор и развлечения",
    date: "20.01.2024",
    date_from: "11.11.2024",
    date_to: "15.12.2024",
    accommodation: "1/24",
    time_from: "17:00",
    time_to: "17:00",
    price: 1500000000,
    img: "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
  },
  {
    id: 31231132,
    status: 1,
    name: "MDK",
    category: "Юмор и развлечения",
    date: "20.01.2024",
    date_from: "11.11.2024",
    date_to: "15.12.2024",
    accommodation: "1/24",
    time_from: "17:00",
    time_to: "17:00",
    price: 1500000000,
    img: "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
  },
  {
    id: 31231132,
    status: 2,
    name: "MDK",
    category: "Юмор и развлечения",
    date: "20.01.2024",
    date_from: "11.11.2024",
    date_to: "15.12.2024",
    accommodation: "1/24",
    time_from: "17:00",
    time_to: "17:00",
    price: 1500000000,
    img: "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
  },
  {
    id: 31231132,
    status: 3,
    name: "MDK",
    category: "Юмор и развлечения",
    date: "20.01.2024",
    date_from: "11.11.2024",
    date_to: "15.12.2024",
    accommodation: "1/24",
    time_from: "17:00",
    time_to: "17:00",
    price: 1500000000,
    img: "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
  },
  {
    id: 31231132,
    status: 4,
    name: "MDK",
    category: "Юмор и развлечения",
    date: "20.01.2024",
    date_from: "11.11.2024",
    date_to: "15.12.2024",
    accommodation: "1/24",
    time_from: "17:00",
    time_to: "17:00",
    price: 1500000000,
    img: "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
  },
  {
    id: 31231132,
    status: 5,
    name: "MDK",
    category: "Юмор и развлечения",
    date: "20.01.2024",
    date_from: "11.11.2024",
    date_to: "15.12.2024",
    accommodation: "1/24",
    time_from: "17:00",
    time_to: "17:00",
    price: 1500000000,
    img: "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
  },
  {
    id: 31231132,
    status: 6,
    name: "MDK",
    category: "Юмор и развлечения",
    date: "20.01.2024",
    date_from: "11.11.2024",
    date_to: "15.12.2024",
    accommodation: "1/24",
    time_from: "17:00",
    time_to: "17:00",
    price: 1500000000,
    img: "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
  },
];

export const OffersPage: FC = () => {
  const { statusFilter } = useAppSelector((state) => state.filterReducer);

  const page = pageFilter.offer;

  return (
    <>
      <BarFilter page={page} />

      {statusFilter === offerStatusFilter.active ? (
        <BloggerOffer cards={BlogggerActiveCards} />
      ) : (
        <></>
      )}
    </>
  );
};
