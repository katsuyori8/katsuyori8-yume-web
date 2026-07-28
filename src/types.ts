export const FIELDS = [
  'health',
  'knowledge',
  'mind',
  'social',
  'private',
  'money',
] as const

export type Field = (typeof FIELDS)[number]

export const FIELD_LABELS: Record<Field, string> = {
  health: '健康',
  knowledge: '教養・知識',
  mind: '心・精神',
  social: '社会・仕事',
  private: 'プライベート・家庭',
  money: '経済・モノ・お金',
}

/** ピラミッドの下段から上段の順（土台＝健康） */
export const PYRAMID_ORDER: Field[] = [
  'money',
  'private',
  'social',
  'mind',
  'knowledge',
  'health',
]

export const MAX_DREAMS_PER_FIELD = 7

export type Goal = {
  id: string
  title: string
  done: boolean
}

export type Dream = {
  id: string
  field: Field
  title: string
  imageUrl: string
  /** 実現日 (YYYY-MM-DD) */
  dueDate: string
  goals: Goal[]
  achieved: boolean
}

export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly'

export const FREQUENCY_LABELS: Record<Frequency, string> = {
  daily: 'Daily（毎日）',
  weekly: 'Weekly（毎週）',
  monthly: 'Monthly（毎月）',
  yearly: 'Yearly（毎年）',
}

export type Habit = {
  id: string
  title: string
  frequency: Frequency
  dreamId: string | null
  /** 実行した日 (YYYY-MM-DD) の配列 */
  checkedDates: string[]
}

export type Profile = {
  birthday: string
  lifeExpectancy: number
}

export type AppState = {
  profile: Profile
  dreams: Dream[]
  habits: Habit[]
}

export const initialState: AppState = {
  profile: { birthday: '', lifeExpectancy: 90 },
  dreams: [],
  habits: [],
}
