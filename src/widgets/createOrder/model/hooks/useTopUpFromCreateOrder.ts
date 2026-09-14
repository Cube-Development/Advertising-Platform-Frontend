import { ICreatePostForm } from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { topup } from "@entities/wallet";
import { useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { useToast } from "@shared/ui";
import {
  buildPathWithQuery,
  getAmountWithCommission,
  queryParamKeys,
} from "@shared/utils";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type PaymentFn = (
  formData: ICreatePostForm,
  projectId: string,
  role: ENUM_ROLES,
  saveOnly?: boolean,
  options?: { skipSaveNavigate?: boolean },
) => Promise<boolean>;

interface Props {
  payment: PaymentFn;
  projectId: string;
  totalAmount: number;
  role: ENUM_ROLES;
}

export const useTopUpFromCreateOrder = ({
  payment,
  projectId,
  totalAmount,
  role,
}: Props) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { spending_wallet } = useAppSelector((state) => state.wallet);

  const handleTopUp = async (formData: ICreatePostForm) => {
    if (!projectId) return;

    toast({
      title: t("toasts.create_order.save.before_topup"),
    });

    const ok = await payment(formData, projectId, role, true, {
      skipSaveNavigate: true,
    });
    if (!ok) return;

    const amount = getAmountWithCommission(
      totalAmount - spending_wallet,
      topup.commission,
    );

    navigate(
      buildPathWithQuery(ENUM_PATHS.WALLET_TOP_UP, {
        [queryParamKeys.projectId]: projectId,
        [queryParamKeys.amount]: amount ? String(amount) : undefined,
      }),
    );
  };

  return { handleTopUp };
};
