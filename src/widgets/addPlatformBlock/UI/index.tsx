import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { PlatformLink } from "./platformLink";
import { PlatformParameters } from "./platformParameters";
import { PlatformTop } from "./platformTop";
import { IAddPlatformBlur, IPlatformLink } from "@shared/types/platform";
import { platformTypes } from "@shared/config/postFilter";

interface AddPlatformBlockProps {}

export const AddPlatformBlock: FC<AddPlatformBlockProps> = () => {
  const onBlur = { link: false, parameters: true };
  const [blur, setBlur] = useState<IAddPlatformBlur>(onBlur);

  const handleOnChangeBlur = (newBlur: IAddPlatformBlur) => {
    setBlur(newBlur);
  };

  const [currentPlatform, setCurrentPlatform] = useState<IPlatformLink>(
    platformTypes[0],
  );
  const [inserCode, setInserCode] = useState<string>("");

  return (
    <div>
      <PlatformTop />
      <PlatformLink
        currentPlatform={currentPlatform}
        setCurrentPlatform={setCurrentPlatform}
        blur={blur}
        onChangeBlur={handleOnChangeBlur}
        setInserCode={setInserCode}
      />
      {blur.link && (
        <PlatformParameters
          currentPlatform={currentPlatform}
          blur={blur}
          onChangeBlur={handleOnChangeBlur}
          inserCode={inserCode}
        />
      )}
    </div>
  );
};
