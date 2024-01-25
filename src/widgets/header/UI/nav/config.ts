import { paths } from "../../../../shared/routing";
import * as data from './../../../../../public/locales/ru/translation.json';

const text = data.pages

export const nonAuthNavbar = [
  { text: text.turnkey, href: paths.turnkey },
  { text: text.catalog, href: paths.catalog },
  { text: text.platformOwner, href: paths.platformOwner },
];


export const advertiserNavbar = [
  { text: text.turnkey, href: paths.turnkey },
  { text: text.catalog, href: paths.catalog },
  { text: 'Кошелек', href: paths.wallet },
  { text: 'Языки', href: '' },
];

export const bloggerNavbar = [
  { text: 'Добавить канал', href: paths.addPlatform  },
  { text: 'Расчитать доход', href: '' },
  { text: 'Кошелек', href: paths.wallet },
  { text: 'Языки', href: '' },
];
