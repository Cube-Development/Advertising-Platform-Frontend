import { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { UseFormSetValue } from "react-hook-form";
import { ICreatePostForm, PostFormats } from "@entities/project";
import { platformTypes } from "@entities/platform";
import { IChannelLink } from "@entities/channel";

interface PlatformFilterProps {
  platforms: number[];
  setValue: UseFormSetValue<ICreatePostForm>;
  formats: PostFormats[];
  platformFilter: IChannelLink;
}

export const PlatformFilter: FC<PlatformFilterProps> = ({
  platforms,
  setValue,
  formats,
  platformFilter,
}) => {
  const { t } = useTranslation();
  // существующие форматы поста для выбранной платформы
  const existingFormats = formats
    .filter((format) => format?.platform === platformFilter?.id)
    .flatMap((format) => format?.post_types)
    .filter((post_type) =>
      platformTypes
        .find((platform) => platform.id === platformFilter?.id)
        ?.post_types.some((type) => type?.id === post_type),
    );

  const changeSelectedPlatform = (type: IChannelLink) => {
    setValue("platformFilter", type);
  };

  useEffect(() => {
    setValue(
      "platformFilter",
      platformTypes.find((type) => type.id === platforms[0]) ||
        platformTypes[0],
    );
  }, []);

  useEffect(() => {
    setValue("selectedPostType", existingFormats[0]);
  }, [platformFilter]);

  return (
    <div className={styles.types}>
      <p>{t("create_order.create.choose_platform")}</p>
      <ul>
        {platformTypes.map((type, index) => (
          <li
            className={
              platforms.includes(type?.id) && platformFilter === type
                ? styles.active
                : platforms.includes(type?.id) && platformFilter !== type
                  ? styles.non__active
                  : styles.disabled
            }
            onClick={() => changeSelectedPlatform(type)}
            key={index}
          >
            <p>{t(type?.name)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
