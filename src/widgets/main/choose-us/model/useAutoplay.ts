import { useEffect, useRef, useCallback } from 'react'
import type { HeroMode } from './types'

const AUTOPLAY_DELAY = 1500

interface UseAutoplayOptions {
  containerRef: React.RefObject<HTMLElement | null>
  mode: HeroMode
  setMode: (mode: HeroMode) => void
}

/**
 * Автоплей: переключает chaos → system один раз,
 * когда виджет попадает в viewport.
 *
 * - IntersectionObserver отслеживает видимость.
 * - При входе в viewport: таймер 1500ms → переключение.
 * - При выходе до срабатывания: таймер сбрасывается.
 * - Любое пользовательское взаимодействие отменяет автоплей навсегда.
 */
export function useAutoplay({ containerRef, mode, setMode }: UseAutoplayOptions) {
  const hasAutoplayRun = useRef(false)
  const userInteracted = useRef(false)
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null)

  /** Вызвать при любом пользовательском взаимодействии (клик, drag, switch) */
  const markUserInteracted = useCallback(() => {
    userInteracted.current = true
    // Отменить pending таймер
    if (timerId.current !== null) {
      clearTimeout(timerId.current)
      timerId.current = null
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Вошёл в viewport
          if (hasAutoplayRun.current || userInteracted.current) return
          timerId.current = setTimeout(() => {
            if (hasAutoplayRun.current || userInteracted.current) return
            hasAutoplayRun.current = true
            setMode('system')
          }, AUTOPLAY_DELAY)
        } else {
          // Вышел из viewport — сброс таймера
          if (timerId.current !== null) {
            clearTimeout(timerId.current)
            timerId.current = null
          }
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      if (timerId.current !== null) {
        clearTimeout(timerId.current)
      }
    }
  }, [containerRef, setMode])

  return { markUserInteracted }
}
