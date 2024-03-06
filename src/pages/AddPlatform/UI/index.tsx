import { PlatformIdentification } from "@widgets/platformIdentification";
import { PlatformInfo } from "@widgets/platformInfo";
import { PlatformTop } from "@widgets/platformTop";
import { FC, useState } from "react";

export const AddPlatformPage: FC = () => {
  return (
    <>
      <PlatformTop />
      <PlatformIdentification />
      <PlatformInfo />
    </>
  );
};
