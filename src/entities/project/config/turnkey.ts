export enum TariffTypes {
  base = "base",
  standard = "standard",
  complex = "complex",
}

export enum TariffIndex {
  base = 1,
  standard = 2,
  complex = 3,
}

export enum TariffPrice {
  base = 2250000,
  standard = 7500000,
  complex = 15300000,
}

interface ITariffParameter {
  type: TariffTypes;
  index: TariffIndex;
  price: TariffPrice;
}

export const TariffParameters: ITariffParameter[] = [
  { type: TariffTypes.base, index: TariffIndex.base, price: TariffPrice.base },
  {
    type: TariffTypes.standard,
    index: TariffIndex.standard,
    price: TariffPrice.standard,
  },
  {
    type: TariffTypes.complex,
    index: TariffIndex.complex,
    price: TariffPrice.complex,
  },
];

export enum tariffData {
  // back  data
  tariff_ident = "tariff_ident",
  comment = "comment",
  links = "links",
  attached_files = "attached_files",
  //front data
  url = "url",
  files = "files",
  dragActive = "dragActive",
  isTarifBought = "isTarifBought",
  isHaveBalance = "isHaveBalance",
  isDropFile = "isDropFile",
  uploadProgress = "uploadProgress",
}
