# Git Search

A small lightweight React + TypeScript app to search GitHub users and browse their public repositories with infinite scroll.

## Quick overview

- Search GitHub users by username.
- View their public repositories.
- Link to actual Github repo
- Infinite-scroll repository list with pagination.

## Features

- Debounced user search
- Client-side caching and retries via @tanstack/react-query
- Infinite scroll for full repos view using Intersection Observer
- Unit Tests (Jest + React Testing Library)

## Tech choices (why)

- React + TypeScript
- Vite — fast dev server and builds.
- Tailwind CSS
- @tanstack/react-query — data fetching, caching, background updates
- react-intersection-observer — infinite scroll.
- Jest + React Testing Library — unit/component tests focused on behavior.

## Getting started (macOS)

Prereqs: Node 20+ and npm

Install
```bash
npm install
```

Run dev server
```bash
npm run dev
```

Build
```bash
npm run build
```

Preview production build
```bash
npm run preview
```

Test
```bash
npm test
```

Lint and Formatting
```bash
npm format
```

Notes:
- The unauthorised public api to fetch user Repos does not return total count even though its supports page and limit, hence the decision to use infinite scroll
- For the sake of simplicity, i didnt use any state management as there was no need for it.
- Relying heavily on react query's caching support

## Future improvements

- Add more tests, e2e particularly. 
