import { FC } from "react";
import { IGuideSubstep } from "../model";

interface IGuideSubstepProps {
  substep: IGuideSubstep;
}

export const GuideSubstep: FC<IGuideSubstepProps> = ({ substep }) => {
  return (
    <div
      className={`space-y-1  p-3 rounded-lg border-l-4   border-blue-900 bg-blue-50`}
    >
      <p className="text-xs leading-relaxed text-gray-700">
        <span className="font-semibold text-gray-900">{substep?.title}</span> -{" "}
        {substep?.description}
      </p>
      <div
        className={`flex items-center gap-2 bg-${substep?.color}-100 p-1 rounded-lg`}
      >
        <div className="flex items-center gap-1">
          <div className="flex-shrink-0 p-1">{substep?.icon}</div>
          <p
            className={`text-[10px] leading-relaxed text-${substep?.color}-700 text-center italic`}
          >
            {substep?.info}
          </p>
        </div>
      </div>
    </div>
  );
};
