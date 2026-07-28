import type { Profile } from '../types'
import { addYears, daysBetween, formatJp } from '../date'
import { Card } from './Card'

type Props = {
  profile: Profile
  onChange: (profile: Profile) => void
}

export function Countdown({ profile, onChange }: Props) {
  const configured = Boolean(profile.birthday)
  const endDate = configured ? addYears(profile.birthday, profile.lifeExpectancy) : null
  const remainingDays = endDate ? Math.max(daysBetween(new Date(), endDate), 0) : 0
  const livedDays = configured
    ? Math.max(daysBetween(new Date(profile.birthday), new Date()), 0)
    : 0
  const totalDays = livedDays + remainingDays
  const progress = totalDays > 0 ? (livedDays / totalDays) * 100 : 0

  return (
    <Card
      title="「時間＝命」 寿命までの日数を可視化"
      description="生年月日と寿命を設定すると、人生の残り日数が表示されます。"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <label className="block text-sm">
            <span className="text-slate-600">生年月日</span>
            <input
              type="date"
              value={profile.birthday}
              onChange={(e) => onChange({ ...profile, birthday: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600">寿命（歳）</span>
            <input
              type="number"
              min={1}
              max={150}
              value={profile.lifeExpectancy}
              onChange={(e) =>
                onChange({ ...profile, lifeExpectancy: Number(e.target.value) || 0 })
              }
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
        </div>

        <div className="flex flex-col justify-center rounded-xl bg-ink p-6 text-center text-white">
          {configured ? (
            <>
              <p className="text-sm text-slate-300">残り</p>
              <p className="text-5xl font-bold text-gold">
                {remainingDays.toLocaleString()}
                <span className="ml-2 text-xl text-white">日</span>
              </p>
              <p className="mt-2 text-xs text-slate-300">
                {formatJp(
                  endDate ? endDate.toISOString().slice(0, 10) : '',
                )}{' '}
                まで／これまで {livedDays.toLocaleString()} 日
              </p>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-600">
                <div className="h-full bg-gold" style={{ width: `${progress}%` }} />
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-300">生年月日を設定してください。</p>
          )}
        </div>
      </div>
    </Card>
  )
}
