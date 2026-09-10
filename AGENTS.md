# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vite-powered React 19 and TypeScript app. Application entry points are in `src/main.tsx` and `src/App.tsx`. Reusable UI belongs in `src/components/`; the `ProductTagsInput` component keeps its implementation, public exports, and prop types together in one folder. Global styles are in `src/index.css`. Put imported image assets in `src/assets/` and static files served as-is in `public/`. Build and tool configuration lives at the repository root (`vite.config.ts`, `eslint.config.js`, and `tsconfig*.json`).

## Build, Test, and Development Commands

Run `npm install` after cloning to install the locked dependencies.

- `npm run dev` starts the Vite development server with HMR.
- `npm run build` type-checks through the TypeScript project build and creates the production bundle in `dist/`.
- `npm run lint` runs ESLint across the repository.
- `npm run preview` serves the built `dist/` output locally for final checks.

There is currently no test runner or `npm test` script; add focused component tests when behavior grows beyond manual verification.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Follow the existing style: single quotes, semicolon-free statements, typed props, and clear early returns. Use PascalCase for component files and folders (`ProductTagsInput.tsx`), camelCase for functions, variables, and props, and descriptive `Props`/`Theme` type names. Keep component-specific types and exports beside the component. Prefer Tailwind utility classes for layout and styling; keep shared or global rules in `src/index.css`. Run `npm run lint` before submitting changes.

## Testing Guidelines

No automated tests or coverage threshold are configured yet. For UI changes, verify the component in `npm run dev`, including tag creation with Enter/comma, duplicate handling, removal, keyboard behavior, focus states, and each supported theme.

## Commit & Pull Request Guidelines

No project-local Git history is available to establish an existing commit convention. Use concise imperative messages, preferably Conventional Commit style (for example, `feat: add tag input theme`). Pull requests should explain the behavior change, list validation commands run, link a related issue when applicable, and include screenshots or a short recording for visual changes.
