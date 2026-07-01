import { UnsignAccounting } from "@features/admin-panel";
import { FC, ComponentProps } from "react";
import { EcpActionGate } from "../../lib/EcpActionGate";

type AdminUnsignAccountingProps = ComponentProps<typeof UnsignAccounting>;

export const AdminUnsignAccounting: FC<AdminUnsignAccountingProps> = (
  props,
) => {
  return (
    <EcpActionGate>
      <UnsignAccounting {...props} />
    </EcpActionGate>
  );
};
