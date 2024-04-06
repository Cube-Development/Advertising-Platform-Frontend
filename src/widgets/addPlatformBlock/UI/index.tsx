import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { PlatformLink } from "./platformLink";
import { PlatformParameters } from "./platformParameters";
import { PlatformTop } from "./platformTop";
import { IAddPlatformBlur } from "@shared/types/platform";

interface AddPlatformBlockProps {}

export const AddPlatformBlock: FC<AddPlatformBlockProps> = () => {
  const onBlur = { link: false, parameters: true };
  const [blur, setBlur] = useState<IAddPlatformBlur>(onBlur);

  const handleOnChangeBlur = (newBlur: IAddPlatformBlur) => {
    setBlur(newBlur);
  };

  return (
    <div>
      <PlatformTop />
      <PlatformLink blur={blur} onChangeBlur={handleOnChangeBlur} />
      {blur.link && (
        <PlatformParameters blur={blur} onChangeBlur={handleOnChangeBlur} />
      )}
    </div>
  );
};
