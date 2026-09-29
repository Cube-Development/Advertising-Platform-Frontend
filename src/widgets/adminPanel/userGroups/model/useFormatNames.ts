import { platformTypesNum } from "@entities/platform";
import { useGetChannelFormatsQuery } from "@entities/channel";
import { useFindLanguage } from "@entities/user";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { useMemo } from "react";

export const useFormatNames = () => {
  const language = useFindLanguage();
  const lang = language?.id || USER_LANGUAGES_LIST[0].id;
  const base = { language: lang, page: 1 };

  const telegram = useGetChannelFormatsQuery({
    ...base,
    platform: platformTypesNum.telegram,
  });
  const instagram = useGetChannelFormatsQuery({
    ...base,
    platform: platformTypesNum.instagram,
  });
  const youtube = useGetChannelFormatsQuery({
    ...base,
    platform: platformTypesNum.youtube,
  });
  const site = useGetChannelFormatsQuery({
    ...base,
    platform: platformTypesNum.site,
  });

  return useMemo(() => {
    const names = new Map<number, string>();
    [telegram.data, instagram.data, youtube.data, site.data].forEach(
      (response) => {
        response?.contents?.forEach((format) => {
          names.set(format.id, format.big || format.small || String(format.id));
        });
      },
    );
    return names;
  }, [telegram.data, instagram.data, youtube.data, site.data]);
};
