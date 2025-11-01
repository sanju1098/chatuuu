# AI Chat App

A lightweight AI chat application built with Next.js and TypeScript. It demonstrates a modern React + Next.js app structure (app directory), integrated UI components, and AI integration libraries to power chat features.

## Quick start

- Install dependencies:

  npm install

- Run development server:

  npm run dev

Open http://localhost:3000 in your browser.

## Tech stack

- Framework: Next.js (app router)
- Language: TypeScript
- UI: React
- Styling: Tailwind CSS (PostCSS)
- Lint / format: Biome (configured)

## Key libraries / used tech

The project uses the following notable libraries (from `package.json`):

- AI & SDKs: `@ai-sdk/google`, `@ai-sdk/react`, `ai`
- UI primitives: many `@radix-ui/*` packages (accordion, dialog, popover, tooltip, etc.)
- UI helpers: `clsx`, `lucide-react`, `cmdk`, `embla-carousel-react`, `react-day-picker`
- Form & validation: `react-hook-form`, `@hookform/resolvers`, `zod`
- Theming & utilities: `next-themes`, `tailwind-merge`
- Notifications: `sonner`
- Code highlighting: `shiki`
- Charts: `recharts`
- Misc: `nanoid`, `date-fns`, `react-resizable-panels`, `input-otp`, `tokenlens`

Dev dependencies include: `tailwindcss`, `@tailwindcss/postcss`, `biome` and `typescript`.

## Project structure (important folders)

- `src/app` — Next.js app routes and pages (app directory)
- `src/components` — UI and ai-related components used across the app
- `src/lib` — shared utilities
- `src/config` — app configuration and models
- `public` — static assets

Notable files:

- `src/app/api/chat/route.ts` — server-side chat API route (check for environment variable requirements)
- `next.config.ts`, `postcss.config.mjs`, `tsconfig.json` — configuration files

## Environment / secrets

This repository may integrate with AI providers. Check `src/app/api/chat/route.ts` or any files under `src/config` for required environment variables (API keys or credentials). Do not commit secrets to the repository.

## Contributing

Feel free to open issues or pull requests. Follow the existing code patterns (TypeScript + React + Tailwind) and keep changes small and focused.

## License

This project does not include a license file. Add one (for example `MIT`) if you plan to release it publicly.

---

If you want, I can also:

- add a short contributing.md or PR checklist
- add a minimal `.env.example` listing expected env vars found in `src/app/api/chat/route.ts`

If you'd like me to make either of those additions, tell me which one to add next.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
