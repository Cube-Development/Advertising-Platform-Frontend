import { paths } from '@shared/routing';

export const nonAuthNavbar = [
  {text: "pages.turnkey", href: paths.turnkey, img: 'key.svg' },
  {text: "pages.catalog", href: paths.catalog },
  {text: "pages.platformOwner", href: paths.platformOwner },
];

export const advertiserNavbar = [
  {text: "pages.turnkey", href: paths.turnkey , img: 'key.svg'},
  {text: "pages.catalog", href: paths.catalog },
];

export const bloggerNavbar = [
  {text: "pages.calculateIncome",  href: paths.catalog ,  img: 'calculator.svg'},
  {text: "pages.addPlatform",  href: paths.addPlatform  },
];
