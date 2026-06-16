# BizFlow MVP Architecture Plan

Status: provisional until Stitch screen assets/code are retrieved.

## Stitch Source

Project: Simple Salon Scheduler  
Project ID: `5784372627866576244`

Screens:

- Design System: `asset-stub-assets_2b0e56ed7be44bdf8dc21eb92e68e3a3`
- Dashboard: `0835deaadfaf462a8d31837aa226b6db`
- Appointment Calendar: `ad3d1810580b4166ac17db09ac99d69b`
- Customers List: `660b6dcd7a01475b9d666823eaa587c7`
- Customer Profile: `a958e62994c3408099e44479960dc9d0`

The Stitch MCP server is not available in this Codex session, so the actual images/code have not been downloaded yet. Treat this document as the implementation plan for the stated Stitch workflow, not a visual extraction from the unavailable source.

## Product Scope

Build one clean workflow:

1. Customer arrives or calls/messages.
2. Salon owner creates an appointment.
3. Staff member is assigned.
4. Service is completed.
5. Customer history is stored for future visits.

Excluded from MVP:

- Advanced analytics
- Inventory
- Marketing automation
- AI features
- Enterprise permissions
- Complex reporting

## Complete Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum BusinessMemberRole {
  OWNER
  STAFF
}

enum AppointmentStatus {
  SCHEDULED
  CHECKED_IN
  COMPLETED
  CANCELLED
  NO_SHOW
}

enum ReminderStatus {
  NOT_REQUIRED
  PENDING
  SENT
  FAILED
}

model Business {
  id          String   @id @default(cuid())
  name        String
  phone       String?
  address     String?
  timezone    String   @default("Asia/Kolkata")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  members      BusinessMember[]
  customers    Customer[]
  staff        StaffMember[]
  services     Service[]
  appointments Appointment[]

  @@index([name])
}

model BusinessMember {
  id         String             @id @default(cuid())
  businessId String
  clerkUserId String
  role       BusinessMemberRole @default(OWNER)
  createdAt  DateTime           @default(now())

  business Business @relation(fields: [businessId], references: [id], onDelete: Cascade)

  @@unique([businessId, clerkUserId])
  @@index([clerkUserId])
}

model Customer {
  id         String   @id @default(cuid())
  businessId String
  name       String
  phone      String
  email      String?
  notes      String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  business     Business      @relation(fields: [businessId], references: [id], onDelete: Cascade)
  appointments Appointment[]

  @@unique([businessId, phone])
  @@index([businessId, name])
}

model StaffMember {
  id         String   @id @default(cuid())
  businessId String
  name       String
  phone      String?
  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  business     Business      @relation(fields: [businessId], references: [id], onDelete: Cascade)
  appointments Appointment[]

  @@index([businessId, isActive])
}

model Service {
  id              String   @id @default(cuid())
  businessId      String
  name            String
  durationMinutes Int
  pricePaise      Int
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  business     Business      @relation(fields: [businessId], references: [id], onDelete: Cascade)
  appointments Appointment[]

  @@unique([businessId, name])
  @@index([businessId, isActive])
}

model Appointment {
  id             String            @id @default(cuid())
  businessId     String
  customerId     String
  staffMemberId  String?
  serviceId      String
  startsAt       DateTime
  endsAt         DateTime
  status         AppointmentStatus @default(SCHEDULED)
  reminderStatus ReminderStatus    @default(PENDING)
  notes          String?
  completedAt    DateTime?
  createdAt      DateTime          @default(now())
  updatedAt      DateTime          @updatedAt

  business    Business     @relation(fields: [businessId], references: [id], onDelete: Cascade)
  customer    Customer     @relation(fields: [customerId], references: [id], onDelete: Restrict)
  staffMember StaffMember? @relation(fields: [staffMemberId], references: [id], onDelete: SetNull)
  service     Service      @relation(fields: [serviceId], references: [id], onDelete: Restrict)

  @@index([businessId, startsAt])
  @@index([businessId, customerId])
  @@index([businessId, staffMemberId, startsAt])
  @@index([businessId, status])
}
```

## Next.js App Router Structure

```text
src/
  app/
    (marketing)/
      page.tsx
    (app)/
      layout.tsx
      dashboard/
        page.tsx
      appointments/
        page.tsx
      customers/
        page.tsx
      customers/
        [customerId]/
          page.tsx
      settings/
        services/
          page.tsx
        staff/
          page.tsx
    api/
      appointments/
        route.ts
      appointments/
        [appointmentId]/
          route.ts
      customers/
        route.ts
      customers/
        [customerId]/
          route.ts
      services/
        route.ts
      staff/
        route.ts
  components/
    app-shell/
    appointments/
    customers/
    dashboard/
    shared/
    ui/
  lib/
    auth.ts
    db.ts
    tenant.ts
    validations/
