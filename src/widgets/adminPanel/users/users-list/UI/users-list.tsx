import { IAdminUsers } from "@entities/admin-panel";
import { DinamicPagination } from "@features/other";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { Skeleton } from "@shared/ui/shadcn-ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { UserCard } from "../card";

const UserCardSkeleton: FC = () => (
  <div className="rounded-lg border p-4 sm:p-6 space-y-4">
    <div className="flex gap-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
    <Skeleton className="h-12 w-full" />
  </div>
);

interface UsersListProps {
  data?: IAdminUsers;
  isLoading: boolean;
  isFetching: boolean;
  handleChange: () => void;
}

export const UsersList: FC<UsersListProps> = ({
  data,
  isLoading,
  isFetching,
  handleChange,
}) => {
  const { t } = useTranslation();
  const users = data?.users ?? [];
  const showEmpty = !isLoading && !isFetching && users.length === 0;

  return (
    <div className="min-h-[var(--cards-list-height)]">
      {showEmpty ? (
        <p className="text-center text-muted-foreground py-8">
          {t("admin_panel.users.empty")}
        </p>
      ) : (
        <div className="grid grid-flow-row gap-2.5">
          {users.map((card) => (
            <UserCard key={card.user_id || card.id} card={card} />
          ))}
          {(isLoading || isFetching) &&
            Array.from({ length: INTERSECTION_ELEMENTS.ADMIN_USERS }).map(
              (_, index) => <UserCardSkeleton key={index} />,
            )}
          {!data?.isLast && !isLoading && !isFetching && users.length > 0 && (
            <DinamicPagination onChange={handleChange} />
          )}
        </div>
      )}
    </div>
  );
};
