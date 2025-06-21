# CLAUDE.md

This file provides guidance for Claude Code (claude.ai/code) when working on this repository.

## Important Notes

- **Always respond in Japanese.** The developer is a Japanese speaker, so all communication should be conducted in Japanese.
- After receiving tool results, carefully consider their quality and determine the optimal next step before proceeding. Use thinking to plan and iterate based on this new information, and take the best next action.
- For maximum efficiency, when you need to perform multiple independent operations, call all relevant tools simultaneously rather than sequentially.
- If you create temporary new files, scripts, or helper files for iteration, clean up by deleting these files at the end of the task.
- **Don't hold back, give it your all.**

## Development Philosophy (Test-Driven Development (TDD))

- Follow Test-Driven Development (TDD) as a principle.
- Create tests first based on expected inputs and outputs.
- Do not write implementation code, only prepare tests.
- Run tests and confirm failures.
- Commit when you can confirm the tests are correct.
- Then proceed with implementation to make tests pass.
- During implementation, do not change tests, keep modifying code.
- Repeat until all tests pass.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Run lint
npm run lint

# Start production server
npm start
```

## Project Overview

OSINT-JAPAN is a web application that provides a Japanese approach to OSINT research and information gathering.

### Current Implementation Status

- ✅ Basic UI structure (card-based layout)
- ✅ Language switching functionality (Japanese ⇔ English)
- ✅ Dark mode support
- ✅ QR code generation functionality
- ✅ GitHub integration
- 🚧 OSINT resources functionality (planned for development)

## Tech Stack

### Frontend

- **Next.js 15** (using App Router)
- **React 19** (leveraging latest React features)
- **TypeScript** (strict mode enabled, emphasizing type safety)

### Styling & UI

- **Tailwind CSS 4** (utility-first CSS)
- **shadcn/ui** (accessible UI components, `src/_components/ui/`)
- **Radix UI** (robust primitive components)
- **Lucide React** (icon library)

### Internationalization & Other Libraries

- **i18next** (multilingual support, SSR support, Japanese default)
- **react-i18next** (React integration)
- **qrcode.react** (QR code generation functionality)

### Development & Quality Management

- **ESLint** (code quality checking)
- **Prettier** (code formatter)
- **TypeScript Strict Mode** (strict type checking)

## File Structure (Colocation Pattern)

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── ui/                # Font settings
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── error.tsx         # Error page
│   └── not-found.tsx     # 404 page
├── _components/           # Component collection
│   ├── common/           # Common components
│   │   ├── ClientOnly.tsx    # SSR-compatible wrapper
│   │   └── Loading/          # Loading display
│   ├── pages/            # Page-specific components
│   │   └── HomePage/         # Home page related
│   │       ├── LanguageSwitcher.tsx  # Language switching
│   │       └── DarkModeToggle.tsx    # Dark mode toggle
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom hooks
│   ├── useDarkMode.ts    # Dark mode state management
│   └── useI18nReady.ts   # Internationalization ready state
├── i18n/                 # Internationalization settings
│   ├── config.ts         # i18n configuration
│   └── provider.tsx      # Provider
├── lib/                  # Utility libraries
│   └── utils.ts          # Common utilities
├── styles/               # Global styles
│   └── globals.css       # Tailwind settings
├── constants/            # Constant definitions
├── config/               # Project configuration
├── store/                # State management
├── types/                # TypeScript type definitions
└── utils/                # Pure functions & helpers
```

**Important: Adopting strict colocation pattern "Place code as close to where it's relevant as possible"**

## Component Import Rules

- **Required**: Re-export management using `index.ts` files
- **Prohibited**: Direct component imports
- **Path**: Import via `@/_components/pages/<page-name>/index.ts`
- **Example**: `import { Component } from "@/_components/pages/HomePage";`

## Internationalization Settings (i18n)

- **Default language**: Japanese (`ja`)
- **Fallback language**: Japanese
- **Translation files**: `public/locales/{ja,en}/translation.json`
- **SSR support**: Using static imports to maintain consistency
- **Language switching**: Managed by `supportedLngs` in `src/i18n/config.ts`

## Dark Mode Implementation

- **localStorage and system settings fallback**
- **Flash prevention**: Pre-loading with inline script in layout.tsx
- **State management**: Via useDarkMode custom hook
- **CSS**: Tailwind CSS Class-based dark mode

## Coding Conventions

### Basic Rules

- **Indentation**: 2 spaces
- **Quotes**: Double quotes (`"`) required
- **Semicolons**: Required
- **Trailing Comma**: Required
- **Comments**: Japanese comments for complex logic
- **JSDoc**: Required for components and functions

### TypeScript Conventions

- **any type**: Prohibited
- **Type definitions**: Prioritize explicit type specification
- **interface vs type**: Prioritize `interface` over `type`
- **Strict Mode**: Enabled, strict type checking

## Configuration Files

### Main Configuration

- `next.config.js` - Next.js configuration (CSP, styled-components enabled)
- `components.json` - shadcn/ui configuration (New York style, RSC enabled)
- `tsconfig.json` - TypeScript configuration (Strict mode)
- `.eslintrc.json` - ESLint configuration
- `postcss.config.js` - PostCSS configuration

### Security

- **CSP (Content Security Policy)**: Configured in `next.config.js`
- **Vercel deployment support**: Specific permission settings
- **Safe script execution**: Proper management of inline scripts

## Font Settings

- **Latin characters**: Inter (`font-inter`)
- **Japanese characters**: Noto Sans JP (`font-noto-sans-jp`)
- **Configuration location**: `src/app/ui/fonts.ts`
- **CSS Variables**: Enabled

## SSR & Hydration Support

- **ClientOnly component**: Avoiding SSR and hydration issues
- **i18n ready state**: Managed by useI18nReady hook
- **Dark mode**: Flash prevention with pre-script
- **Stable DOM structure**: Preventing hydration mismatches

## Development Notes

- **Internationalization**: Always use translation keys, never hardcode
- **Accessibility**: Proper settings for aria-label etc.
- **Performance**: Suspense and lazy loading as needed
- **Security**: Use `rel="noopener noreferrer"` for external links