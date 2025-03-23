import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ChannelCardMatch } from "../components";
import {
  ICatalogCard,
  ICatalogChannel,
  IChangeCards,
  IFormat,
  platformToIcon,
} from "@entities/project";
import { EyeIcon, RatingIcon, SubsIcon } from "@shared/assets";
import { ChannelLanguages } from "@shared/config";
import { pageFilter, paths } from "@shared/routing";

interface SmallCatalogCardProps extends IChangeCards, ICatalogCard {
  card: ICatalogChannel;
  page?: pageFilter.cart;
}

export const SmallCatalogCard: FC<SmallCatalogCardProps> = ({
  card,
  AddToBasketBtn,
  FormatList,
  onChangeCard,
  page,
}) => {
  const startFormat: IFormat = card?.selected_format
    ? card.format.find(
        (format) => format?.format === card.selected_format?.format,
      )!
    : card.format[0];
  const [selectedFormat, setSelectedFormat] = useState<IFormat>(startFormat);

  const handleChangeFormat = (selectedValue: IFormat) => {
    setSelectedFormat(selectedValue);
    if (
      card?.selected_format &&
      card?.selected_format?.format !== selectedValue?.format
    ) {
      onChangeCard({
        ...card,
        selected_format: selectedValue,
      });
    }
  };

  const handleChangeCard = () => {
    onChangeCard({
      ...card,
      selected_format: selectedFormat,
    });
  };

  return (
    <div className="bg-white/70 mobile-xl:rounded-[10px] rounded-[5px] shadow-[0px_1px_5px_0.5px_rgba(0,0,0,0.1)] relative">
      <div className="grid grid-cols-[auto_2fr_1fr_1fr_1fr] xl:gap-3 gap-1.5 mobile-xl:p-2 p-1 items-center">
        {/* Лого + Рейтинг */}
        <div className="flex flex-col items-center gap-1">
          <Link
            to={`${paths.channel.replace(":id", card?.id)}`}
            className="mobile-xl:size-[40px] mobile:size-[34px] mobile-xs:size-[30px] size-[28px] rounded-full overflow-hidden border border-[--Personal-colors-main]"
          >
            <img
              src={card?.avatar}
              alt="logo"
              className="w-full h-full object-cover"
            />
          </Link>
          <div>
            <span className="mobile-xl:[&>svg]:w-[50px] mobile:[&>svg]:w-[40px] [&>svg]:w-[34px]">
              <RatingIcon />
            </span>
          </div>
        </div>

        {/* Название и категория */}
        <div className="flex flex-col mobile-xl:gap-1 gap-0.5 min-w-0">
          <Link
            to={`${paths.channel.replace(":id", card?.id)}`}
            className="text-[--Personal-colors-main] font-semibold xl:text-sm mobile-xl:text-xs text-[10px] truncate"
          >
            {card?.name}
          </Link>
          {card?.channel_languages && (
            <div className="flex gap-1 items-center bg-[rgba(15,105,201,0.1)] mobile-xl:rounded-[4px] rounded-[2px] mobile-xl:px-1.5 mobile-xl:py-1 px-1 py-0.5 w-fit">
              {[...card.channel_languages]
                .sort((a, b) => a - b)
                .map((lang) => {
                  const languageInfo = ChannelLanguages.find(
                    (l) => l.id === lang,
                  );
                  if (!languageInfo) return "...";
                  return (
                    <img
                      key={languageInfo.id}
                      src={`/images/${languageInfo.icon}.svg`}
                      alt={languageInfo.name}
                      className="mobile-xl:size-3 size-2"
                    />
                  );
                })}
            </div>
          )}
          <p className="text-[--Subtitle-text] xl:text-xs mobile-xl:text-[10px] text-[8px] font-medium truncate">
            {card?.category}
          </p>
        </div>

        {/* Подписчики и просмотры */}
        <div className="grid grid-flow-row justify-center gap-1 h-full">
          <div className="flex items-center mobile-xl:gap-2 gap-1">
            <div className="w-[14px]">
              <SubsIcon />
            </div>
            <span className="xl:text-xs mobile-xl:text-[10px] text-[9px] mobile-xl:font-medium font-semibold text-black">
              {card?.subscribers?.toLocaleString()}
            </span>
          </div>
          <div
            className="colorline mobile-xl:mt-3 mt-1"
            style={{ "--male": `${card?.male}%` } as React.CSSProperties}
            data-male={`${card?.male}%`}
            data-female={`${card?.female}%`}
          />
          <div className="flex items-center mobile-xl:gap-2 gap-1">
            <div className="w-[14px]">
              <EyeIcon />
            </div>
            <span className="xl:text-xs mobile-xl:text-[10px] text-[9px] mobile-xl:font-medium font-semibold text-black">
              {selectedFormat?.views!.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Совпадение */}
        <ChannelCardMatch
          match={card.match ? Math.ceil(card.match) : undefined}
          variant="compact"
        />

        {/* Кнопка */}
        <AddToBasketBtn
          selectedFormat={selectedFormat}
          FormatList={FormatList}
          changeFormat={handleChangeFormat}
          changeCard={handleChangeCard}
          card={card}
          page={page}
          isSmallCatalogCard={true}
        />

        {/* Иконка платформы */}
        <div className="mobile-xl:block hidden absolute top-1 left-1 size-3">
          {card?.platform && card?.platform in platformToIcon
            ? platformToIcon[card.platform!]()
            : "..."}
        </div>
      </div>
    </div>
  );
};
