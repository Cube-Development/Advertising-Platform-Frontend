import { TWO_PI } from "./math";

// Основной бренд-цвет #0badc2
const BRAND = "11,173,194";
const BRAND_HEX = "#0badc2";

// Кеш для gradient-объектов (избегаем аллокации каждый кадр)
let _hubGlowCache: {
  cx: number;
  cy: number;
  r: number;
  grad: CanvasGradient;
} | null = null;

/**
 * Рисует фон canvas: орбитальные кольца с точками и центральную планету.
 */
export function drawBackground(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  CX: number,
  CY: number,
  scale: number,
  t: number,
  _isSystem: boolean,
  prog: number,
) {
  ctx.clearRect(0, 0, W, H);

  const ORBITR = 0.39;

  // Внешнее тонкое кольцо
  ctx.save();
  ctx.strokeStyle = `rgba(${BRAND},0.12)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(CX, CY, scale * (ORBITR + 0.08), 0, TWO_PI);
  ctx.stroke();
  ctx.restore();

  // Основное кольцо орбиты
  ctx.save();
  ctx.strokeStyle = `rgba(${BRAND},0.2)`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(CX, CY, scale * ORBITR, 0, TWO_PI);
  ctx.stroke();
  ctx.restore();

  // Мягкое свечение орбиты
  ctx.save();
  ctx.strokeStyle = `rgba(${BRAND},0.025)`;
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.arc(CX, CY, scale * ORBITR, 0, TWO_PI);
  ctx.stroke();
  ctx.restore();

  // Точки-коннекторы на орбите
  const dotCount = 8;
  for (let d = 0; d < dotCount; d++) {
    const da = (TWO_PI / dotCount) * d + t * 0.06;
    const dx = CX + Math.cos(da) * scale * ORBITR;
    const dy = CY + Math.sin(da) * scale * ORBITR;
    ctx.beginPath();
    ctx.arc(dx, dy, 3, 0, TWO_PI);
    ctx.fillStyle = `rgba(${BRAND},0.35)`;
    ctx.fill();
  }

  // Border beam sweep (только при активации системы)
  if (prog > 0.3) {
    drawBorderBeam(ctx, CX, CY, scale * ORBITR, t, prog);
  }

  drawPlanet(ctx, CX, CY, scale);
}

/**
 * Бегущий световой сегмент по орбитальному кольцу.
 * Появляется при prog > 0.3, полная яркость при prog = 1.
 */
function drawBorderBeam(
  ctx: CanvasRenderingContext2D,
  CX: number,
  CY: number,
  R: number,
  t: number,
  prog: number,
) {
  const beamAlpha = Math.min((prog - 0.3) / 0.4, 1); // fade in от 0.3 до 0.7
  const sweepSpeed = 1.2;
  const sweepAngle = t * sweepSpeed;
  const arcLen = 0.35; // длина дуги в радианах

  ctx.save();
  ctx.globalAlpha = beamAlpha * 0.8;

  // Glow pass — один shadowBlur вместо 12
  ctx.beginPath();
  ctx.arc(CX, CY, R, sweepAngle, sweepAngle + arcLen);
  ctx.strokeStyle = BRAND_HEX;
  ctx.lineWidth = 3;
  ctx.shadowColor = BRAND_HEX;
  ctx.shadowBlur = 16;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.restore();
}

/** Рисует центральную планету «Blogix» */
function drawPlanet(
  ctx: CanvasRenderingContext2D,
  CX: number,
  CY: number,
  scale: number,
) {
  const hubR = scale * 0.26;

  // Свечение — кешируем gradient
  if (
    !_hubGlowCache ||
    _hubGlowCache.cx !== CX ||
    _hubGlowCache.cy !== CY ||
    _hubGlowCache.r !== hubR
  ) {
    const grad = ctx.createRadialGradient(
      CX,
      CY,
      hubR * 0.5,
      CX,
      CY,
      hubR * 1.6,
    );
    grad.addColorStop(0, `rgba(${BRAND},0.05)`);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    _hubGlowCache = { cx: CX, cy: CY, r: hubR, grad };
  }
  ctx.fillStyle = _hubGlowCache.grad;
  ctx.fillRect(CX - hubR * 2, CY - hubR * 2, hubR * 4, hubR * 4);

  // Белый круг
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.06)";
  ctx.shadowBlur = 16;
  ctx.beginPath();
  ctx.arc(CX, CY, hubR, 0, TWO_PI);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.strokeStyle = `rgba(${BRAND},0.18)`;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  // Текст «Blogix»
  ctx.save();
  ctx.font = `700 ${hubR * 0.32}px system-ui, -apple-system, sans-serif`;
  ctx.fillStyle = BRAND_HEX;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Blogix", CX, CY);
  // ctx.font = `400 ${hubR * 0.14}px system-ui, -apple-system, sans-serif`
  // ctx.fillStyle = `rgba(${BRAND},0.5)`
  // ctx.fillText('платформа', CX, CY + hubR * 0.32)
  ctx.restore();
}

/**
 * Рисует лучи от подключённых карточек к центру + вспышки при подключении.
 */
export function drawConnectionLines(
  ctx: CanvasRenderingContext2D,
  CX: number,
  CY: number,
  scale: number,
  t: number,
  cards: Array<{
    px: number;
    py: number;
    connected: boolean;
    connectTime: number;
  }>,
) {
  const hubR = scale * 0.26;

  cards.forEach((card) => {
    if (!card.connected) return;

    const elapsed = t - card.connectTime;

    // Время полёта луча
    const FLY_DURATION = 0.25;

    // === Выстрел луча из центра к карточке ===
    // Поверхность планеты (старт) = hubR
    if (elapsed < FLY_DURATION + 0.3) {
      const dx = card.px - CX;
      const dy = card.py - CY;
      const dist = Math.hypot(dx, dy);

      if (dist > hubR) {
        const ux = dx / dist;
        const uy = dy / dist;

        // Анимация головы и хвоста луча
        const headProg = Math.min(elapsed / FLY_DURATION, 1);
        // Хвост вылетает с небольшой задержкой
        const tailProg = Math.max(
          0,
          Math.min((elapsed - 0.1) / (FLY_DURATION + 0.1), 1),
        );

        // Easing функции для динамики выстрела
        const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
        const easeIn = (p: number) => p * p * p;

        const headDist = hubR + (dist - hubR) * easeOut(headProg);
        const tailDist = hubR + (dist - hubR) * easeIn(tailProg);

        const headX = CX + ux * headDist;
        const headY = CY + uy * headDist;
        const tailX = CX + ux * tailDist;
        const tailY = CY + uy * tailDist;

        const rayAlpha = 1 - tailProg;

        if (rayAlpha > 0.01) {
          ctx.save();
          ctx.globalAlpha = rayAlpha * 0.8;

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(headX, headY);
          ctx.strokeStyle = BRAND_HEX;
          ctx.lineWidth = 2.5;
          ctx.lineCap = "round";
          ctx.shadowColor = BRAND_HEX;
          ctx.shadowBlur = 12;
          ctx.stroke();

          ctx.restore();
        }
      }
    }

    // === Flash вспышка на карточке (в момент попадания луча) ===
    const flashStart = FLY_DURATION - 0.05;
    if (elapsed >= flashStart && elapsed < flashStart + 0.45) {
      const flashElapsed = elapsed - flashStart;
      const flashAlpha = 1 - flashElapsed / 0.45;
      const flashR = 6 + flashElapsed * 40;

      ctx.save();
      ctx.globalAlpha = Math.max(0, flashAlpha * 0.6);
      ctx.beginPath();
      ctx.arc(card.px, card.py, flashR, 0, Math.PI * 2);
      const flashGrad = ctx.createRadialGradient(
        card.px,
        card.py,
        0,
        card.px,
        card.py,
        flashR,
      );
      flashGrad.addColorStop(0, "rgba(255,255,255,0.9)");
      flashGrad.addColorStop(0.4, `rgba(${BRAND},0.6)`);
      flashGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = flashGrad;
      ctx.fill();
      ctx.restore();
    }
  });
}
