import { FIELD_LABELS, MAX_DREAMS_PER_FIELD, PYRAMID_ORDER } from '../types'
import type { Dream } from '../types'
import { Card } from './Card'

type Props = {
  dreams: Dream[]
}

export function Pyramid({ dreams }: Props) {
  return (
    <Card
      title="ピラミッド型フォーマット｜夢のバランスと優先順位"
      description="すべての分野でバランスの取れた状態を目指しましょう。土台は「健康」です。"
    >
      <div className="space-y-2">
        {PYRAMID_ORDER.map((field, index) => {
          const items = dreams.filter((d) => d.field === field)
          const widthPercent = 55 + index * 7.5
          return (
            <div key={field} className="flex justify-center">
              <div
                className="rounded-lg bg-gradient-to-r from-gold/80 to-gold px-4 py-3 text-white"
                style={{ width: `${widthPercent}%` }}
              >
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{FIELD_LABELS[field]}</span>
                  <span>
                    {items.length} / {MAX_DREAMS_PER_FIELD}
                  </span>
                </div>
                <p className="mt-1 truncate text-xs text-white/90">
                  {items.length === 0
                    ? 'この分野の「やりたいこと」を書き出しましょう'
                    : items.map((d) => d.title).join('、')}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
