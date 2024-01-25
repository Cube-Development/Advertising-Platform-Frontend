import { paths } from '@shared/routing';

export const nonAuthNavbar = [
  {href: paths.turnkey },
  {href: paths.catalog },
  {href: paths.platformOwner },
];


export const advertiserNavbar = [
  {href: paths.turnkey },
  {href: paths.catalog },
  {href: paths.wallet },
  {href: '' },
];

export const bloggerNavbar = [
  { text: 'Добавить канал', href: paths.addPlatform  },
  { text: 'Расчитать доход', href: '' },
  { text: 'Кошелек', href: paths.wallet },
  { text: 'Языки', href: '' },
];
