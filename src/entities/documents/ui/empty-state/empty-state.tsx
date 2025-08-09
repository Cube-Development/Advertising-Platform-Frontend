import { FileText } from "lucide-react";
import { FC } from "react";

export const EmptyState: FC = ({}) => {
  return (
    <div className="py-12 text-center">
      <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
      <h3 className="mb-2 text-lg font-medium text-gray-900">
        Документы не найдены
      </h3>
      <p className="text-gray-500">
        На данный момент нет документов для отображения.
      </p>
    </div>
  );
};
