export interface IFilterSearch {
  category: Content[];
  age: Content[];
  language: Content[];
  region: Content[];
  male: number;
  female: number;
}

interface Content {
  id: number;
  name: string;
}
