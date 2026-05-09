import { memo, useState, useEffect, useRef } from 'react'
import { Eye, TrendingUp } from 'lucide-react'
import { formatMln } from '../lib/format'
import { useTranslation } from 'react-i18next'

interface Props {
  forecastMln: number
  forecastBonus: number
  hasCategory: boolean
}

export const ForecastCard = memo(function ForecastCard({ forecastMln, forecastBonus, hasCategory }: Props) {
  const { t } = useTranslation()
  const [isPulsing, setIsPulsing] = useState(false)
  const isFirstRender = useRef(true)

  // Локальный pulse — ререндерит ТОЛЬКО ForecastCard, не всё дерево
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setIsPulsing(true)
    const timer = setTimeout(() => setIsPulsing(false), 450)
    return () => clearTimeout(timer)
  }, [forecastMln])

  return (
    <div
      className={`flex items-center justify-between gap-2 sm:gap-3 p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 ${
        isPulsing
          ? 'bg-[#1AB5C5]/10 border-[#1AB5C5]/30 shadow-[0_0_20px_rgba(26,181,197,0.25)]'
          : 'bg-[#1AB5C5]/[0.05] border-[#1AB5C5]/15'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isPulsing
              ? 'bg-white text-[#1AB5C5] shadow-sm'
              : 'bg-[#1AB5C5]/10 text-[#1AB5C5]'
          }`}
        >
          <Eye size={18} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[11px] uppercase tracking-[0.12em] font-bold text-[#0F2A4D]/50">
            {hasCategory ? t("main_advertiser.cta.forecast.titleWithCategory") : t("main_advertiser.cta.forecast.titleDefault")}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-[18px] sm:text-[22px] font-bold tabular-nums leading-tight transition-colors ${
                isPulsing ? 'text-[#1AB5C5]' : 'text-[#0F2A4D]'
              }`}
            >
              <span className="inline-block will-change-transform transition-transform" style={{ transform: isPulsing ? 'scale(1.1)' : 'none', transformOrigin: 'left' }}>
                {formatMln(forecastMln)}
              </span>
            </span>
            <span className="text-[12px] font-medium text-[#0F2A4D]/55">
              {t("main_advertiser.cta.forecast.views")}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full shrink-0 will-change-transform transition-all ${
          isPulsing
            ? 'bg-green-500/25 text-green-600'
            : 'bg-green-500/[0.12] text-green-600'
        }`}
        style={{ transform: isPulsing ? 'scale(1.1)' : 'none' }}
      >
        <TrendingUp size={12} className={`transition-transform ${isPulsing ? '-translate-y-0.5' : ''}`} />
        <span className="text-[12px] font-bold tabular-nums">+{forecastBonus}%</span>
      </div>
    </div>
  )
})
