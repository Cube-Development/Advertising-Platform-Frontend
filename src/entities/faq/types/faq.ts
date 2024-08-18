export interface IFAQInformation {
  type: string;
  title?: string;
  options: IOption[];
}

interface IOption {
  title: string;
  text: string;
}

export enum FAQtypes {
  common = "common",
  advertiser = "advertiser",
  blogger = "blogger",
}
