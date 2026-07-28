import { useState } from 'react'
import type { FormEvent } from 'react'
import { FREQUENCY_LABELS } from '../types'
import type { Dream, Frequency, Habit } from '../types'
import { startOfWeek, todayIso } from '../date'
import { newId } from '../storage'
import { Card } from './Card'

type Props = {
  habits: Habit[]
  dreams: Dream[]
  onChange: (habits: Habit[]) => void
}

const FREQUENCIES: Frequency[] = ['daily', 'weekly', 'monthly', 'yearly']

/** 頻度ごとの現在の期間キー。同じ期間内は1回チェック済みとして扱う。 */
function periodKey(frequency: Frequency): string {
  const today = todayIso()
  switch (frequency) {
    case 'daily':
      return today
    case 'weekly':
      return startOfWeek()
    case 'monthly':
      return today.slice(0, 7)
    case 'yearly':
      return today.slice(0, 4)
  }
}

function isChecked(habit: Habit): boolean {
  const key = periodKey(habit.frequency)
  return habit.checkedDates.some((date) => date.startsWith(key))
}

export function Habits({ habits, dreams, onChange }: Props) {
  const [title, setTitle] = useState('')
  const [frequency, setFrequency] = useState<Frequency>('daily')
  const [dreamId, setDreamId] = useState<string>('')

  function addHabit(event: FormEvent) {
    event.preventDefault()
    if (!title.trim()) return
    onChange([
      ...habits,
      {
        id: newId(),
        title: title.trim(),
        frequency,
        dreamId: dreamId || null,
        checkedDates: [],
      },
    ])
    setTitle('')
    setDreamId('')
  }

  function toggle(habit: Habit) {
    const key = periodKey(habit.frequency)
    const checkedDates = isChecked(habit)
      ? habit.checkedDates.filter((date) => !date.startsWith(key))
      : [...habit.checkedDates, todayIso()]
    onChange(habits.map((h) => (h.id === habit.id ? { ...h, checkedDates } : h)))
  }

  return (
    <Card
      title="DWMY ToDoリスト｜やるべきことを習慣化する"
      description="Daily / Weekly / Monthly / Yearly に分けて、夢に紐づく行動を習慣にしましょう。"
    >
      <form onSubmit={addHabit} className="grid gap-3 md:grid-cols-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="やること"
          className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
        />
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as Frequency)}
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          {FREQUENCIES.map((f) => (
            <option key={f} value={f}>
              {FREQUENCY_LABELS[f]}
            </option>
          ))}
        </select>
        <select
          value={dreamId}
          onChange={(e) => setDreamId(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="">紐づける夢（任意）</option>
          {dreams.map((dream) => (
            <option key={dream.id} value={dream.id}>
              {dream.title}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-ink px-4 py-2 font-semibold text-white md:col-start-4"
        >
          追加
        </button>
      </form>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {FREQUENCIES.map((f) => {
          const items = habits.filter((h) => h.frequency === f)
          return (
            <div key={f} className="rounded-xl border border-slate-200 p-4">
              <p className="font-semibold">{FREQUENCY_LABELS[f]}</p>
              <ul className="mt-2 space-y-2">
                {items.length === 0 && (
                  <li className="text-sm text-slate-500">項目がありません。</li>
                )}
                {items.map((habit) => {
                  const dream = dreams.find((d) => d.id === habit.dreamId)
                  return (
                    <li key={habit.id} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={isChecked(habit)}
                        onChange={() => toggle(habit)}
                      />
                      <span className={isChecked(habit) ? 'text-slate-400 line-through' : ''}>
                        {habit.title}
                      </span>
                      {dream && (
                        <span className="rounded bg-gold/15 px-2 py-0.5 text-xs text-gold">
                          {dream.title}
                        </span>
                      )}
                      <button
                        onClick={() => onChange(habits.filter((h) => h.id !== habit.id))}
                        className="ml-auto text-xs text-slate-400"
                      >
                        削除
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
