import { paths } from "@shared/routing";

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
        path: paths.catalog,
      },
      {
        name: "footer.nav.services.links.add_channel",
        path: paths.addChannel,
      },
      {
        name: "footer.nav.services.links.turnkey",
        path: paths.turnkey,
      },
      {
        name: "footer.nav.services.links.calculate",
        path: `${paths.mainBlogger}#calculateIncome`,
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
        path: paths.main,
      },
      {
        name: "footer.nav.about.links.public_offer",
        path: paths.publicOffer,
      },
      {
        name: "footer.nav.about.links.service_rules",
        path: paths.serviceRules,
      },
    ],
  },
  {
    name: "footer.nav.cooperation.name",
    items: [
      {
        name: "footer.nav.cooperation.links.vacancies",
        path: paths.main,
      },
      {
        name: "footer.nav.cooperation.links.partner_programm",
        path: paths.main,
      },
    ],
  },
  {
    name: "footer.nav.community.name",
    items: [
      {
        name: "footer.nav.community.links.faq",
        path: paths.faq,
      },
      {
        name: "footer.nav.community.links.news",
        path: paths.faq,
      },
      {
        name: "footer.nav.community.links.blog",
        path: paths.faq,
      },
    ],
  },
];
