import { SignAccounting } from "@features/admin-panel";
import { FC, ComponentProps } from "react";
import { EcpActionGate } from "../../lib/EcpActionGate";

type AdminSignAccountingProps = ComponentProps<typeof SignAccounting>;

export const AdminSignAccounting: FC<AdminSignAccountingProps> = (props) => {
  return (
    <EcpActionGate>
      <SignAccounting {...props} />
    </EcpActionGate>
  );
};
