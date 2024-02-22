import { myProjectStatusFilter, managerProjectStatusFilter, projectTypesFilter, platformStatusFilter, pageFilter } from "@shared/config/filter";
import { useAppSelector } from "@shared/store";
import { AdvProject } from "@widgets/advProject";
import { BarFilter } from "@widgets/barFilter";
import { AdvDevProject } from "@widgets/advDevProject";
import { FC } from "react";

const MyProjectAdvCard = {
  id: 31231132,  date: "20.01.2024",  channels: 999,  views: 99999999,  cost: 99999999,  complite: 999,  cancel: 999,  wait: 999,  start: 999,  consideration: 999,  status: 0,  channels_list: [
    {status: 0, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
    {status: 1, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
    {status: 2, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
    {status: 3, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
    {status: 4, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
  ],
};

const MyProjectAdvCardComplited = {
  id: 31231132,  date: "20.01.2024",  channels: 999,  views: 99999999,  cost: 99999999,  complite: 999,  cancel: 999,  wait: 999,  start: 999,  consideration: 999,  status: 1,  channels_list: [
    {status: 0, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
    {status: 1, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
  ],
};


const ManagerProjectAdvCardComplited = {
  id: 31231132,  date: "20.01.2024",  channels: 999,  views: 99999999,  cost: 99999999,  complite: 999,  cancel: 999,  wait: 999,  start: 999,  consideration: 999,  status: 0,  channels_list: [
    {status: 0, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
    {status: 1, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
    {status: 5, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
    {status: 2, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
    {status: 3, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
  ],
};

const ManagerProjectAdvCardAgreed = {
  id: 31231132,  date: "20.01.2024",  channels: 999,  views: 99999999,  cost: 99999999,  complite: 999,  cancel: 999,  wait: 999,  start: 999,  consideration: 999,  status: 0,  channels_list: [
    {status: 6, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
    {status: 6, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
    {status: 6, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
    {status: 6, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
    {status: 6, img: "partner1.svg", name: "MDK", category: "Юмор и развлечения", date_from: "11.11.2024", date_to: "15.12.2024", accommodation: "1/24", time_from: "17:00", time_to: "17:00", price: 1500000000, subs: 301975, views: 34975, ER: 27.3, CPV: 121, sex: 0, },
  ],
};

const ManagerProjectAdvCardDev = {
  id: 31231132,  date: "20.01.2024", cost: 99999999, status: 0, name: "Рекламная кампания", tarif: 1
};

const MyProjectCards = [MyProjectAdvCard, MyProjectAdvCard, MyProjectAdvCard];
const MyProjectCardsComplited = [MyProjectAdvCardComplited];
const ManagerProjectAdvCardsDev = [ManagerProjectAdvCardDev, ManagerProjectAdvCardDev, ManagerProjectAdvCardDev];
const ManagerProjectCards = [ManagerProjectAdvCardComplited, ManagerProjectAdvCardComplited];
const ManagerProjectCardsAgreed = [ManagerProjectAdvCardAgreed, ManagerProjectAdvCardAgreed];

const sexType = {
  0: { man: 0, woman: 100 },
  1: { man: 25, woman: 75 },
  2: { man: 50, woman: 50 },
  3: { man: 75, woman: 25 },
  4: { man: 100, woman: 0 },
};

export const OrdersPage: FC = () => {
  const { typeFilter, statusFilter } = useAppSelector((state) => state.filterReducer);
  const page = pageFilter.order

  return (
    <>
      <BarFilter page={page}/>
      
      {typeFilter === projectTypesFilter.myProject && statusFilter === myProjectStatusFilter.active 
      ? 
      <AdvProject cards={MyProjectCards} />
      : typeFilter === projectTypesFilter.myProject && statusFilter === myProjectStatusFilter.complite 
      ?
      <AdvProject cards={MyProjectCardsComplited} />
      : typeFilter === projectTypesFilter.managerProject && statusFilter === managerProjectStatusFilter.active 
      ?
      <AdvProject cards={ManagerProjectCards} />
      : typeFilter === projectTypesFilter.managerProject && statusFilter === managerProjectStatusFilter.develop 
      ?
      <AdvDevProject cards={ManagerProjectAdvCardsDev} />
      : typeFilter === projectTypesFilter.managerProject && statusFilter === managerProjectStatusFilter.agreed 
      ?
      <AdvProject cards={ManagerProjectCardsAgreed} />
      : typeFilter === projectTypesFilter.managerProject && statusFilter === managerProjectStatusFilter.complite 
      ?
      // <DevProjectAdv cards={ManagerProjectAdvCardsDev} />
      <></>
      : typeFilter === projectTypesFilter.savedProject
      ?
      <AdvDevProject cards={ManagerProjectAdvCardsDev} />
      : 
      <></>

      }
      
    </>
  );
};
