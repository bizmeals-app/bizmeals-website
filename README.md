# BizMeals — Business Growth Execution Partner

The marketing website & lead-gen platform for **BizMeals**, a Bangalore-based
business growth partner. Built with Next.js 16, React 19, TypeScript, Tailwind
CSS 4, shadcn/ui, Framer Motion, and Prisma.

## Tech Stack

| Area            | Technology                                            |
| --------------- | ----------------------------------------------------- |
| Framework       | Next.js 16 (App Router, Turbopack)                    |
| Language        | TypeScript 5                                          |
| UI              | React 19, Tailwind CSS 4, shadcn/ui (New York), Lucide |
| Animation       | Framer Motion                                         |
| State           | Zustand (client), TanStack Query (server)             |
| Forms           | React Hook Form + Zod                                 |
| Database        | Prisma ORM (SQLite in dev, configurable for prod)     |
| Charts          | Recharts                                              |

## Getting Started

### Prerequisites

- Node.js 20+ (or [Bun](https://bun.sh) 1.3+)
- A database (SQLite by default; see `prisma/schema.prisma`)

### Install & Run

```bash
# Install dependencies
bun install
#   or: npm install

# Create your local database
bun run db:push

# Start the dev server
bun run dev
#   or: npm run dev
```

The site runs at `http://localhost:3000`.

### Available Scripts

| Script             | Description                                  |
| ------------------ | -------------------------------------------- |
| `bun run dev`      | Start the dev server (port 3000)             |
| `bun run build`    | Production build (runs `prisma generate`)    |
| `bun run start`    | Start the production server                  |
| `bun run lint`     | Run ESLint                                   |
| `bun run db:push`  | Push the Prisma schema to the database       |
| `bun run db:generate` | Regenerate the Prisma client              |

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable        | Description                              | Example                          |
| --------------- | ---------------------------------------- | -------------------------------- |
| `DATABASE_URL`  | Prisma database connection string        | `file:./db/custom.db` (SQLite)   |

> Never commit your real `.env`. The `.gitignore` already excludes it.

## Project Structure

```
.
├── prisma/            # Prisma schema & migrations
│   └── schema.prisma
├── public/            # Static assets (logo, favicon, images)
├── src/
│   ├── app/           # Next.js App Router (layout, page, globals)
│   ├── components/
│   │   ├── bizmeals/  # BizMeals-specific components & pages
│   │   └── ui/        # shadcn/ui primitive components
│   └── lib/           # Utilities, config, db client
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Add your environment variables (at minimum `DATABASE_URL`).
5. Click **Deploy**.

> For the database on Vercel, use a managed DB (Vercel Postgres, Neon,
> Supabase, or Turso). Update `DATABASE_URL` and the Prisma datasource
> provider in `prisma/schema.prisma` to match.

## Brand

- **Logo**: `public/logo-icon.png` — tight-cropped icon mark.
- **Wordmark**: "Biz" in ink black `#0F0F0F` + "Meals" in orange `#F37021`.
- **Primary dark**: navy `#0F2557`
- **Accent**: amber `#F5A623` (CTAs), with logo orange `#F37021` for the mark.

## License

Proprietary © BizMeals. All rights reserved.
