import {
  BellBing,
  ChartSquare,
  ChatRoundDots,
  CheckCircle,
  Global,
  GraphUp,
  Magnifer,
  PenNewSquare,
  Target
} from '@solar-icons/react'
import React from 'react'
import type { Feature } from './types'

const STEP_SIZE = 100_000
const BUDGET_MIN = 1_500_000
const BUDGET_MAX = 20_000_000

export const STEPS = Array.from(
  { length: (BUDGET_MAX - BUDGET_MIN) / STEP_SIZE + 1 },
  (_, i) => BUDGET_MIN + i * STEP_SIZE,
)

/** Ориентиры на оси X — только 5 ключевых точек */
export const AXIS_LABELS = [
  { value: 1_500_000, label: 'main_advertiser.tarif_pricing.budgetSlider.axis.0' },
  { value: 5_000_000, label: 'main_advertiser.tarif_pricing.budgetSlider.axis.1' },
  { value: 10_000_000, label: 'main_advertiser.tarif_pricing.budgetSlider.axis.2' },
  { value: 15_000_000, label: 'main_advertiser.tarif_pricing.budgetSlider.axis.3' },
  { value: 20_000_000, label: 'main_advertiser.tarif_pricing.budgetSlider.axis.4' },
]

/** Конвертирует сумму в индекс шага */
export function valueToStepIdx(value: number): number {
  return Math.round((value - BUDGET_MIN) / STEP_SIZE)
}

export const FEATURES: Feature[] = [
  {
    id: 'f1',
    name: 'main_advertiser.tarif_pricing.features.0.name',
    sub: 'main_advertiser.tarif_pricing.features.0.sub',
    icon: React.createElement(Magnifer, { size: 18 }),
    min: 0,
  },
  {
    id: 'f2',
    name: 'main_advertiser.tarif_pricing.features.1.name',
    sub: 'main_advertiser.tarif_pricing.features.1.sub',
    icon: React.createElement(Target, { size: 18 }),
    min: 0,
  },
  {
    id: 'f3',
    name: 'main_advertiser.tarif_pricing.features.2.name',
    sub: 'main_advertiser.tarif_pricing.features.2.sub',
    icon: React.createElement(PenNewSquare, { size: 18 }),
    min: 3_000_000,
  },
  {
    id: 'f4',
    name: 'main_advertiser.tarif_pricing.features.3.name',
    sub: 'main_advertiser.tarif_pricing.features.3.sub',
    icon: React.createElement(BellBing, { size: 18 }),
    min: 5_000_000,
  },
  {
    id: 'f5',
    name: 'main_advertiser.tarif_pricing.features.4.name',
    sub: 'main_advertiser.tarif_pricing.features.4.sub',
    icon: React.createElement(CheckCircle, { size: 18 }),
    min: 7_000_000,
  },
  {
    id: 'f6',
    name: 'main_advertiser.tarif_pricing.features.5.name',
    sub: 'main_advertiser.tarif_pricing.features.5.sub',
    icon: React.createElement(ChatRoundDots, { size: 18 }),
    min: 10_000_000,
  },
  {
    id: 'f7',
    name: 'main_advertiser.tarif_pricing.features.6.name',
    sub: 'main_advertiser.tarif_pricing.features.6.sub',
    icon: React.createElement(ChartSquare, { size: 18 }),
    min: 13_000_000,
  },
  {
    id: 'f8',
    name: 'main_advertiser.tarif_pricing.features.7.name',
    sub: 'main_advertiser.tarif_pricing.features.7.sub',
    icon: React.createElement(GraphUp, { size: 18 }),
    min: 16_000_000,
  },
  {
    id: 'f9',
    name: 'main_advertiser.tarif_pricing.features.8.name',
    sub: 'main_advertiser.tarif_pricing.features.8.sub',
    icon: React.createElement(Global, { size: 18, weight: 'Bold' }),
    min: 18_000_000,
  },
]
