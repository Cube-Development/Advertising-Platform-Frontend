export interface IGuideCard {
  title: string;
  description: string;
  guide_id: string;
  guide_source: {
    ru: string;
    uz: string;
    en: string;
  };
  icon?: JSX.Element;
}
