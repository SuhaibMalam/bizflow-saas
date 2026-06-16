# BizFlow

BizFlow is a salon-first SaaS MVP for appointments, customer records, and reminder workflows for small Indian businesses.

## Run Locally

Open this folder in VS Code:

```bash
code "C:\Users\Suhaib\OneDrive\Documents\BIZ SAAS\bizflow"
```

Then run:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Current Build

- Next.js App Router with TypeScript and Tailwind CSS
- Responsive dashboard shell for a salon business
- Mock appointments, customer records, revenue metrics, and WhatsApp reminder queue
- Early product direction visible before database/auth integration

## Near-Term MVP Build Order

1. Add Prisma and PostgreSQL schema for businesses, memberships, customers, services, and appointments.
2. Add Clerk authentication and strict tenant scoping.
3. Replace dashboard mock data with tenant-scoped database reads.
4. Add create/edit flows for customers, services, and appointments.
5. Add manual WhatsApp reminder actions before full automation.
6. Add Razorpay once demos show payment intent.

## Checks

```bash
npm run lint
npm run build
```
