// InfiniteCarousel.tsx
import { useRef, useEffect, useCallback } from 'react'

interface InfiniteCarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  getKey: (item: T, index: number) => string | number
  speed?: number
  gap?: number
  copies?: number
  pauseOnHover?: boolean
  paused?: boolean
  itemWidth: number
  className?: string
  itemClassName?: string
}

export function InfiniteCarousel<T>({
  items,
  renderItem,
  getKey,
  speed = 60,
  gap = 12,
  copies = 3,
  pauseOnHover = true,
  paused: externalPaused = false,
  itemWidth,
  className,
  itemClassName,
}: InfiniteCarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  const xRef = useRef(0)
  const activeIdxRef = useRef<number | null>(null)
  const hoveredRef = useRef(false)
  const draggingRef = useRef(false)
  const didDragRef = useRef(false)
  const velRef = useRef(0)
  const lastDragRef = useRef({ x: 0, t: 0 })
  const dragStartRef = useRef({ cx: 0, xp: 0 })
  const lastTRef = useRef<number | null>(null)
  const rafRef = useRef<number>()
  const inertiaRef = useRef<number>()
  const scrollAnimRef = useRef<number | null>(null)

  const setW = (itemWidth + gap) * items.length

  const normalizeX = useCallback(() => {
    if (!setW) return
    if (xRef.current < -setW) xRef.current += setW
    if (xRef.current > 0) xRef.current -= setW
  }, [setW])

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${Math.round(xRef.current)}px)`
    }
  }, [])

  const refreshActiveClass = useCallback(() => {
    if (!trackRef.current) return
    trackRef.current.querySelectorAll<HTMLElement>('[data-real-idx]').forEach(el => {
      const ri = parseInt(el.dataset.realIdx!)
      el.dataset.active = ri === activeIdxRef.current ? 'true' : 'false'
    })
  }, [])

  const findNearestTargetX = useCallback((realIdx: number): number => {
    const step = itemWidth + gap
    const baseOffset = -(realIdx * step)
    let best = baseOffset
    let bestDist = Math.abs(xRef.current - baseOffset)
    for (let c = -copies; c <= copies; c++) {
      const candidate = baseOffset - c * setW
      const dist = Math.abs(xRef.current - candidate)
      if (dist < bestDist) { bestDist = dist; best = candidate }
    }
    return best
  }, [itemWidth, gap, copies, setW])

  const scrollToNearest = useCallback((realIdx: number) => {
    if (scrollAnimRef.current) {
      cancelAnimationFrame(scrollAnimRef.current)
      scrollAnimRef.current = null
    }
    const target = findNearestTargetX(realIdx)
    const startX = xRef.current
    const startT = performance.now()
    const dur = 420
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    const step = (now: number) => {
      const p = Math.min((now - startT) / dur, 1)
      xRef.current = startX + (target - startX) * ease(p)
      applyTransform()
      if (p < 1) {
        scrollAnimRef.current = requestAnimationFrame(step)
      } else {
        scrollAnimRef.current = null
        normalizeX()
        applyTransform()
      }
    }
    scrollAnimRef.current = requestAnimationFrame(step)
  }, [findNearestTargetX, applyTransform, normalizeX])

  // Main RAF loop
  useEffect(() => {
    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop)
      if (!lastTRef.current) { lastTRef.current = now; return }
      const dt = Math.min((now - lastTRef.current) / 1000, 0.05)
      lastTRef.current = now
      const frozen =
        activeIdxRef.current !== null ||
        (pauseOnHover && hoveredRef.current) ||
        draggingRef.current ||
        scrollAnimRef.current !== null ||
        externalPaused
      if (!frozen) {
        xRef.current -= speed * dt
        normalizeX()
        applyTransform()
      }
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [speed, pauseOnHover, externalPaused, normalizeX, applyTransform])

  // Drag handlers
  const onDragStart = useCallback((cx: number) => {
    draggingRef.current = true
    didDragRef.current = false
    dragStartRef.current = { cx, xp: xRef.current }
    lastDragRef.current = { x: cx, t: performance.now() }
    velRef.current = 0
    if (inertiaRef.current) cancelAnimationFrame(inertiaRef.current)
    if (scrollAnimRef.current) {
      cancelAnimationFrame(scrollAnimRef.current)
      scrollAnimRef.current = null
    }
    rootRef.current?.classList.add('is-dragging')
  }, [])

  const onDragMove = useCallback((cx: number) => {
    if (!draggingRef.current) return
    const delta = cx - dragStartRef.current.cx
    if (Math.abs(delta) > 4) didDragRef.current = true
    const now = performance.now()
    const dt = now - lastDragRef.current.t
    if (dt > 0) velRef.current = (cx - lastDragRef.current.x) / (dt / 1000)
    lastDragRef.current = { x: cx, t: now }
    xRef.current = dragStartRef.current.xp + delta
  }, [])

  const onDragEnd = useCallback(() => {
    if (!draggingRef.current) return
    draggingRef.current = false
    rootRef.current?.classList.remove('is-dragging')
    let v = velRef.current
    const inertia = () => {
      v *= 0.91
      xRef.current += v / 60
      normalizeX()
      applyTransform()
      if (Math.abs(v) > 0.5) inertiaRef.current = requestAnimationFrame(inertia)
    }
    inertiaRef.current = requestAnimationFrame(inertia)
  }, [normalizeX, applyTransform])

  useEffect(() => {
    const onMove = (e: MouseEvent) => onDragMove(e.clientX)
    const onUp = () => onDragEnd()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [onDragMove, onDragEnd])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault()
      xRef.current -= e.deltaX
      normalizeX()
      applyTransform()
    }
  }, [normalizeX, applyTransform])

  const handleItemClick = useCallback((realIdx: number) => {
    if (didDragRef.current) return
    if (realIdx === activeIdxRef.current) {
      activeIdxRef.current = null
    } else {
      activeIdxRef.current = realIdx
      scrollToNearest(realIdx)
    }
    refreshActiveClass()
  }, [scrollToNearest, refreshActiveClass])

  const repeatedItems = Array.from({ length: copies }, (_, ci) =>
    items.map((item, i) => ({ item, i, ci }))
  ).flat()

  return (
    <div
      ref={rootRef}
      className={className}
      style={{ overflow: 'hidden', cursor: 'grab' }}
      onMouseEnter={() => { if (pauseOnHover) hoveredRef.current = true }}
      onMouseLeave={() => { hoveredRef.current = false }}
      onMouseDown={e => onDragStart(e.clientX)}
      onTouchStart={e => onDragStart(e.touches[0].clientX)}
      onTouchMove={e => onDragMove(e.touches[0].clientX)}
      onTouchEnd={onDragEnd}
      onWheel={handleWheel}
    >
      <div ref={trackRef} style={{ display: 'flex', willChange: 'transform' }}>
        {repeatedItems.map(({ item, i, ci }) => (
          <div
            key={`${getKey(item, i)}-${ci}`}
            data-real-idx={i}
            data-active="false"
            className={itemClassName}
            style={{ flexShrink: 0, marginRight: gap }}
            onClick={() => handleItemClick(i)}
          >
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </div>
  )
}