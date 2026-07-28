import { FIELD_LABELS } from '../types'
import type { Dream } from '../types'
import { daysBetween, formatJp } from '../date'
import { Card } from './Card'

type Props = {
  dreams: Dream[]
}

export function Timeline({ dreams }: Props) {
  const dated = dreams
    .filter((d) => d.dueDate)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))

  const groups = dated.reduce<Record<string, Dream[]>>((acc, dream) => {
    const year = dream.dueDate.slice(0, 4)
    acc[year] = [...(acc[year] ?? []), dream]
    return acc
  }, {})

  return (
    <Card
      title="期限を設定・確認し、実行計画を立てる"
      description="夢の実現日を年表で確認し、達成までにやるべきことを逆算しましょう。"
    >
      {dated.length === 0 ? (
        <p className="text-sm text-slate-500">実現日が設定された夢がありません。</p>
      ) : (
        <ol className="relative space-y-6 border-l-2 border-gold pl-6">
          {Object.entries(groups).map(([year, items]) => (
            <li key={year}>
              <div className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full bg-gold" />
              <p className="text-lg font-bold">{year}年</p>
              <ul className="mt-2 space-y-2">
                {items.map((dream) => {
                  const remaining = daysBetween(new Date(), new Date(dream.dueDate))
                  return (
                    <li
                      key={dream.id}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    >
                      <div className="flex justify-between gap-3">
                        <span className="font-medium">{dream.title}</span>
                        <span className="shrink-0 text-slate-500">
                          {formatJp(dream.dueDate)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {FIELD_LABELS[dream.field]}｜
                        {dream.achieved
                          ? '達成済み'
                          : remaining >= 0
                            ? `あと ${remaining.toLocaleString()} 日`
                            : `${Math.abs(remaining).toLocaleString()} 日超過`}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </Card>
  )
}
