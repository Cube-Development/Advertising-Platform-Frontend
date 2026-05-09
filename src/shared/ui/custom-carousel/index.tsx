import {
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from 'react'

export interface CustomCarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  getKey: (item: T, index: number) => string | number
  speed?: number
  gap?: number
  copies?: number
  pauseOnHover?: boolean
  paused?: boolean
  exposeCssWidth?: boolean
  className?: string
  itemClassName?: string
  activeItemClassName?: string
  onActiveChange?: (index: number | null) => void
}

export function CustomCarousel<T>({
  items,
  renderItem,
  getKey,
  speed = 60,
  gap = 12,
  copies,
  pauseOnHover = true,
  paused = false,
  exposeCssWidth = false,
  className = '',
  itemClassName,
  activeItemClassName,
  onActiveChange,
}: CustomCarouselProps<T>) {
  const rootRef  = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const setRef   = useRef<HTMLDivElement>(null)

  const x          = useRef(0)
  const setW       = useRef(0)
  const itemW      = useRef(0) // ширина одной карточки (без gap)
  const hoveredRef = useRef(false)
  const dragging   = useRef(false)
  const didDrag    = useRef(false)
  const vel        = useRef(0)
  const lastT      = useRef<number | null>(null)
  const dragStart  = useRef({ cx: 0, xp: 0 })
  const lastDrag   = useRef({ x: 0, t: 0 })
  const rafId      = useRef<number>()
  const inertiaId  = useRef<number>()
  const scrollAnim = useRef<number | null>(null)
  const activeIdx  = useRef<number | null>(null)

  const copiesCount = copies ?? Math.max(4, Math.ceil(20 / Math.max(1, items.length)))

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${Math.round(x.current)}px)`
    }
  }, [])

  const normalizeX = useCallback(() => {
    const sw = setW.current
    if (!sw) return
    if (x.current < -sw) x.current += sw
    if (x.current > 0)   x.current -= sw
  }, [])

  // ── ResizeObserver: контейнер ──────────────────────────────────────────
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => {
      if (exposeCssWidth) {
        rootRef.current?.style.setProperty('--cw', `${e.contentRect.width}px`)
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [exposeCssWidth])

  // ── ResizeObserver: ширина одного набора + одной карточки ──────────────
  useEffect(() => {
    const el = setRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => {
      setW.current = e.contentRect.width
      // itemW = (setW - gap * items.length) / items.length
      // Но проще: первый child setRef — это первая карточка
      const firstItem = el.firstElementChild as HTMLElement | null
      if (firstItem) {
        // getBoundingClientRect учитывает transform родителя — используем offsetWidth
        itemW.current = firstItem.offsetWidth
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [items.length])

  // ── Рассчитываем offset карточки по индексу (без DOM) ─────────────────
  const getItemOffset = useCallback((index: number): number => {
    return index * (itemW.current + gap)
  }, [gap])

  // ── Ищем ближайшую копию по x ─────────────────────────────────────────
  const findNearestX = useCallback((index: number): number => {
    const sw = setW.current
    const base = -getItemOffset(index)
    if (!sw) return base
    let best = base
    let bestDist = Math.abs(x.current - base)
    for (let c = -copiesCount; c <= copiesCount; c++) {
      const candidate = base - c * sw
      const dist = Math.abs(x.current - candidate)
      if (dist < bestDist) { bestDist = dist; best = candidate }
    }
    return best
  }, [copiesCount, getItemOffset])

  const scrollToItem = useCallback((index: number) => {
    if (scrollAnim.current) {
      cancelAnimationFrame(scrollAnim.current)
      scrollAnim.current = null
    }
    const target  = findNearestX(index)
    const startX  = x.current
    const startT  = performance.now()
    const dur     = 420
    const ease    = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    const step    = (now: number) => {
      const p = Math.min((now - startT) / dur, 1)
      x.current = startX + (target - startX) * ease(p)
      applyTransform()
      if (p < 1) {
        scrollAnim.current = requestAnimationFrame(step)
      } else {
        scrollAnim.current = null
        normalizeX()
        applyTransform()
      }
    }
    scrollAnim.current = requestAnimationFrame(step)
  }, [findNearestX, applyTransform, normalizeX])

  // ── Активный элемент: обновляем классы напрямую через DOM ─────────────
  const refreshActiveClasses = useCallback(() => {
    if (!trackRef.current) return
    trackRef.current
      .querySelectorAll<HTMLElement>('[data-carousel-item]')
      .forEach(el => {
        const idx = parseInt(el.dataset.index!)
        const isActive = idx === activeIdx.current
        el.dataset.active = isActive ? 'true' : 'false'
        if (activeItemClassName) {
          activeItemClassName.split(' ').forEach(cls => {
            el.classList.toggle(cls, isActive)
          })
        }
      })
  }, [activeItemClassName])

  const handleItemClick = useCallback((index: number) => {
    if (didDrag.current) return
    if (index === activeIdx.current) {
      activeIdx.current = null
      onActiveChange?.(null)
    } else {
      activeIdx.current = index
      onActiveChange?.(index)
      scrollToItem(index)
    }
    refreshActiveClasses()
  }, [scrollToItem, refreshActiveClasses, onActiveChange])

  // ── RAF loop ───────────────────────────────────────────────────────────
  useEffect(() => {
    const loop = (now: number) => {
      rafId.current = requestAnimationFrame(loop)
      if (!lastT.current) { lastT.current = now; return }
      const dt = Math.min((now - lastT.current) / 1000, 0.05)
      lastT.current = now
      const frozen =
        paused ||
        activeIdx.current !== null ||
        (pauseOnHover && hoveredRef.current) ||
        dragging.current ||
        scrollAnim.current !== null
      if (!frozen) {
        x.current -= speed * dt
        normalizeX()
        applyTransform()
      }
    }
    lastT.current = null
    rafId.current = requestAnimationFrame(loop)
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current) }
  }, [speed, pauseOnHover, paused, normalizeX, applyTransform])

  // ── Drag ───────────────────────────────────────────────────────────────
  const onDragStart = useCallback((cx: number) => {
    dragging.current  = true
    didDrag.current   = false
    dragStart.current = { cx, xp: x.current }
    lastDrag.current  = { x: cx, t: performance.now() }
    vel.current       = 0
    if (inertiaId.current) cancelAnimationFrame(inertiaId.current)
    if (scrollAnim.current) {
      cancelAnimationFrame(scrollAnim.current)
      scrollAnim.current = null
    }
    rootRef.current?.classList.add('is-dragging')
  }, [])

  const onDragMove = useCallback((cx: number) => {
    if (!dragging.current) return
    const delta = cx - dragStart.current.cx
    if (Math.abs(delta) > 4) didDrag.current = true
    const now = performance.now()
    const dt  = now - lastDrag.current.t
    if (dt > 0) vel.current = (cx - lastDrag.current.x) / (dt / 1000)
    lastDrag.current = { x: cx, t: now }
    x.current = dragStart.current.xp + delta
    // normalizeX намеренно не вызывается во время drag —
    // иначе при пересечении границы setW карусель "прыгает" под пальцем
    applyTransform()
  }, [applyTransform])

  const onDragEnd = useCallback(() => {
    if (!dragging.current) return
    dragging.current = false
    rootRef.current?.classList.remove('is-dragging')
    let v = vel.current
    const inertia = () => {
      v *= 0.91
      x.current += v / 60
      normalizeX()
      applyTransform()
      if (Math.abs(v) > 0.5) inertiaId.current = requestAnimationFrame(inertia)
    }
    inertiaId.current = requestAnimationFrame(inertia)
  }, [normalizeX, applyTransform])

  useEffect(() => {
    const onMove = (e: MouseEvent) => onDragMove(e.clientX)
    const onUp   = () => onDragEnd()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [onDragMove, onDragEnd])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault()
      x.current -= e.deltaX
      normalizeX()
      applyTransform()
    }
  }, [normalizeX, applyTransform])

  const rootStyle: CSSProperties = {
    overflow: 'hidden',
    cursor: 'grab',
    userSelect: 'none',
  }

  return (
    <div
      ref={rootRef}
      className={`${className} [&.is-dragging]:cursor-grabbing`}
      style={rootStyle}
      onMouseEnter={() => { if (pauseOnHover) hoveredRef.current = true }}
      onMouseLeave={() => { hoveredRef.current = false }}
      onMouseDown={e => onDragStart(e.clientX)}
      onTouchStart={e => onDragStart(e.touches[0].clientX)}
      onTouchMove={e => { e.preventDefault(); onDragMove(e.touches[0].clientX) }}
      onTouchEnd={onDragEnd}
      onWheel={handleWheel}
    >
      <div ref={trackRef} style={{ display: 'flex', willChange: 'transform' }}>
        {Array.from({ length: copiesCount }).map((_, ci) => (
          <div
            key={ci}
            ref={ci === 0 ? setRef : null}
            style={{ display: 'flex', flexShrink: 0 }}
          >
            {items.map((item, i) => (
              <div
                key={`${ci}-${getKey(item, i)}`}
                className={itemClassName}
                style={{ flexShrink: 0, marginRight: gap }}
                data-carousel-item=""
                data-copy={ci}
                data-index={i}
                data-active="false"
                onClick={() => handleItemClick(i)}
              >
                {renderItem(item, i)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}