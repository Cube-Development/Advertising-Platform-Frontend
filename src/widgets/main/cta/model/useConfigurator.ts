import { useMemo, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useFindLanguage } from "@entities/user";
import {
  useGetChannelRegionsQuery,
  useGetChannelLanguagesQuery,
  useGetCompanyCategoriesQuery,
} from "@entities/channel";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { MIN_BUDGET, MAX_BUDGET } from "./constants";
import { CATEGORY_ICON_MAPPER, DEFAULT_CATEGORY_ICON } from "./categoryIcons";
import type { ConfiguratorFormValues, Category } from "./types";

const DEFAULTS: ConfiguratorFormValues = {
  categoryIdx: null,
  budget: 5_000_000,
  region: [],
  language: [],
};

// Хелпер для генерации цвета фона иконки на основе ID
const getCategoryTint = (id: number) => {
  const tints = [
    "#FFE8DA",
    "#FFF1D6",
    "#FCE3F0",
    "#E0F0FF",
    "#E5EAFF",
    "#DEF7E5",
    "#FFE5E0",
    "#E0F4F7",
    "#DEF1FF",
    "#E5F0FF",
    "#FFE5EC",
    "#F5E1FF",
    "#FFEEC7",
    "#FFE0E5",
  ];
  return tints[id % tints.length];
};

const calculateReach = (budget: number, catViews: number) =>
  (budget * catViews) / 15_0000_000;
const calculateBonus = (budgetPercent: number, catViews: number) =>
  Math.round((catViews / 3) * 50 + budgetPercent / 4);

export function useConfigurator() {
  const { watch, setValue, getValues } = useForm<ConfiguratorFormValues>({
    defaultValues: DEFAULTS,
  });

  const formState = watch();

  const [accordionOpen, setAccordionOpen] = useState(false);
  const [search, setSearch] = useState("");

  // ── Данные с бэкенда ──────────────────────────────────────────────────────
  const userLanguage = useFindLanguage();
  const contentRes = {
    language: userLanguage?.id || USER_LANGUAGES_LIST[0].id,
    page: 1,
    elements_on_page: 300, // Берем побольше, чтобы захватить все основные категории
  };

  const { data: categoriesData } = useGetCompanyCategoriesQuery(contentRes);
  const { data: regionsData } = useGetChannelRegionsQuery(contentRes);
  const { data: languagesData } = useGetChannelLanguagesQuery(contentRes);

  // Маппинг категорий из API в формат приложения
  const categories: Category[] = useMemo(() => {
    if (!categoriesData?.contents) return [];

    return categoriesData.contents.map((cat) => ({
      id: String(cat.id),
      name: cat.name,
      Icon: CATEGORY_ICON_MAPPER[cat.id] || DEFAULT_CATEGORY_ICON,
      tint: getCategoryTint(cat.id),
      // Генерируем псевдо-данные для визуализации, если их нет в API
      channels: ((cat.id * 7) % 40) + 5,
      avgViewsMln: Number((((cat.id * 1.3) % 5) + 0.5).toFixed(1)),
    }));
  }, [categoriesData]);

  // ── Расчёты ───────────────────────────────────────────────────────────────
  const budgetPercent =
    ((formState.budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100;

  const filteredCategories = useMemo(
    () =>
      categories
        .map((c, idx) => ({ ...c, _idx: idx }))
        .filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase().trim()),
        ),
    [search, categories],
  );

  const activeCategory =
    formState.categoryIdx !== null ? categories[formState.categoryIdx] : null;

  const forecastMln = useMemo(() => {
    if (activeCategory)
      return calculateReach(formState.budget, activeCategory.avgViewsMln);
    if (categories.length === 0) return 0;
    return (
      categories.reduce(
        (acc, cat) => acc + calculateReach(formState.budget, cat.avgViewsMln),
        0,
      ) / categories.length
    );
  }, [activeCategory, formState.budget, categories]);

  const forecastBonus = useMemo(() => {
    if (activeCategory)
      return calculateBonus(budgetPercent, activeCategory.avgViewsMln);
    if (categories.length === 0) return 0;
    const avg =
      categories.reduce(
        (acc, cat) => acc + calculateBonus(budgetPercent, cat.avgViewsMln),
        0,
      ) / categories.length;
    return Math.round(avg);
  }, [activeCategory, budgetPercent, categories]);

  return {
    setValue,
    formState,
    regionsData: regionsData?.contents ?? [],
    languagesData: languagesData?.contents ?? [],
    accordionOpen,
    setAccordionOpen,
    search,
    setSearch,
    filteredCategories,
    activeCategory,
    forecastMln,
    forecastBonus,
  };
}
