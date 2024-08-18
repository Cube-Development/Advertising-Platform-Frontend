export interface IOption {
  option: string;
  img: string;
}

export interface IBasicInfo {
  info: string;
  count: string;
  img: string;
}

export interface IAccomm {
  type: string;
  title: string;
  stages: Stage[];
  save?: string;
  btn_start?: string;
}

export interface Stage {
  stage: string;
}

export interface ITarifInfo {
  type: string;
  name: string;
  views: string;
  price: string;
  btn: string;
  info: string;
  options: Option[];
}

export interface Option {
  option: string;
  available: boolean;
}

export interface ICustomer {
  name: string;
  workplace: string;
  rate: number;
  img: string;
  text: string;
}

export interface ISelectOption {
  title: string;
  text?: string;
  default_value?: string;
}

export interface IStep {
  text: string;
}
