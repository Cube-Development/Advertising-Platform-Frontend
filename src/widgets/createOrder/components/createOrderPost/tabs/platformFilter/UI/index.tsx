import { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@shared/store";
import { filterSlice } from "@shared/store/reducers";
import { UseFormSetValue } from "react-hook-form";
import { ICreatePostForm, PostFormats } from "@entities/project";
import { platformTypes } from "@entities/platform";
import { IChannelLink } from "@entities/channel";

interface PlatformFilterProps {
  platforms: number[];
  setValue: UseFormSetValue<ICreatePostForm>;
  formats: PostFormats[];
}

export const PlatformFilter: FC<PlatformFilterProps> = ({
  platforms,
  setValue,
  formats,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { platformFilter: selectedPlatform } = useAppSelector(
    (state) => state.filter,
  );
  // существующие форматы поста для выбранной платформы
  const existingFormats = formats
    .filter((format) => format.platform === selectedPlatform.id)
    .flatMap((format) => format.post_types)
    .filter((post_type) =>
      platformTypes
        .find((platform) => platform.id === selectedPlatform.id)
        ?.post_types.some((type) => type.id === post_type),
    );

  const changeSelectedPlatform = (type: IChannelLink) => {
    dispatch(filterSlice.actions.setPlatformFilter(type));
  };

  useEffect(() => {
    dispatch(
      filterSlice.actions.setPlatformFilter(
        platformTypes.find((type) => type.id === platforms[0]) ||
          platformTypes[0],
      ),
    );
  }, []);

  useEffect(() => {
    setValue("selectedPostType", existingFormats[0]);
  }, [selectedPlatform]);

  return (
    <div className={styles.types}>
      <p>{t("create_order.create.choose_platform")}</p>
      <ul>
        {platformTypes.map((type, index) => (
          <li
            className={
              platforms.includes(type.id) && selectedPlatform === type
                ? styles.active
                : platforms.includes(type.id) && selectedPlatform !== type
                  ? styles.non__active
                  : styles.disabled
            }
            onClick={() => changeSelectedPlatform(type)}
            key={index}
          >
            <p>{t(type.name)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
