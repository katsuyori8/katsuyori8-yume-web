import { useEffect, useState } from 'react'
import { initialState } from './types'
import type { AppState } from './types'

const STORAGE_KEY = 'yume-web-state-v1'

function load(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw) as Partial<AppState>
    return {
      profile: { ...initialState.profile, ...parsed.profile },
      dreams: parsed.dreams ?? [],
      habits: parsed.habits ?? [],
    }
  } catch {
    return initialState
  }
}

export function useAppState() {
  const [state, setState] = useState<AppState>(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  return [state, setState] as const
}

export function newId(): string {
  return Math.random().toString(36).slice(2, 10)
}
