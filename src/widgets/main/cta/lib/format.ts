export function formatMln(n: number): string {
  return n >= 1 ? n.toFixed(1) + ' млн' : Math.round(n * 1000) + 'K'
}
