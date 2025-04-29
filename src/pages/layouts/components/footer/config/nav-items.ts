import { ENUM_PATHS } from "@shared/routing";

export const contactInfo = {
  tech_contact: "+99899-111-11-11",
  cooperation_contact: "+99891-999-99-99",
  email: "Info@blogix.uz",
};

export const navItems = [
  {
    name: "footer.nav.services.name",
    items: [
      {
        name: "footer.nav.services.links.catalog",
        path: ENUM_PATHS.CATALOG,
      },
      {
        name: "footer.nav.services.links.add_channel",
        path: ENUM_PATHS.ADD_CHANNEL,
      },
      {
        name: "footer.nav.services.links.turnkey",
        path: ENUM_PATHS.TURNKEY,
      },
      {
        name: "footer.nav.services.links.calculate",
        path: `${ENUM_PATHS.MAIN_BLOGGER}#calculateIncome`,
      },
      {
        name: "footer.nav.services.links.tg_bot",
        path: "https://t.me/abddssh",
      },
    ],
  },
  {
    name: "footer.nav.about.name",
    items: [
      {
        name: "footer.nav.about.links.reviews",
        path: ENUM_PATHS.MAIN,
      },
      {
        name: "footer.nav.about.links.public_offer",
        path: ENUM_PATHS.PUBLIC_OFFER,
      },
      {
        name: "footer.nav.about.links.service_rules",
        path: ENUM_PATHS.SERVICE_RULES,
      },
    ],
  },
  {
    name: "footer.nav.cooperation.name",
    items: [
      {
        name: "footer.nav.cooperation.links.vacancies",
        path: ENUM_PATHS.MAIN,
      },
      {
        name: "footer.nav.cooperation.links.partner_programm",
        path: ENUM_PATHS.MAIN,
      },
    ],
  },
  {
    name: "footer.nav.community.name",
    items: [
      {
        name: "footer.nav.community.links.faq",
        path: ENUM_PATHS.FAQ,
      },
      {
        name: "footer.nav.community.links.news",
        path: ENUM_PATHS.FAQ,
      },
      {
        name: "footer.nav.community.links.blog",
        path: ENUM_PATHS.FAQ,
      },
    ],
  },
];
