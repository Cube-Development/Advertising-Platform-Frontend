import {
  IAdminChannelData,
  IAdminEditChannelData,
} from "@entities/admin-panel";
import {
  PLATFORM_PARAMETERS,
  useGetChannelAgesQuery,
  useGetChannelCategoriesQuery,
  useGetChannelFormatsQuery,
  useGetChannelLanguagesQuery,
  useGetChannelRegionsQuery
} from "@entities/channel";
import { platformTypesNum } from "@entities/platform";
import { useFindLanguage } from "@entities/user";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

interface Props {
  card: IAdminChannelData;
}

export const useChannelData = ({ card }: Props) => {
  const language = useFindLanguage();

  const contentRes = {
    language: language?.id || USER_LANGUAGES_LIST[0].id,
    page: 1,
  };

  let defaultValues = {
    male: PLATFORM_PARAMETERS.defaultSexMale,
    female: 100 - PLATFORM_PARAMETERS.defaultSexMale,
    category: undefined,
    description: undefined,
    text_limit: PLATFORM_PARAMETERS.defaultTextLimit,
    region: [],
    language: [],
    age: [],
    format: [],
  };

  const { setValue, watch, reset } = useForm<IAdminEditChannelData>({
    defaultValues: defaultValues,
  });

  const formState = watch();

  const formatsResTg = { ...contentRes, platform: platformTypesNum.telegram };
  const formatsResInsta = {
    ...contentRes,
    platform: platformTypesNum.instagram,
  };
  const formatsResYouTube = {
    ...contentRes,
    platform: platformTypesNum.youtube,
  };
  const { data: formatsTg } = useGetChannelFormatsQuery(formatsResTg);
  const { data: formatsInsta } = useGetChannelFormatsQuery(formatsResInsta);
  const { data: formatsYouTube } = useGetChannelFormatsQuery(formatsResYouTube);

  const { data: categories } = useGetChannelCategoriesQuery(contentRes);
  const { data: ages } = useGetChannelAgesQuery(contentRes);
  const { data: regions } = useGetChannelRegionsQuery(contentRes);
  const { data: languages } = useGetChannelLanguagesQuery(contentRes);

  const formats = useMemo(() => {
    return card?.channel?.platform === platformTypesNum?.telegram
      ? formatsTg?.contents || []
      : card?.channel?.platform === platformTypesNum?.instagram
        ? formatsInsta?.contents || []
        : formatsYouTube?.contents || [];
  }, [card?.channel?.platform, formatsTg, formatsInsta, formatsYouTube]);

  return {
    setValue,
    formState,
    categories,
    regions,
    languages,
    formats,
    ages,
    reset,
  };
};
