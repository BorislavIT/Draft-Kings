<h1>Project requirements</h1>

- Node v20.11.0
- pnpm is used to install and run the project

```bash
    # Steps in order to install pnpm if you don't have it
    # for some god forsaken reason
    # USE pnpm !!!

    npm install pnpm -g

    pnpm install
    pnpm dev
```

```bash
    # Ok some people are weird as hell so here are the instructions
    # for npm as well

    npm install
    npm run dev
```

## Client

- pnpm - because it's SUPERIOR of npm in EVERY WAY, shape and form
- Typescript
- React (Next.js), I used next.js because it's more interesting + didn't have too much experience + react doesn't recommend npx create-react-app anymore anyway + L + Ratio
- axios - for making the http requests
- nuqs - this is some interesting library (not the most popular) that is used for query state management, which is a bit different in next.js and i decided to give it a go (i like it)
- React query - for most state management and most importantly CACHING
- Tailwind css - for styling
- primereact - for a component library for dropdowns and stuff
- jest, test-library@react and babel - for unit tests
