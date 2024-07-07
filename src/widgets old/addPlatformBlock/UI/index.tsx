import { FC, useState } from "react";
import { PlatformLink } from "./platformLink";
import { PlatformParameters } from "./platformParameters";
import { PlatformTop } from "./platformTop";
import { IAddPlatformBlur, IPlatformLink } from "@shared/types/platform";
import { platformTypes } from "@shared/config/postFilter";
import { QueryParams } from "@features/queryParams";

interface AddPlatformBlockProps {}

export const AddPlatformBlock: FC<AddPlatformBlockProps> = () => {
  let onBlur;
  const { channel_id, add_channel } = QueryParams();

  channel_id
    ? (onBlur = { link: true, parameters: false })
    : (onBlur = { link: false, parameters: true });
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
      <PlatformTop channel_id={channel_id!} query={add_channel!} />
      <PlatformLink
        currentPlatform={currentPlatform}
        setCurrentPlatform={setCurrentPlatform}
        blur={blur}
        onChangeBlur={handleOnChangeBlur}
        setInserCode={setInserCode}
        channel_id={channel_id!}
      />
      {blur.link && (
        <PlatformParameters
          currentPlatform={currentPlatform}
          blur={blur}
          onChangeBlur={handleOnChangeBlur}
          inserCode={inserCode}
          channel_id={channel_id!}
        />
      )}
    </div>
  );
};
