export interface IGuideStep {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
  substeps?: IGuideSubstep[];
}

export interface IGuideSubstep {
  icon: JSX.Element;
  color: string;
  title: string;
  description: string;
  info: string;
}
