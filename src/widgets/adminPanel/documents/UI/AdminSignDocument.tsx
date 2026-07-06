import { SignDocument } from "@features/documents";
import { FC, ComponentProps } from "react";
import { EcpActionGate } from "../../lib/EcpActionGate";

type AdminSignDocumentProps = ComponentProps<typeof SignDocument>;

export const AdminSignDocument: FC<AdminSignDocumentProps> = (props) => {
  return (
    <EcpActionGate>
      <SignDocument {...props} />
    </EcpActionGate>
  );
};
