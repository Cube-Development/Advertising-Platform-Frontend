import { useEffect, useRef } from 'react'
import type { HeroMode } from './types'
import { ORBIT_RADIUS, CARD_WIDTH, CARD_HEIGHT, CHAOS_BASE_DIST, createInitialCards } from './constants'
import { easeInOut } from '../lib/math'
import { drawBackground, drawConnectionLines } from '../lib/canvas-renderer'

interface AnimState {
  cards: ReturnType<typeof createInitialCards>
  t: number
  transP: number
  lastTime: number
  mouse: { x: number; y: number }
  dragging: number | null
  dragOffX: number
  dragOffY: number
  /** Фаза вращения орбиты (замораживается во время перехода) */
  orbitPhase: number
  /** Время переключения в system (для поочередного включения) */
  systemStartTime: number
  /** Предыдущий режим (для отслеживания момента переключения) */
  prevIsSystem: boolean
  /** Кеш DOM-состояния для предотвращения лишних записей */
  domConnected: boolean[]
  domInitialized: boolean
}

/** Frame-rate independent lerp (exponential smoothing) */
function dLerp(a: number, b: number, speed: number, dt: number) {
  return a + (b - a) * (1 - Math.exp(-speed * dt))
}

/**
 * Хук анимации BlogixHero.
 *
 * Подход:
 * 1. Вычисляем chaos-позицию и system-позицию отдельно.
 * 2. Blend между ними через prog (0=chaos, 1=system).
 * 3. dLerp к целевой позиции — гладкий переход без дуг.
 * 4. Stagger: карточка «подключается» когда prog > base + i * step.
 *    В этот момент connectTime фиксируется, connected=true,
 *    и canvas рисует flash + луч.
 */
