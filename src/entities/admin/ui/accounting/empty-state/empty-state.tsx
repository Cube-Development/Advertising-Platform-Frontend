import { ArrowLeftRight, FileText } from "lucide-react";
import { FC } from "react";

export const EmptyState: FC = ({}) => {
  return (
    <div className="py-12 text-center">
      <ArrowLeftRight className="w-16 h-16 mx-auto mb-4 text-gray-400" />
      <h3 className="mb-2 text-lg font-medium text-gray-900">
        Транзакции не найдены
      </h3>
      <p className="text-gray-500">
        На данный момент нет транзакций для отображения.
      </p>
    </div>
  );
};
