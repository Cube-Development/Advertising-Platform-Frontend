import { memo, useCallback } from "react";
import { Radio } from "lucide-react";
import type { Category } from "../model/types";
import { CustomCarousel } from "@shared/ui/custom-carousel";
import { useTranslation } from "react-i18next";

interface Props {
  filteredCategories: (Category & { _idx: number })[];
  activeCategoryIdx: number | null;
  search: string;
  onSelect: (idx: number | null) => void;
}

// ─── Card ─────────────────────────────────────────────────────────────────────
interface CardProps {
  cat: Category & { _idx: number };
  isActive: boolean;
  onSelect: (idx: number | null) => void;
}

const Card = memo(({ cat, isActive, onSelect }: CardProps) => {
  const { t } = useTranslation();
  const CatIcon = cat.Icon;

  const handleClick = useCallback(
    () => onSelect(isActive ? null : cat._idx),
    [isActive, cat._idx, onSelect],
  );

  const cardShadow = isActive
    ? "0 4px 6px -3px #1AB5C555, inset 0 1px 0 rgba(255,255,255,0.1)"
    : "0 2px 4px rgba(15,42,77,0.01)";
  const cardShadowHover = isActive
    ? "0 8px 10px -3px #1AB5C577, inset 0 1px 0 rgba(255,255,255,0.1)"
    : "0 6px 8px -2px rgba(15,42,77,0.05)";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-2xl w-full p-3 text-left outline-none min-w-0 relative transition-transform duration-150 ease-out active:scale-[0.98] lg:transition-[transform,box-shadow] lg:duration-200 lg:hover:-translate-y-0.5 lg:hover:scale-[1.02] lg:hover:z-10 [box-shadow:var(--card-shadow)] lg:hover:[box-shadow:var(--card-shadow-hover)] ${
        isActive
          ? "bg-gradient-to-br from-[var(--Personal-colors-main)] to-[var(--Personal-colors-main2)] border-transparent z-10"
          : "bg-[#F7FAFC] border border-[#0F2A4D]/[0.06] z-[1]"
      }`}
      style={
        {
          "--card-shadow": cardShadow,
          "--card-shadow-hover": cardShadowHover,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div className="relative z-10 flex items-center gap-2 mb-2 min-w-0">
        <div
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
            isActive ? "bg-white/20 text-white" : "text-[#0F2A4D]"
          }`}
          {...(!isActive && { style: { background: cat.tint } })}
        >
          <CatIcon size={18} />
        </div>

        <div className="flex-1 min-w-0 flex items-center">
          <div
            className={`text-[11px] sm:text-[13px] font-semibold leading-snug min-w-0 break-words line-clamp-2 ${
              isActive ? "text-white" : "text-[#0F2A4D]"
            }`}
          >
            {cat.name}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className={`relative z-10 h-px w-full mb-2 transition-colors ${
          isActive ? "bg-white/20" : "bg-[#0F2A4D]/[0.07]"
        }`}
      />

      {/* Stats */}
      <div className="relative z-10 space-y-1.5">
        <Stat
          colorClass={isActive ? "text-white/95" : "text-[#0F2A4D]"}
          icon={
            <Radio
              size={13}
              className={isActive ? "opacity-85" : "opacity-50"}
            />
          }
        >
          <span className="tabular-nums">{cat.channels}</span>{" "}
          {t("main_advertiser.cta.categoryGrid.channels")}
        </Stat>

        {/* <Stat
          colorClass={isActive ? "text-white/95" : "text-[#0F2A4D]"}
          icon={
            <Eye size={13} className={isActive ? "opacity-85" : "opacity-50"} />
          }
        >
          <span className="tabular-nums">{cat.avgViewsMln.toFixed(1)}</span>{" "}
          {t("main_advertiser.cta.categoryGrid.mln")}{" "}
          {t("main_advertiser.cta.categoryGrid.views")}
        </Stat> */}
      </div>
    </button>
  );
});

// ─── Stat ─────────────────────────────────────────────────────────────────────
const Stat = ({
  icon,
  colorClass,
  children,
}: {
  icon: React.ReactNode;
  colorClass: string;
  children: React.ReactNode;
}) => (
  <div
    className={`flex items-center gap-1.5 text-[12px] font-semibold transition-colors ${colorClass}`}
  >
    {icon}
    <span>{children}</span>
  </div>
);

// ─── CategoryGrid ─────────────────────────────────────────────────────────────
export const CategoryGrid = memo(function CategoryGrid({
  filteredCategories,
  activeCategoryIdx,
  search,
  onSelect,
}: Props) {
  const { t } = useTranslation();
  const renderItem = useCallback(
    (cat: Category & { _idx: number }) => (
      <Card
        cat={cat}
        isActive={cat._idx === activeCategoryIdx}
        onSelect={onSelect}
      />
    ),
    [activeCategoryIdx, onSelect],
  );

  const getKey = useCallback((cat: Category & { _idx: number }) => cat.id, []);

  return (
    <div>
      {/* Header */}
      {/* <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] uppercase tracking-[0.12em] font-bold text-[#0F2A4D]/50">
          {t("main_advertiser.cta.categoryGrid.title")}
        </span>
        <span className="text-[11px] font-semibold tabular-nums text-[#00A99D]">
          {search ? (
            `${filteredCategories.length} ${t("main_advertiser.cta.categoryGrid.found")}`
          ) : (
            <>
              {activeCategoryIdx !== null
                ? String(activeCategoryIdx + 1).padStart(2, "0")
                : "--"}{" "}
              <span className="opacity-40">/ {TOTAL_CATS}</span>
            </>
          )}
        </span>
      </div> */}

      {filteredCategories.length === 0 ? (
        <div className="h-24 rounded-2xl py-8 text-center text-[12px] font-medium bg-[#F7FAFC] text-[#0F2A4D]/50 flex items-center justify-center">
          <p>
            {t("main_advertiser.cta.categoryGrid.notFound")} «{search}»
          </p>
        </div>
      ) : (
        <CustomCarousel
          items={filteredCategories}
          renderItem={renderItem}
          getKey={getKey}
          speed={2000}
          pauseOnHover
          slidesPerView={2.3}
        />
      )}
    </div>
  );
});
