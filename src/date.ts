export function todayIso(): string {
  return toIso(new Date())
}

export function toIso(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function addYears(iso: string, years: number): Date {
  const d = new Date(iso)
  d.setFullYear(d.getFullYear() + years)
  return d
}

export function daysBetween(from: Date, to: Date): number {
  const ms = to.setHours(0, 0, 0, 0) - new Date(from).setHours(0, 0, 0, 0)
  return Math.ceil(ms / 86400000)
}

export function formatJp(iso: string): string {
  if (!iso) return '未設定'
  const [y, m, d] = iso.split('-')
  return `${y}年${Number(m)}月${Number(d)}日`
}

/** 週の開始日（月曜）のISO文字列 */
export function startOfWeek(date = new Date()): string {
  const d = new Date(date)
  const diff = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - diff)
  return toIso(d)
}
