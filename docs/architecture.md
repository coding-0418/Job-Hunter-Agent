# Architecture

## Overview

The Jobify is a monolithic Next.js application using the App Router. It leverages Server Actions for backend logic, eliminating the need for a separate API layer for most features.

## Components

### Frontend
- **Next.js App Router**: Handles routing and server-side rendering.
- **Tailwind CSS**: Utility-first styling.
- **Lucide React**: Iconography.
- **Components**: Reusable UI components in `src/components`.

### Backend / Services
- **Prisma**: ORM for database access.
- **Supabase**: Managed PostgreSQL, Auth, and Storage.
- **Services**: Business logic in `src/services`.
  - `resume-parser`: PDF extraction and parsing.
  - `crawler`: Modular job fetching service.
  - `auto-apply`: Agent logic for applying to jobs.

## Data Flow

1. **User Action**: User interacts with UI (e.g., uploads resume).
2. **Server Action**: Client calls a Server Action (e.g., `uploadAndParseResume`).
3. **Service Layer**: Server Action calls a Service (e.g., `parseResumePdf`).
4. **Database**: Service interacts with DB via Prisma or Storage via Supabase Client.
5. **Response**: Data is returned to the client and UI updates.

## Crawler Design

The crawler uses an Adapter pattern. New sources can be added by implementing the `JobCrawlerAdapter` interface and registering them in `JobCrawlerService`.

## Auto-Apply Agent

The agent simulates application submission. In a real-world scenario, this would integrate with browser automation tools (Puppeteer/Playwright) or third-party APIs.
