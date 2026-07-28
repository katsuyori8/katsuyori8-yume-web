import { useState } from 'react'
import type { FormEvent } from 'react'
import { FIELDS, FIELD_LABELS, MAX_DREAMS_PER_FIELD } from '../types'
import type { Dream, Field } from '../types'
import { formatJp } from '../date'
import { newId } from '../storage'
import { Card } from './Card'

type Props = {
  dreams: Dream[]
  onChange: (dreams: Dream[]) => void
}

export function Dreams({ dreams, onChange }: Props) {
  const [field, setField] = useState<Field>('health')
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [goalDrafts, setGoalDrafts] = useState<Record<string, string>>({})

  const countInField = dreams.filter((d) => d.field === field).length
  const isFull = countInField >= MAX_DREAMS_PER_FIELD

  function addDream(event: FormEvent) {
    event.preventDefault()
    if (!title.trim() || isFull) return
    onChange([
      ...dreams,
      {
        id: newId(),
        field,
        title: title.trim(),
        imageUrl: imageUrl.trim(),
        dueDate,
        goals: [],
        achieved: false,
      },
    ])
    setTitle('')
    setDueDate('')
    setImageUrl('')
  }

  function updateDream(id: string, patch: Partial<Dream>) {
    onChange(dreams.map((d) => (d.id === id ? { ...d, ...patch } : d)))
  }

  function removeDream(id: string) {
    onChange(dreams.filter((d) => d.id !== id))
  }

  function addGoal(dream: Dream, event: FormEvent) {
    event.preventDefault()
    const draft = (goalDrafts[dream.id] ?? '').trim()
    if (!draft) return
    updateDream(dream.id, {
      goals: [...dream.goals, { id: newId(), title: draft, done: false }],
    })
    setGoalDrafts({ ...goalDrafts, [dream.id]: '' })
  }

  return (
    <Card
      title="人生でやりたいことを書き、夢を明確にする"
      description="「無理だ」と思うことも含めてすべて書き出すと、本当はどうなりたいかが見えてきます。"
    >
      <form onSubmit={addDream} className="grid gap-3 md:grid-cols-5">
        <select
          value={field}
          onChange={(e) => setField(e.target.value as Field)}
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          {FIELDS.map((f) => (
            <option key={f} value={f}>
              {FIELD_LABELS[f]}
            </option>
          ))}
        </select>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="やりたいこと"
          className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2"
          title="実現日"
        />
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="イメージ画像URL（任意）"
          className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-4"
        />
        <button
          type="submit"
          disabled={isFull}
          className="rounded-lg bg-ink px-4 py-2 font-semibold text-white disabled:opacity-40"
        >
          追加
        </button>
      </form>
      {isFull && (
        <p className="mt-2 text-sm text-red-600">
          {FIELD_LABELS[field]}は {MAX_DREAMS_PER_FIELD} 個まで登録できます。
        </p>
      )}

      <ul className="mt-6 space-y-3">
        {dreams.length === 0 && (
          <li className="text-sm text-slate-500">まだ登録がありません。</li>
        )}
        {dreams.map((dream) => (
          <li key={dream.id} className="rounded-xl border border-slate-200 p-4">
            <div className="flex gap-4">
              {dream.imageUrl && (
                <img
                  src={dream.imageUrl}
                  alt=""
                  className="h-20 w-20 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      {FIELD_LABELS[dream.field]}
                    </span>
                    <p
                      className={`mt-1 font-semibold ${
                        dream.achieved ? 'text-slate-400 line-through' : ''
                      }`}
                    >
                      {dream.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      実現日：{formatJp(dream.dueDate)}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2 text-sm">
                    <button
                      onClick={() => updateDream(dream.id, { achieved: !dream.achieved })}
                      className="rounded border border-slate-300 px-2 py-1"
                    >
                      {dream.achieved ? '未達成に戻す' : '達成'}
                    </button>
                    <button
                      onClick={() => removeDream(dream.id)}
                      className="rounded border border-red-200 px-2 py-1 text-red-600"
                    >
                      削除
                    </button>
                  </div>
                </div>

                <ul className="mt-3 space-y-1">
                  {dream.goals.map((goal) => (
                    <li key={goal.id} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={goal.done}
                        onChange={() =>
                          updateDream(dream.id, {
                            goals: dream.goals.map((g) =>
                              g.id === goal.id ? { ...g, done: !g.done } : g,
                            ),
                          })
                        }
                      />
                      <span className={goal.done ? 'text-slate-400 line-through' : ''}>
                        {goal.title}
                      </span>
                      <button
                        onClick={() =>
                          updateDream(dream.id, {
                            goals: dream.goals.filter((g) => g.id !== goal.id),
                          })
                        }
                        className="text-xs text-slate-400"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>

                <form onSubmit={(e) => addGoal(dream, e)} className="mt-2 flex gap-2">
                  <input
                    value={goalDrafts[dream.id] ?? ''}
                    onChange={(e) =>
                      setGoalDrafts({ ...goalDrafts, [dream.id]: e.target.value })
                    }
                    placeholder="目標を追加"
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-1 text-sm"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-slate-200 px-3 py-1 text-sm"
                  >
                    追加
                  </button>
                </form>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
