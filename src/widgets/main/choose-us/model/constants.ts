import React from 'react'
import { 
  LockKeyholeUnlocked, 
  ShieldCheck,
  Dollar,
  UsersGroupTwoRounded,
  Stopwatch,
  TickerStar,
  Widget,
  ShieldWarning,
  EyeClosed,
  UserRounded,
  Hourglass,
  Tag,
  Box,
  LockKeyholeMinimalistic
} from '@solar-icons/react'
import type { CardData } from './types'
import { TWO_PI } from '../lib/math'

export const CARD_DATA: CardData[] = [
  { 
    chaosLabel: 'main_advertiser.choose_us.cards.0.chaosLabel', 
    systemLabel: 'main_advertiser.choose_us.cards.0.systemLabel', 
    chaosIcon: React.createElement(LockKeyholeUnlocked, { size: 18 }), 
    systemIcon: React.createElement(LockKeyholeMinimalistic, { size: 18 }), 
    phase: 0 
  },
  { 
    chaosLabel: 'main_advertiser.choose_us.cards.1.chaosLabel', 
    systemLabel: 'main_advertiser.choose_us.cards.1.systemLabel', 
    chaosIcon: React.createElement(ShieldWarning, { size: 18 }), 
    systemIcon: React.createElement(ShieldCheck, { size: 18 }), 
    phase: 0.95 
  },
  { 
    chaosLabel: 'main_advertiser.choose_us.cards.2.chaosLabel', 
    systemLabel: 'main_advertiser.choose_us.cards.2.systemLabel', 
    chaosIcon: React.createElement(EyeClosed, { size: 18 }), 
    systemIcon: React.createElement(Dollar, { size: 18 }), 
    phase: 1.9 
  },
  { 
    chaosLabel: 'main_advertiser.choose_us.cards.3.chaosLabel', 
    systemLabel: 'main_advertiser.choose_us.cards.3.systemLabel', 
    chaosIcon: React.createElement(UsersGroupTwoRounded, { size: 18 }), 
    systemIcon: React.createElement(UserRounded, { size: 18 }), 
    phase: 2.85 
  },
  { 
    chaosLabel: 'main_advertiser.choose_us.cards.4.chaosLabel', 
    systemLabel: 'main_advertiser.choose_us.cards.4.systemLabel', 
    chaosIcon: React.createElement(Hourglass, { size: 18 }), 
    systemIcon: React.createElement(Stopwatch, { size: 18 }), 
    phase: 3.8 
  },
  { 
    chaosLabel: 'main_advertiser.choose_us.cards.5.chaosLabel', 
    systemLabel: 'main_advertiser.choose_us.cards.5.systemLabel', 
    chaosIcon: React.createElement(Tag, { size: 18 }), 
    systemIcon: React.createElement(TickerStar, { size: 18 }), 
    phase: 4.75 
  },
  { 
    chaosLabel: 'main_advertiser.choose_us.cards.6.chaosLabel', 
    systemLabel: 'main_advertiser.choose_us.cards.6.systemLabel', 
    chaosIcon: React.createElement(Box, { size: 18 }), 
    systemIcon: React.createElement(Widget, { size: 18 }), 
    phase: 5.7 
  },
]

export const N = CARD_DATA.length

/** Размер карточки */
export const CARD_WIDTH = 158
export const CARD_HEIGHT = 52

/** Радиус орбиты карточек */
export const ORBIT_RADIUS = 0.55

/** Базовая дистанция в хаосе */
export const CHAOS_BASE_DIST = 0.75



/** Предвычисленные смещения для хаотичного парения */
export const CHAOS_OFFSETS = CARD_DATA.map((_, i) => {
  const chaosAngle = (i / N) * TWO_PI + (i % 2 === 0 ? 0.35 : -0.25)
  return {
    x: Math.cos(chaosAngle + i * 0.8) * 0.06,
    y: Math.sin(chaosAngle * 1.4 + i) * 0.05,
  }
})

export function createInitialCards() {
  return CARD_DATA.map((d, i) => {
    // От вертикали (Math.PI / 2 в математических координатах, где Y вверх)
    // Отсчитываем вправо (по часовой стрелке, то есть минус угол)
    const baseAngle = Math.PI / 2 - (TWO_PI / N) * (i + 1)
    const baseDist = CHAOS_BASE_DIST + (i % 3) * 0.03
    return {
      ...d,
      index: i,
      baseAngle,
      baseDist,
      px: 0,
      py: 0,
      rotation: 0,
      connectTime: 0,
      connected: false,
      connectOrder: 0,
    }
  })
}
