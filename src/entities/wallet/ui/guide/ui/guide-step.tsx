import { FC } from "react";
import { IGuideStep } from "../model";
import { GuideSubstep } from "./guide-substep";

interface IGuideStepProps {
  step: IGuideStep;
  index: number;
}

export const GuideStep: FC<IGuideStepProps> = ({ step, index }) => {
  return (
    <div className="relative flex flex-col items-start gap-2 p-4 transition-colors duration-200 bg-gray-50 rounded-xl">
      <div className="flex items-center gap-2">
        <span className="absolute inline-flex items-center justify-center w-5 h-5 text-sm font-bold text-white bg-blue-900 rounded-md -top-1 -left-1">
          {index}
        </span>
        <div className="flex-shrink-0">
          <div
            className={`w-8 h-8 rounded-full bg-${step?.color}-100 flex items-center justify-center`}
          >
            {step?.icon}
          </div>
        </div>
        <h3 className="text-sm font-semibold text-gray-900">{step?.title}</h3>
      </div>
      <p className="text-xs leading-relaxed text-gray-700">
        {step?.description}
      </p>
      {!!step?.substeps && (
        <div className="grid grid-flow-row gap-2">
          {step?.substeps?.map((substep) => (
            <GuideSubstep key={substep.title} substep={substep} />
          ))}
        </div>
      )}
    </div>
  );
};
