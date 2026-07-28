# 夢が、かなうノート（Web版）

熊谷正寿の「夢が、かなうアプリ。byGMO」（https://shop.kumagai.com/app/ ）の手帳術をブラウザで実践できる非公式Web版です。

## 機能

- **人生カウントダウン**：生年月日と寿命から残り日数を表示
- **やりたいこと**：6分野ごとに夢を登録（各7個まで）／イメージ画像・実現日・目標チェックリスト
- **ピラミッド型フォーマット**：分野ごとの登録数でバランスを可視化
- **未来年表**：実現日を年ごとに並べ、残り日数を表示
- **DWMY ToDo**：Daily / Weekly / Monthly / Yearly の習慣管理（夢との紐づけ可）

データはブラウザの localStorage にのみ保存されます（サーバー送信なし）。

## 開発

```bash
npm install
npm run dev      # 開発サーバー
npm run build    # 型チェック + 本番ビルド
npm run lint
```

技術スタック：React 19 / TypeScript / Vite / Tailwind CSS
