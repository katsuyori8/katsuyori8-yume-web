---
name: testing-yume-web
description: How to run and UI-test the yume-web (夢が、かなうノート Web版) React+Vite app, including Japanese text input and localStorage state reset.
---

# Testing yume-web

## Running the app
- `npm install`, then `npm run dev -- --port 5173` → http://localhost:5173
- This environment can hit the npm optional-deps bug (missing native bindings). If vite/oxlint fails to start, run:
  `npm i --no-save @oxlint/binding-linux-x64-gnu @rolldown/binding-linux-x64-gnu`
  (re-run whenever `node_modules` is recreated).
- No backend / no credentials. All state lives in localStorage key `yume-web-state-v1`.

## Resetting state between test runs
Run in the browser console before starting (do this BEFORE recording so the recording stays clean):
`localStorage.removeItem('yume-web-state-v1'); location.reload()`

## Typing Japanese text in the GUI
`xdotool type` (the computer-use `type` action) silently drops non-ASCII characters — the field stays empty.
Workaround: put text on the clipboard from the shell, then paste with ctrl+v:
```
sudo apt-get install -y xclip   # may not be preinstalled
printf 'フルマラソン完走' | xclip -selection clipboard -d :0
```
then click the input and send `ctrl+v`. Use ASCII filler titles (test2, test3 …) for bulk data to keep this fast.

## `<input type="date">` quirks
The date input is US-formatted (mm/dd/yyyy). Click the LEFT part (month segment) of the field first,
then type `MM/DD/YYYY`. Clicking the middle/right or using ctrl+a + Delete produces garbage like `mm/09/12027`.

## App structure / where features live
- Tabs in `src/App.tsx`: ホーム (Countdown + Pyramid), やりたいこと (Dreams), 未来年表 (Timeline), DWMY ToDo (Habits).
- Limits/labels live in `src/types.ts` (`MAX_DREAMS_PER_FIELD = 7`, FIELD_LABELS, FREQUENCY_LABELS).
- Date math in `src/date.ts`. Verify displayed day counts against `python3` date arithmetic — they should match exactly.
- Habit check state is period-based (`periodKey` in Habits.tsx): daily=today, weekly=Monday ISO, monthly=YYYY-MM, yearly=YYYY.

## Known minor issue
Pressing Enter in the per-dream 「目標を追加」 input does nothing (it is outside a form) — click the 追加 button.

## Devin Secrets Needed
None.
