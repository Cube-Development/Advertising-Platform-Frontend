/** forecastMln — охват в миллионах показов; в UI — целое число показов без сокращений */
export function formatForecastViews(mln: number, locale?: string): string {
  return Math.round(mln * 1_000_000).toLocaleString(locale);
}
