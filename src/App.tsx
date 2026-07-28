import { useState } from 'react'
import { Countdown } from './components/Countdown'
import { Dreams } from './components/Dreams'
import { Habits } from './components/Habits'
import { Pyramid } from './components/Pyramid'
import { Timeline } from './components/Timeline'
import { useAppState } from './storage'

const TABS = [
  { id: 'home', label: 'ホーム' },
  { id: 'dreams', label: 'やりたいこと' },
  { id: 'timeline', label: '未来年表' },
  { id: 'habits', label: 'DWMY ToDo' },
] as const

type TabId = (typeof TABS)[number]['id']

export default function App() {
  const [state, setState] = useAppState()
  const [tab, setTab] = useState<TabId>('home')

  return (
    <div className="min-h-screen">
      <header className="bg-ink text-white">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <h1 className="text-xl font-bold">夢が、かなうノート（Web版）</h1>
          <p className="mt-1 text-sm text-slate-300">
            手帳は、仕事や時間を管理するためだけのものではない。夢や、人生をマネジメントするものだ。
          </p>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 px-6">
          {TABS.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`rounded-t-lg px-4 py-2 text-sm font-medium ${
                tab === item.id ? 'bg-slate-100 text-ink' : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        {tab === 'home' && (
          <>
            <Countdown
              profile={state.profile}
              onChange={(profile) => setState({ ...state, profile })}
            />
            <Pyramid dreams={state.dreams} />
          </>
        )}
        {tab === 'dreams' && (
          <Dreams
            dreams={state.dreams}
            onChange={(dreams) => setState({ ...state, dreams })}
          />
        )}
        {tab === 'timeline' && <Timeline dreams={state.dreams} />}
        {tab === 'habits' && (
          <Habits
            habits={state.habits}
            dreams={state.dreams}
            onChange={(habits) => setState({ ...state, habits })}
          />
        )}
      </main>

      <footer className="mx-auto max-w-5xl px-6 pb-10 text-xs text-slate-500">
        データはお使いのブラウザ（localStorage）にのみ保存されます。
      </footer>
    </div>
  )
}
