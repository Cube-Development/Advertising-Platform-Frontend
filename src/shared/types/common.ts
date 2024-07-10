export interface IStartProjectProps {
  listLength: boolean;
}

export interface IOption {
  id: number;
  name: string;
  img?: () => JSX.Element;
  type?: string;
}
