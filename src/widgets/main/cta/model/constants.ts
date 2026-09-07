export const TEAL = "#1AB5C5";
export const TEAL_DEEP = "#16C7D4";
export const NAVY = "#0F2A4D";
export const TOTAL_CATS = 217;

/**
 * Сколько категорий одновременно живёт в карусели.
 *
 * Бэкенд отдаёт 217 штук, и раньше все они рендерились слайдами Swiper с
 * loop + autoplay. Это давало ~4650 лишних DOM-узлов из 5963 на странице, а
 * значит каждый кадр любой анимации пересобирал композиторные слои по всему
 * дереву: в профиле Layerize занимал 1175 мс из 5 секунд, CPU на простое
 * держался на 32%. Прокрутить взглядом 217 автопрокручиваемых карточек всё
 * равно нельзя — для точного поиска рядом есть строка поиска.
 */
export const VISIBLE_CATEGORIES = 16;
export const MIN_BUDGET = 100_000;
export const MAX_BUDGET = 20_000_000;
export const BUDGET_RANGE = MAX_BUDGET - MIN_BUDGET;

export const AXIS_LABELS: { value: number; label: string }[] = [
  { value: MIN_BUDGET, label: "main_advertiser.cta.budgetSlider.axis.0" },
  { value: 5_000_000, label: "main_advertiser.cta.budgetSlider.axis.1" },
  { value: 10_000_000, label: "main_advertiser.cta.budgetSlider.axis.2" },
  { value: 15_000_000, label: "main_advertiser.cta.budgetSlider.axis.3" },
  { value: MAX_BUDGET, label: "main_advertiser.cta.budgetSlider.axis.4" },
];
