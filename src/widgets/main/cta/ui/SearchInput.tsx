import { memo } from 'react'
import { Search, X } from 'lucide-react'
import { TOTAL_CATS } from '../model/constants'
import { Input } from '@shared/ui'
import { useTranslation } from 'react-i18next'

interface Props {
  value: string
  onChange: (v: string) => void
}

export const SearchInput = memo(function SearchInput({ value, onChange }: Props) {
  const { t } = useTranslation()
  return (
    <div className="relative flex items-center">
      <Search
        size={15}
        className="absolute left-3.5 z-10 pointer-events-none text-[#0F2A4D]/45"
      />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("main_advertiser.cta.search.placeholderPrefix") + TOTAL_CATS + "+" + t("main_advertiser.cta.search.placeholderSuffix")}
        className="w-full pl-10 pr-9 h-10 rounded-xl text-[13px] font-medium transition-all bg-[#F7FAFC] border-[#0F2A4D]/[0.08] text-[#0F2A4D] focus:border-[#1AB5C5]/40"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 z-10 w-5 h-5 rounded-full flex items-center justify-center bg-[#0F2A4D]/[0.08] text-[#0F2A4D]"
        >
          <X size={11} />
        </button>
      )}
    </div>
  )
})
