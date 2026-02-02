import {
  BanknoteArrowDown,
  BookMarked,
  Building2,
  CreditCard,
  FolderSync,
  Power,
  SquareStar,
  UserStar,
  Wallet,
} from "lucide-react";
import { IGuideCard } from "../types";

export const GUIDES_LIST: IGuideCard[] = [
  {
    title: "guides.registration.title",
    description: "guides.registration.description",
    guide_id: "95609d5a-fde9-4185-9ad5-f6925849fc17",
    guide_source: {
      ru: "FILE_36d23010-a9da-466d-8546-927e3dd87302.pdf",
      uz: "FILE_7799eaef-04ac-4f46-a3ed-c41929236eea.pdf",
      en: "FILE_36d23010-a9da-466d-8546-927e3dd87302.pdf",
    },
    icon: (
      <UserStar className="md:size-[50px] size-10 stroke-[1px] text-blue-600" />
    ),
  },
  {
    title: "guides.start_campaign.title",
    description: "guides.start_campaign.description",
    guide_id: "95609d5a-fde9-4185-9ad5-f6925849fc07",
    guide_source: {
      ru: "FILE_59839bb7-2eb3-4445-b013-f529212c0415.pdf",
      uz: "FILE_282fb382-69c2-4e1f-963d-3ecc93d41770.pdf",
      en: "FILE_59839bb7-2eb3-4445-b013-f529212c0415.pdf",
    },
    icon: (
      <Power className="md:size-[50px] size-10 stroke-[1px] text-blue-600" />
    ),
  },
  // {
  //   title: "guides.turnkey_campaign.title",
  //   description: "guides.turnkey_campaign.description",
  //   guide_id: "95609d5a-fde9-4185-9ad5-f6925849fb07",
  //   guide_source: {
  //     ru: "https://bxbbjhin8f.ufs.sh/f/uMaRQPscWxTCrwPCHaRxlLKdy3GXUtWNTn0VjbiRH4Zfqv5h",
  //     uz: "https://bxbbjhin8f.ufs.sh/f/uMaRQPscWxTCrwPCHaRxlLKdy3GXUtWNTn0VjbiRH4Zfqv5h",
  //     en: "https://bxbbjhin8f.ufs.sh/f/uMaRQPscWxTCrwPCHaRxlLKdy3GXUtWNTn0VjbiRH4Zfqv5h",
  //   },
  //   icon: <Key className="md:size-[50px] size-10 stroke-[1px] text-blue-600" />,
  // },
  {
    title: "guides.connect_organization.title",
    description: "guides.connect_organization.description",
    guide_id: "2659caa6-bce3-4c32-9bdd-f0f2b1164afa",
    guide_source: {
      ru: "FILE_e69eb682-c38c-47b1-85c5-3d2938b007bf.pdf",
      uz: "FILE_58e4b4e6-8f47-4f80-bdb8-8c83a265c9f0.pdf",
      en: "FILE_e69eb682-c38c-47b1-85c5-3d2938b007bf.pdf",
    },
    icon: (
      <Building2 className="md:size-[50px] size-10 stroke-[1px] text-blue-600" />
    ),
  },
  {
    title: "guides.topup_balance.title",
    description: "guides.topup_balance.description",
    guide_id: "7d8ba872-d9f4-4cb8-b650-0098f503722a",
    guide_source: {
      ru: "FILE_7f8b037f-72b6-42c9-b0df-5bf2f05b5bc4.pdf",
      uz: "FILE_b927da0a-055a-4280-8658-593d8675a1c8.pdf",
      en: "FILE_7f8b037f-72b6-42c9-b0df-5bf2f05b5bc4.pdf",
    },
    icon: (
      <Wallet className="md:size-[50px] size-10 stroke-[1px] text-blue-600" />
    ),
  },
  {
    title: "guides.add_platform.title",
    description: "guides.add_platform.description",
    guide_id: "a7dc1012-77a1-4565-88eb-97289d4e063d",
    guide_source: {
      ru: "FILE_b84cbded-6651-4798-ba9b-8aa64a1b13f2.pdf",
      uz: "FILE_42d45ca1-551a-40a5-840e-5917c9761907.pdf",
      en: "FILE_b84cbded-6651-4798-ba9b-8aa64a1b13f2.pdf",
    },
    icon: (
      <BookMarked className="md:size-[50px] size-10 stroke-[1px] text-blue-600" />
    ),
  },
  {
    title: "guides.topup_balance_card.title",
    description: "guides.topup_balance_card.description",
    guide_id: "06211b17-a7d8-4d3b-87c8-52433a4605d4",
    guide_source: {
      ru: "FILE_af40bd0f-1f38-419a-888b-0fa26b80e60b.pdf",
      uz: "FILE_15518117-4a09-4351-bf82-471edcf9cbd3.pdf",
      en: "FILE_af40bd0f-1f38-419a-888b-0fa26b80e60b.pdf",
    },
    icon: (
      <CreditCard className="md:size-[50px] size-10 stroke-[1px] text-blue-600" />
    ),
  },
  {
    title: "guides.refund_request.title",
    description: "guides.refund_request.description",
    guide_id: "2ad73ebf-5009-4319-955b-b025a8bb4530",
    guide_source: {
      ru: "FILE_8c160313-5cea-4b44-94e9-bbfd6dafb3d0..pdf",
      uz: "FILE_ea93d9e0-40b7-4a7f-9c69-fa3f6a464091.pdf",
      en: "FILE_8c160313-5cea-4b44-94e9-bbfd6dafb3d0..pdf",
    },
    icon: (
      <FolderSync className="md:size-[50px] size-10 stroke-[1px] text-blue-600" />
    ),
  },
  {
    title: "guides.blogger_accept_order.title",
    description: "guides.blogger_accept_order.description",
    guide_id: "9bb9a4af-3452-4cd2-92ce-0b20e2000aa0",
    guide_source: {
      ru: "FILE_773cb750-d112-4e6d-b23e-5f18539f68ac.pdf",
      uz: "FILE_5fa88efa-693e-4072-9a74-172c5cfc03eb.pdf",
      en: "FILE_773cb750-d112-4e6d-b23e-5f18539f68ac.pdf",
    },
    icon: (
      <SquareStar className="md:size-[50px] size-10 stroke-[1px] text-blue-600" />
    ),
  },
  {
    title: "guides.withdraw_funds.title",
    description: "guides.withdraw_funds.description",
    guide_id: "003eee58-55ce-4cb0-a172-92a47f193654",
    guide_source: {
      ru: "FILE_8c160313-5cea-4b44-94e9-bbfd6dafb3d0..pdf",
      uz: "FILE_ea93d9e0-40b7-4a7f-9c69-fa3f6a464091.pdf",
      en: "FILE_8c160313-5cea-4b44-94e9-bbfd6dafb3d0..pdf",
    },
    icon: (
      <BanknoteArrowDown className="md:size-[50px] size-10 stroke-[1px] text-blue-600" />
    ),
  },
];
