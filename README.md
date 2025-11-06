# Chatuuu

Chatuuu is a lightweight AI chat application built with Next.js (App Router) and TypeScript. This project demonstrates a modern chat UI powered by AI integrations and a collection of reusable UI components (the "ai-elements") designed for building conversational interfaces.

## Quick start

- Install dependencies:

  npm install

- Run development server:

  npm run dev

Open http://localhost:3000 in your browser.

## Features

- Real-time chat UI with streaming responses.
- File & image attachments: drag & drop, paste, or choose files. Images are previewed in the composer and sent to the chat.
- Attachments handling: images and PDFs are rendered in chat messages.
- Model selection: switch between configured AI models in the composer.
- Suggestions: surface example prompts to help users get started.
- Reasoning & sources UI: optional reasoning indicator and source list for assistant responses.
- Accessible UI primitives and components (radix UI, custom input groups, dropdowns).

## AI integration & transport

- Uses the `ai` SDK and `@ai-sdk/react` client for chat flows.
- The default transport is configured to call the server route at `src/app/api/chat/route.ts` via `DefaultChatTransport`.
- The app expects the server to receive messages (text + files) and return message parts including `type: "text"` and `type: "file"` parts (with `url`, `mediaType`, `filename`) so the client can render attachments.

If you need to change providers, update `src/app/api/chat/route.ts` or the transport configuration in `src/app/page.tsx`.

## ai-elements (components)

This project ships a small set of specialized components in `src/components/ai-elements` used by the chat UI. Notable components:

- `prompt-input` — composable input group with file attachments, paste handling, hidden file input, drag & drop, and model selection.
- `conversation` — scrollable chat container with scroll-to-bottom helpers.
- `message`, `message-avatar`, `message-content` — structured message components used to align user vs assistant messages.
- `response`, `reasoning`, `sources` — small components to render assistant content, reasoning indicator and source lists.
- `loader` — UI loader used for streaming states.

Inspect `src/components/ai-elements` for more components and usage examples.

## Tech stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS (PostCSS)
- AI SDKs: `ai`, `@ai-sdk/react` (+ any provider adapters you configure server-side)
- Icons: `lucide-react`
- UI primitives: Radix UI-based components (dropdowns, popovers, dialogs, etc.)

## File & image uploads

- Composer supports attaching files via the provided attachment UI (menu item), drag & drop, or paste.
- Selected files are converted to `FileUIPart` objects (with `url`, `mediaType`, `filename`) and passed to `onSubmit` from `PromptInput`.
- The server should accept these files (data URLs or multipart upload depending on your API implementation) and return chat messages that include `file` parts with `url` fields that the client can render.

If attachments are not appearing as expected, confirm the server receives `files` and returns message parts of type `file` containing `url` + `mediaType`.

## Environment / secrets

This repository may integrate with AI providers. Check `src/app/api/chat/route.ts` or any files under `src/config` for required environment variables (API keys or credentials). Do not commit secrets to the repository.

Create a `.env.local` (never commit it) and add any provider keys required by `src/app/api/chat/route.ts`.

## Project structure (important folders)

- `src/app` — Next.js app routes and pages (app directory)
- `src/components` — UI and ai-related components used across the app (see `ai-elements`)
- `src/lib` — shared utilities
- `src/config` — app configuration and available models/suggestions
- `public` — static assets

Notable files:

- `src/app/api/chat/route.ts` — server-side chat API route (check for environment variable requirements)
- `src/app/page.tsx` — main chat UI and example wiring to `DefaultChatTransport`

## Running locally

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000
