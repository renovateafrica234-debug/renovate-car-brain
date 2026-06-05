# Renovate-Africa Car Sales AI Brain

6 autonomous agents orchestrated by a Command Centre Brain.

## Quick Start

1. Add GitHub Secrets (Settings -> Secrets -> Actions)
2. Push to main — GitHub Actions deploys everything automatically

## Architecture

- Dashboard: Next.js 14 -> Vercel
- Brain API: Express + BullMQ -> Railway
- Database: PostgreSQL + Realtime -> Supabase
- Cache/Queue: Redis -> Railway
