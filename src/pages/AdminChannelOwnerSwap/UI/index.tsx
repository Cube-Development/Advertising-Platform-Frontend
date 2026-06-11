import { SuspenseLoader } from "@shared/ui";
import { ChannelOwnerSwap } from "@widgets/adminPanel";
import { Suspense } from "react";

export const AdminChannelOwnerSwapPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ChannelOwnerSwap />
    </Suspense>
  );
};
