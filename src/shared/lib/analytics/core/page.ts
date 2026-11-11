// Сгенерировано из blogix-analytics@bb495bc, не редактировать
// Visible time and scroll of the current pv (FR-019, Q10): time counts only while the tab is visible;
// every 15 s of visible time, on hide, on unload, on a page change and on destroy — page_leave with the
// increment and the maximum scroll, if either grew. The timer pulse stops after 120 beats (30 minutes
// of visible time) of one pv; the time keeps counting until hide, unload or a page change (Q19).

export interface Engagement {
  /** New pv: counters from zero. */
  start(): void;
  /** page_leave with the increment, if time or scroll grew. */
  leave(): void;
  /** Tab hidden: report and stop counting. */
  hide(): void;
  /** Tab visible again. */
  show(): void;
  stop(): void;
}

const BEAT_MS = 15_000;
const MAX_BEATS = 120;

export function createEngagement(
  emit: (num: number, num2: number) => void,
): Engagement {
  let active = false;
  let since = 0;
  let total = 0;
  let max = 0;
  let reported = 0;
  let frame = false;
  let beats = 0;
  let beat: ReturnType<typeof setTimeout> | undefined;

  function measure(): void {
    frame = false;
    const height = document.documentElement.scrollHeight;
    if (height > 0)
      max = Math.max(
        max,
        Math.round(
          Math.min(100, ((window.scrollY + window.innerHeight) / height) * 100),
        ),
      );
  }

  function onScroll(): void {
    if (frame) return;
    frame = true;
    requestAnimationFrame(measure);
  }

  function pulse(): void {
    beats++;
    leave();
  }

  function count(): void {
    clearTimeout(beat);
    since = Date.now();
    if (beats < MAX_BEATS) beat = setTimeout(pulse, BEAT_MS);
  }

  function leave(): void {
    if (!active) return;
    if (since) {
      // A clock that went back adds nothing (Q25).
      total += Math.max(0, Date.now() - since);
      count();
    }
    const num = total;
    total = 0;
    if (num > 0 || max > reported) {
      reported = max;
      emit(num, max);
    }
  }

  function show(): void {
    if (active && !since && document.visibilityState === "visible") count();
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  return {
    start() {
      active = true;
      clearTimeout(beat);
      since = total = max = reported = beats = 0;
      onScroll();
      show();
    },
    leave,
    hide() {
      leave();
      clearTimeout(beat);
      since = 0;
    },
    show,
    stop() {
      active = false;
      clearTimeout(beat);
      window.removeEventListener("scroll", onScroll);
    },
  };
}