export function useHeroAnimation(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  containerRef: React.RefObject<HTMLDivElement | null>,
  cardRefs: React.RefObject<(HTMLDivElement | null)[]>,
  mode: HeroMode,
) {
  const stateRef = useRef<AnimState>({
    cards: createInitialCards(),
    t: 0,
    transP: 0,
    lastTime: performance.now(),
    mouse: { x: -9999, y: -9999 },
    dragging: null,
    dragOffX: 0,
    dragOffY: 0,
    orbitPhase: 0,
    systemStartTime: 0,
    prevIsSystem: false,
    domConnected: [],
    domInitialized: false,
  })

  const modeRef = useRef(mode)

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0
    let H = 0
    let animId = 0

    function resize() {
      const r = container!.getBoundingClientRect()
      W = r.width
      H = r.height
      canvas!.width = W * dpr
      canvas!.height = H * dpr
    }
    resize()

    // --- Обработчики мыши ---
    const onMouseDown = (e: MouseEvent) => {
      if (modeRef.current === 'system') return
      const r = canvas!.getBoundingClientRect()
      const mx = e.clientX - r.left
      const my = e.clientY - r.top
      const s = stateRef.current

      for (let i = s.cards.length - 1; i >= 0; i--) {
        const c = s.cards[i]
        if (
          Math.abs(mx - c.px) < CARD_WIDTH / 2 + 6 &&
          Math.abs(my - c.py) < CARD_HEIGHT / 2 + 6
        ) {
          s.dragging = i
          s.dragOffX = mx - c.px
          s.dragOffY = my - c.py
          break
        }
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const r = canvas!.getBoundingClientRect()
      const s = stateRef.current
      s.mouse.x = e.clientX - r.left
      s.mouse.y = e.clientY - r.top
      if (s.dragging !== null) {
        const c = s.cards[s.dragging]
        c.px = s.mouse.x - s.dragOffX
        c.py = s.mouse.y - s.dragOffY
      }
    }

    const onMouseUp = () => {
      stateRef.current.dragging = null
    }

    const onMouseLeave = () => {
      const s = stateRef.current
      s.dragging = null
      s.mouse.x = -9999
      s.mouse.y = -9999
    }

    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('mouseleave', onMouseLeave)

    const ro = new ResizeObserver(resize)
    ro.observe(container)

    // --- Главный цикл ---
    function draw(ts: number) {
      animId = requestAnimationFrame(draw)
      const s = stateRef.current
      const dt = Math.min((ts - s.lastTime) / 1000, 0.05)
      s.lastTime = ts
      s.t = ts / 1000

      const isSystem = modeRef.current === 'system'
      const CX = W / 2
      const CY = H / 2
      const BASE_HEIGHT = 700
      const scale = Math.min(W, BASE_HEIGHT) * 0.5

      // Прогресс перехода (0 = chaos, 1 = system)
      const rawTarget = isSystem ? 1 : 0
      s.transP = dLerp(s.transP, rawTarget, 2.5, dt)
      const prog = easeInOut(Math.max(0, Math.min(s.transP, 1)))

      // ── Момент переключения в систему ──
      if (isSystem && !s.prevIsSystem) {
        s.systemStartTime = s.t
        // Генерируем случайную очередь (0..N-1)
        const indices = s.cards.map((_, i) => i)
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]]
        }
        s.cards.forEach((card, i) => {
          card.connectOrder = indices.indexOf(i)
        })
      }
      s.prevIsSystem = isSystem

      // ── Фаза вращения орбиты ──
      // Во время перехода: НЕТ вращения (слоты строго фиксированы).
      // После полного подключения (prog ≈ 1): плавно добавляем вращение.
      const ORBIT_SPEED = 0.15
      if (isSystem && prog > 0.98) {
        // Начинаем вращение с текущей позиции
        s.orbitPhase += ORBIT_SPEED * dt
      } else if (!isSystem) {
        // В хаосе: сбрасываем фазу к 0 кратчайшим путем
        s.orbitPhase = s.orbitPhase % (Math.PI * 2)
        if (s.orbitPhase > Math.PI) s.orbitPhase -= Math.PI * 2
        if (s.orbitPhase < -Math.PI) s.orbitPhase += Math.PI * 2
        
        s.orbitPhase = dLerp(s.orbitPhase, 0, 3, dt)
        if (Math.abs(s.orbitPhase) < 0.001) s.orbitPhase = 0
      }
      // Во время перехода (isSystem && prog <= 0.98): orbitPhase сохраняет значение 0 (заморожена)

      // --- Canvas ---
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.clearRect(0, 0, W, H)
      drawBackground(ctx!, W, H, CX, CY, scale, s.t, isSystem, prog)

      // --- Позиции карточек + stagger connect ---
      s.cards.forEach((card, i) => {
        if (s.dragging === i) return

        const phase = card.phase
        const t = s.t

        // ── Stagger: detect connection ──
        // Задержка 0.5с после нажатия, затем поочередный случайный выстрел каждые 150мс
        const connectTimeTarget = s.systemStartTime + 0.5 + card.connectOrder * 0.15

        if (isSystem && t >= connectTimeTarget && !card.connected) {
          card.connected = true
          card.connectTime = t
        }
        // Сброс при возврате в chaos
        if (!isSystem && prog < 0.1) {
          card.connected = false
          card.connectTime = 0
        }

        // ── Chaos target ──
        // baseAngle = (TWO_PI / N) * i — тот же угол, что и слот!
        // Базовое смещение (0.35 / -0.25)
        let chaosOffset = i % 2 === 0 ? 0.35 : -0.25;
        // Разводим 5-ю и 6-ю карточки, так как их базовые смещения сталкивают их
        if (i === 5) chaosOffset = -0.05; 
        if (i === 6) chaosOffset = 0.15;  
        
        const chaosAngle = card.baseAngle + chaosOffset;
        
        // 3 верхние карточки (0, 5, 6) чуть ближе к центру (~ на 10%)
        const distMult = (i === 0 || i === 5 || i === 6) ? 0.9 : 1;
        const chaosDist = (CHAOS_BASE_DIST + (i % 3) * 0.03) * distMult;
        const chaosX = Math.cos(chaosAngle) * chaosDist * scale
          // Увеличиваем скорость (t * 0.85) и амплитуду (0.08) парения по X
          + Math.sin(t * 0.5 + phase) * scale * 0.08
          + Math.cos(chaosAngle + i * 0.8) * scale * 0.03
        const chaosY = -Math.sin(chaosAngle) * chaosDist * scale
          // Увеличиваем скорость (t * 0.75) и амплитуду (0.07) парения по Y
          + Math.cos(t * 0.5 + phase) * scale * 0.03
          + Math.sin(chaosAngle * 1.4 + i) * scale * 0.025

        // ── System target ──
        // Фиксированный слот: (TWO_PI / N) * i + замороженная/плавная фаза
        const orbitAngle = card.baseAngle + s.orbitPhase
        const sysX = Math.cos(orbitAngle) * ORBIT_RADIUS * scale
        const sysY = -Math.sin(orbitAngle) * ORBIT_RADIUS * scale

        // ── Blend ──
        const targetX = CX + chaosX + (sysX - chaosX) * prog
        const targetY = CY + chaosY + (sysY - chaosY) * prog

        // Плавный dLerp к цели
        card.px = dLerp(card.px, targetX, 6, dt)
        card.py = dLerp(card.py, targetY, 6, dt)

        // ── Rotation (покачивание затухает при переходе в system) ──
        // Увеличиваем угол покачивания с 8 до 14 градусов
        const chaosRot = Math.sin(t * 0.45 + phase) * 14
        const targetRot = chaosRot * (1 - prog)
        card.rotation = dLerp(card.rotation, targetRot, 5, dt)
      })

      // Лучи и вспышки
      drawConnectionLines(ctx!, CX, CY, scale, s.t, s.cards)

      // --- DOM-карточки ---
      s.cards.forEach((card, i) => {
        const el = cardRefs.current?.[i]
        if (!el) return

        const elW = el.offsetWidth
        const elH = el.offsetHeight
        el.style.transform = `translate(${card.px - elW / 2}px, ${card.py - elH / 2}px) rotate(${card.rotation}deg)`

        // opacity — один раз при инициализации
        if (!s.domInitialized) {
          el.style.opacity = '1'
        }

        // data-connected — только при изменении
        if (card.connected !== s.domConnected[i]) {
          s.domConnected[i] = card.connected
          if (card.connected) {
            el.setAttribute('data-connected', 'true')
          } else {
            el.removeAttribute('data-connected')
          }
        }
      })
      s.domInitialized = true
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      ro.disconnect()
    }
  }, [canvasRef, containerRef, cardRefs])
}
