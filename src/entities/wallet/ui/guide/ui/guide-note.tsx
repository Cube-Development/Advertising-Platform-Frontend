import { CircleAlert } from "lucide-react";
import { FC } from "react";

interface IGuideNoteProps {
  title: string;
  description: string;
}

export const GuideNote: FC<IGuideNoteProps> = ({ title, description }) => {
  return (
    <div className="p-6 border border-blue-200 bg-blue-50 rounded-xl">
      <div className="grid space-y-2">
        <div className="flex items-center justify-start gap-2">
          <CircleAlert size={18} className="text-blue-900" />
          <h4 className="font-semibold text-blue-900 text-md">{title}</h4>
        </div>
        <p className="text-xs leading-relaxed text-blue-800">{description}</p>
      </div>
    </div>
  );
};
