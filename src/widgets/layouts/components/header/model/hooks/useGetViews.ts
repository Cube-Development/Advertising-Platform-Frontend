import { ENUM_ROLES } from "@entities/user";
import {
  useGetViewAdvertiserProjectQuery,
  useGetViewBloggerChannelQuery,
  useGetViewBloggerOrderQuery,
  useGetViewManagerProjectQuery,
  useGetViewTransactionsQuery,
} from "@entities/views";

interface IUseGetViewsProps {
  isAuth?: boolean;
  role?: ENUM_ROLES;
}

export const useGetViews = ({ isAuth, role }: IUseGetViewsProps) => {
  const { data: viewsAdvProjects, isLoading: isAdvProjectsLoading } =
    useGetViewAdvertiserProjectQuery(undefined, {
      skip: !isAuth || role !== ENUM_ROLES.ADVERTISER,
    });

  const { data: viewsBloggerOffers, isLoading: isBloggerOffersLoading } =
    useGetViewBloggerOrderQuery(undefined, {
      skip: !isAuth || role !== ENUM_ROLES.BLOGGER,
    });

  const { data: viewsBloggerChannels, isLoading: isBloggerChannelsLoading } =
    useGetViewBloggerChannelQuery(undefined, {
      skip: !isAuth || role !== ENUM_ROLES.BLOGGER,
    });

  const { data: viewsManProjects, isLoading: isManProjectsLoading } =
    useGetViewManagerProjectQuery(undefined, {
      skip: !isAuth || role !== ENUM_ROLES.MANAGER,
    });

  const {
    data: viewsWalletTransactions,
    isLoading: isWalletTransactionsLoading,
  } = useGetViewTransactionsQuery(undefined, {
    skip: !isAuth || role === ENUM_ROLES.MANAGER,
  });

  return {
    viewsAdvProjects,
    isAdvProjectsLoading,
    viewsBloggerOffers,
    isBloggerOffersLoading,
    viewsBloggerChannels,
    isBloggerChannelsLoading,
    viewsManProjects,
    isManProjectsLoading,
    viewsWalletTransactions,
    isWalletTransactionsLoading,
  };
};
