import { paths } from "../../../../shared/routing";

export const nonAuthNavbar = [
  { text: 'Размещение под ключ', href: paths.fullServise },
  { text: 'Каталог площадок', href: paths.catalog },
  { text: 'Владельцу площадки', href: paths.platformOwner },
];


export const advertiserNavbar = [
  { text: 'Каталог площадок', href: paths.catalog },
  { text: 'Размещение под ключ', href: paths.fullServise },
  { text: 'Кошелек', href: paths.wallet },
  { text: 'Языки', href: '' },
];

export const bloggerNavbar = [
  { text: 'Добавить канал', href: paths.addPlatform  },
  { text: 'Расчитать доход', href: '' },
  { text: 'Кошелек', href: paths.wallet },
  { text: 'Языки', href: '' },
];

export enum roles  {
  advertiser = 'advertiser',
  blogger = 'blogger',
}
