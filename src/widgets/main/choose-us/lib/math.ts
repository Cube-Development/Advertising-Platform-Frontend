export const TWO_PI = Math.PI * 2;

export function easeInOut(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