```

MVP routes mapped to Stitch:

- Dashboard: `/dashboard`
- Appointment Calendar: `/appointments`
- Customers List: `/customers`
- Customer Profile: `/customers/[customerId]`

## shadcn/ui Component Map

Use shadcn components only where they speed up reliable UI:

- `button`: primary actions like New appointment, Save, Complete service
- `input`: customer search, phone, name, service fields
- `textarea`: notes and customer history
- `select`: staff, service, appointment status
- `dialog`: create/edit appointment and customer forms
- `sheet`: mobile appointment/customer detail drawer
- `table`: desktop customers list and appointment rows
- `badge`: appointment status and reminder state
- `card`: repeated metric or customer/appointment blocks only
- `calendar`: appointment date picker, not full scheduling logic
- `tabs`: customer profile sections if needed
- `dropdown-menu`: row actions such as edit/cancel/complete
- `toast/sonner`: save, error, and reminder feedback

Avoid adding a large data-table abstraction in the MVP unless sorting/filtering becomes painful.

## Clerk Authentication Plan

Use Clerk for sign-in/sign-up and user identity. Keep business tenancy in our database.

Flow:

1. User signs up with Clerk.
2. On first app visit, create a `Business` and `BusinessMember` with role `OWNER`.
3. Every app request resolves the active business through `BusinessMember.clerkUserId`.
4. Queries always include `businessId`.
5. Staff login can wait unless the first pilots explicitly need it.

Authorization:

- `OWNER`: full MVP access.
- `STAFF`: later phase; appointment/customer access only.
- Never trust `businessId` from the client without checking membership.

## Multi-Tenant Architecture

Tenant isolation rule: every customer, staff member, service, and appointment belongs to one `Business`.

Implementation:

- Add a server helper: `requireCurrentBusiness()`.
- It reads Clerk user ID, finds membership, returns `businessId`.
- All Prisma queries include `where: { businessId }`.
- Mutations verify related records belong to the same business before writing.
- Do not expose cross-business IDs in APIs.

Risk to watch:

- Appointment creation must verify `customerId`, `serviceId`, and `staffMemberId` all belong to the current business.
- Customer profile must load by `id + businessId`, not only `id`.
- Search endpoints must never query globally.

## API Endpoints

Prefer server actions for tightly coupled forms if the UI stays simple. Use route handlers where client-side fetching is cleaner.

### Dashboard

`GET /api/dashboard`

Returns:

- today appointment count
- pending reminder count
- upcoming appointments
- recent customers

### Appointments

`GET /api/appointments?date=YYYY-MM-DD`

Returns appointments for current tenant and date range.

`POST /api/appointments`

Body:

- `customerId`
- `serviceId`
- `staffMemberId`
- `startsAt`
- `notes`

Validation:

- customer required
- service required
- start time required
- service duration determines `endsAt`
- same staff cannot have overlapping appointments

`PATCH /api/appointments/[appointmentId]`

Supports:

- reschedule
- assign staff
- update status
- edit notes

`POST /api/appointments/[appointmentId]/complete`

Marks service complete and stores history through the appointment record.

### Customers

`GET /api/customers?query=`

Tenant-scoped search by name/phone.

`POST /api/customers`

Body:

- `name`
- `phone`
- `email`
- `notes`

Validation:

- name required
- Indian mobile-friendly phone validation
- unique phone per business

`GET /api/customers/[customerId]`

Returns customer profile and appointment history.

`PATCH /api/customers/[customerId]`

Updates customer details and notes.

### Services

`GET /api/services`

`POST /api/services`

`PATCH /api/services/[serviceId]`

### Staff

`GET /api/staff`

`POST /api/staff`

`PATCH /api/staff/[staffMemberId]`

## Component Hierarchy

```text
AppShell
  SidebarNav
  TopBar
  MobileNav
  PageContainer

DashboardPage
  TodaySummary
  AppointmentQueue
  ReminderQueue
  RecentCustomers

AppointmentsPage
  CalendarToolbar
  DaySchedule
  AppointmentList
  AppointmentCard
  AppointmentFormDialog

CustomersPage
  CustomerSearch
  CustomerList
  CustomerRow
  CustomerFormDialog

CustomerProfilePage
  CustomerHeader
  CustomerNotes
  AppointmentHistory
  NewAppointmentFromCustomerButton
```

## Implementation Phases

### Phase 1: UI from Stitch

- Import Stitch assets/code into `docs/stitch/`.
- Extract design tokens: colors, typography, spacing, border radius.
- Implement app shell and four routes matching Stitch.
- Keep mock data only for UI verification.

### Phase 2: Data Foundation

- Add Prisma and PostgreSQL.
- Implement schema above.
- Seed one salon business with services, staff, customers, and appointments.
- Replace mock dashboard data with Prisma reads.

### Phase 3: Auth and Tenancy

- Add Clerk.
- Add onboarding to create first business.
- Add `requireCurrentBusiness()`.
- Lock all reads/writes to tenant scope.

### Phase 4: Core Mutations

- Create customer.
- Create appointment.
- Assign staff.
- Complete appointment.
- Show customer history.

### Phase 5: Pilot Hardening

- Mobile QA.
- Empty states.
- Form validation.
- Error handling.
- Appointment conflict checks.
- Basic deployment to Vercel.

## Estimated Complexity

- Stitch import and UI implementation: medium
- Prisma schema and seed data: low-medium
- Clerk plus tenant authorization: medium-high because mistakes can leak data
- Appointment conflict handling: medium
- Production pilot hardening: medium

## Approval Gate

Do not generate application code until:

1. Stitch assets/code are available or the user approves proceeding from this plan.
2. The user approves the Prisma model and route structure.
3. The user confirms whether staff login is included in MVP or postponed.
