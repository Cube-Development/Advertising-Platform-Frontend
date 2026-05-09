import type { RectMap } from '../model/types'

export function applyFlip(
  cardRefs: Record<string, HTMLDivElement | null>,
  before: RectMap,
) {
  for (const [id, el] of Object.entries(cardRefs)) {
    if (!el || !before[id]) continue
    const after = el.getBoundingClientRect()
    const dx = before[id].x - after.x
    const dy = before[id].y - after.y
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) continue

    el.style.transition = 'none'
    el.style.transform = `translate(${dx}px, ${dy}px)`

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition =
          'transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 280ms ease'
        el.style.transform = 'translate(0, 0)'
        const onEnd = () => {
          el.style.transition = ''
          el.style.transform = ''
          el.removeEventListener('transitionend', onEnd)
        }
        el.addEventListener('transitionend', onEnd)
      })
    })
  }
}
