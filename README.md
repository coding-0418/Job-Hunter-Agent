# Jobify

A production-ready, end-to-end job automation web application built with Next.js, Supabase, and Tailwind CSS.

## Features

- **Resume Parser & Builder**: Upload PDF resumes, extract data automatically, and edit/build resumes.
- **Job Crawler**: Modular crawler service to fetch jobs from various sources (Mock adapter included).
- **Auto-Apply Agent**: Automated application workflow with status tracking and manual fallback.
- **Dashboard**: Analytics and tracking for your job search.
- **Onboarding**: Capture user preferences for personalized job matching.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React.
- **Backend**: Next.js Server Actions, Node.js.
- **Database**: PostgreSQL (via Supabase), Prisma ORM.
- **Auth**: Supabase Auth.
- **Testing**: Jest, React Testing Library.

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase Account

### Installation

1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd jobify
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup Environment Variables:
   Copy `.env.example` to `.env` and fill in your Supabase credentials.
   ```bash
   cp .env.example .env
   ```

4. Setup Database:
   Run the setup script to configure Supabase Storage and get instructions for DB schema.
   ```bash
   ./setup_supabase.sh
   ```
   
   Push schema to DB:
   ```bash
   npx prisma db push
   ```

5. Run Development Server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run deploy script:
   ```bash
   ./deploy.sh
   ```

## Documentation

See the `/docs` folder for more details:
- [API Reference](docs/api.md)
- [Architecture](docs/architecture.md)
