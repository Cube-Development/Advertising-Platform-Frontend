import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { PlatformLink } from "./platformLink";
import { PlatformParameters } from "./platformParameters";
import { PlatformTop } from "./platformTop";
import {
  IAddPlatformBlur,
  IReadChannelData,
  IPlatformLink,
} from "@shared/types/platform";
import { platformTypes } from "@shared/config/postFilter";
import { useAppSelector } from "@shared/store";

interface AddPlatformBlockProps {}

const card: IReadChannelData = {
  id: "sldksl;dkal;sdk;",
  name: "Канал",
  description:
    "описаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописание",
  category: { id: 2, name: "Авто и мото" },
  url: "Https//t.me/@samplesample",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
  male: 70,
  female: 30,
  platform: 1,
  language: [
    { id: 2, name: "🇬🇧 Английский" },
    { id: 3, name: "🇷🇺 Русский" },
  ],
  age: [
    { id: 2, name: "18-34 лет" },
    { id: 3, name: "35-44 лет" },
    { id: 4, name: "45-54 лет" },
  ],
  region: [
    { id: 5, name: "Навои" },
    { id: 6, name: "Наманган" },
    { id: 7, name: "Самарканд" },
  ],
  text_limit: 2000,
  format: [
    {
      format: 2,
      format_name: {
        small: "1/24",
        big: "1/24",
      },
      price: 13000000,
    },
    {
      format: 3,
      format_name: {
        small: "1/48",
        big: "1/48",
      },
      price: 2000000,
    },
  ],
};

export const AddPlatformBlock: FC<AddPlatformBlockProps> = () => {
  let onBlur;
  const channelId = undefined;
  channelId
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
          channel={card}
        />
      )}
    </div>
  );
};
