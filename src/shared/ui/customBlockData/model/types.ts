export interface IBlockData {
  title?: string;
  parameters: IRowData[];
}

export interface IRowData {
  label: string;
  type: string;
  validate: {
    required: string;
    validate?: any;
    onChange?: any;
  };
}

export interface IParameterData {
  title: string;
  default_value?: string;
  description: string;
}
