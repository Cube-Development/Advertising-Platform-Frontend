import {
  ICatalogCard,
  ICatalogChannel,
  IChangeCards,
  IFormat,
  platformToIcon,
} from "@entities/project";
import { BoyIcon, EyeIcon, GirlIcon, SubsIcon } from "@shared/assets";
import { useAppSelector } from "@shared/hooks";
import { CHANNEL_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PAGE_FILTER, ENUM_PATHS } from "@shared/routing";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { LoginPremiumAccess, LoginToViewMore } from "@features/user";
import { ChannelCardMatch } from "../components";

interface CompactCatalogCardProps extends IChangeCards, ICatalogCard {
  card: ICatalogChannel;
  page?: ENUM_PAGE_FILTER.CART;
}

export const CompactCatalogCard: FC<CompactCatalogCardProps> = ({
  card,
  AddToBasketBtn,
  FormatList,
  onChangeCard,
  page,
}) => {
  const { isPremiumUser, isAuth } = useAppSelector((state) => state.user);

  const isModal = !isAuth || !isPremiumUser;
  const Modal = () =>
    !isAuth ? (
      <LoginToViewMore />
    ) : !isPremiumUser ? (
      <LoginPremiumAccess />
    ) : null;

  let startFormat: IFormat;
  switch (Array.isArray(card?.selected_format)) {
    case true: {
      startFormat = card?.selected_format
        ? card.format.find(
            (format) =>
              format?.format === (card.selected_format as any)?.[0]?.format,
          )!
        : card.format[0];
      break;
    }
    case false: {
      startFormat = card?.selected_format
        ? card.format.find(
            (format) => format?.format === card.selected_format?.format,
          )!
        : card.format[0];
      break;
    }
  }

  const [selectedFormat, setSelectedFormat] = useState<IFormat>(startFormat);

  const handleChangeFormat = (selectedValue: IFormat) => {
    if (Array.isArray(selectedValue)) {
      setSelectedFormat(selectedValue[0]);
    } else {
      setSelectedFormat(selectedValue);
    }
    if (
      card?.selected_format &&
      card?.selected_format?.format !== selectedValue?.format
    ) {
      onChangeCard({ ...card, selected_format: selectedValue });
    }
  };

  const handleChangeCard = () => {
    onChangeCard({ ...card, selected_format: selectedFormat });
  };

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="bg-white/70 md:rounded-xl rounded-[7px] shadow-[0px_1px_4px_0.5px_rgba(0,0,0,0.1)] relative group hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
      onClick={handleChangeCard}
    >
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto] md:gap-2.5 gap-1.5 items-center md:pl-[10px] pl-[6px]">
        {/* Avatar */}
        <Link
          to={`${ENUM_PATHS.CHANNEL.replace(":id", card?.id)}`}
          className="size-8 md:size-10 rounded-full overflow-hidden border border-[--Personal-colors-main] shrink-0 block"
          onClick={stopPropagation}
        >
          <img
            src={card?.avatar}
            alt={card?.name}
            className="object-cover w-full h-full"
          />
        </Link>

        {/* Name / Category / Languages */}
        <div className="min-w-0 flex flex-col gap-0.5 py-2">
          <Link
            to={`${ENUM_PATHS.CHANNEL.replace(":id", card?.id)}`}
            className="leading-3 block md:hidden text-[9px] font-semibold text-[--Personal-colors-main] truncate"
            onClick={stopPropagation}
          >
            {card?.name}
          </Link>
          <div className="flex items-center gap-1.5 min-w-0">
            <Link
              to={`${ENUM_PATHS.CHANNEL.replace(":id", card?.id)}`}
              className="hidden md:block text-[13px] font-semibold text-[--Personal-colors-main] truncate leading-tight"
              onClick={stopPropagation}
            >
              {card?.name}
            </Link>
            {card?.channel_languages && (
              <div className="flex gap-0.5 items-center bg-none md:bg-[rgba(15,105,201,0.1)] md:rounded md:px-1 md:py-0.5 p-0 shrink-0">
                {[...card.channel_languages]
                  .sort((a, b) => a - b)
                  .map((lang) => {
                    const info = CHANNEL_LANGUAGES_LIST.find(
                      (l) => l.id === lang,
                    );
                    if (!info) return null;
                    return (
                      <img
                        key={info.id}
                        src={`/images/${info.icon}.svg`}
                        alt={info.name}
                        className="md:size-2.5 size-2"
                      />
                    );
                  })}
              </div>
            )}
          </div>
          <p className="text-[8px] md:text-[11px] text-[--Subtitle-text] font-medium truncate leading-tight">
            {card?.category}
          </p>
          {card?.url && (
            <p className="text-[8px] md:text-[10px] text-[var(--URL)] font-medium truncate leading-tight">
              {card?.url}
            </p>
          )}
        </div>

        {/* Stats — compact 2x2 grid + gender bar */}
        <div
          className="flex flex-col gap-1 bg-[rgba(15,105,201,0.06)] md:rounded-lg rounded-[7px] px-3 py-1.5"
          onClick={stopPropagation}
        >
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-1.5 gap-y-1 items-center">
            <div className="flex items-center gap-1.5">
              <div className="[&>svg]:h-[10px] [&>svg]:w-auto">
                <SubsIcon />
              </div>
              <span className="text-[8px] md:text-[11px] font-semibold md:font-medium text-black">
                {card?.subscribers?.toLocaleString()}
              </span>
            </div>
            {/* Gender bar */}
            <div className="hidden md:flex items-center gap-1">
              <div className="[&>svg]:h-[10px] [&>svg]:w-auto">
                <BoyIcon />
              </div>
              <div
                className="colorline flex-1 !min-h-[4px]"
                style={{ "--male": `${card?.male}%` } as React.CSSProperties}
              />
              <div className="[&>svg]:h-[10px] [&>svg]:w-auto">
                <GirlIcon />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="[&>svg]:h-[10px] [&>svg]:w-auto">
                <EyeIcon />
              </div>
              <span className="text-[8px] md:text-[11px] font-semibold md:font-medium text-black">
                {isModal ? <Modal /> : selectedFormat?.views?.toLocaleString()}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <span className="text-[10px] text-black/50 font-semibold">
                ER:
              </span>
              <span className="text-[11px] font-medium text-black">
                {isModal ? <Modal /> : <>{selectedFormat?.er}%</>}
              </span>
            </div>
            {/* <div className="flex items-center gap-1">
              <span className="text-[10px] text-black/50 font-semibold">
                CPV:
              </span>
              <span className="text-[11px] font-medium text-black">
                {isModal ? (
                  <Modal />
                ) : (
                  <>
                    {selectedFormat?.cpv?.toLocaleString()} {t("symbol")}
                  </>
                )}
              </span>
            </div> */}
          </div>
        </div>

        {/* Match */}
        <div onClick={stopPropagation}>
          <ChannelCardMatch
            match={card.match ? Math.ceil(card.match) : undefined}
            variant="compact"
          />
        </div>

        {/* Action button */}
        <div
          onClick={stopPropagation}
          className="flex self-stretch [&>button]:!rounded-l-none md:[&>button]:!rounded-r-xl [&>button]:!rounded-r-[7px] [&>button]:!shadow-none [&_[aria-haspopup]]:!px-2 [&_[aria-haspopup]]:!py-1 [&_[aria-haspopup]]:!rounded-md [&_[aria-haspopup]_*]:!text-[12px] [&_[aria-haspopup]_*]:!font-medium"
        >
          <AddToBasketBtn
            selectedFormat={selectedFormat}
            FormatList={FormatList}
            changeFormat={handleChangeFormat}
            changeCard={handleChangeCard}
            card={card}
            page={page}
            isSmallCatalogCard={true}
          />
        </div>
      </div>

      {/* Platform icon */}
      <div className="md:block hidden absolute top-1 left-1 size-3">
        {card?.platform && card?.platform in platformToIcon
          ? platformToIcon[card.platform!]()
          : null}
      </div>
    </div>
  );
};
