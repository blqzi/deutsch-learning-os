# Deutsch Learning OS

Личный электронный дневник изучения немецкого языка: дневник, оценки, база знаний, повторения, roadmap, аналитика и mock AI-репетитор.

## Stack

- React + Vite + TypeScript
- TailwindCSS
- Framer Motion
- React Router HashRouter
- Zustand + localStorage
- Recharts
- React Hook Form + Zod

## Установка

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Готовый сайт появится в папке `dist`.

## GitHub Pages

1. Создай репозиторий, например `deutsch-learning-os`.
2. Проверь `vite.config.ts`:

```ts
base: '/deutsch-learning-os/'
```

Если репозиторий называется иначе, замени `deutsch-learning-os` на имя репозитория.

3. Установи зависимости и собери проект:

```bash
npm install
npm run build
```

4. Загрузи содержимое `dist` в GitHub Pages или используй пакет `gh-pages`:

```bash
npm run deploy
```

## Логика данных

Сейчас данные хранятся в `localStorage`. Позже можно заменить mock services на Firebase/Supabase.

## Структура

```txt
src/
  components/     reusable UI
  data/           mock data
  layouts/        app layout/sidebar
  pages/          all routes
  store/          Zustand persisted store
  types/          TypeScript models
  utils/          analytics helpers
```

## Что уже есть

- Login page
- Dashboard
- Diary with grades and homework
- Knowledge base
- Spaced repetition logic
- AI mock chat
- Roadmap A1-B2
- Analytics charts
- Settings, export/import, theme switch
