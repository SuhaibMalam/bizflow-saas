import {
  BellRing,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  IndianRupee,
  MessageCircle,
  Plus,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const appointments = [
  {
    time: "10:00 AM",
    customer: "Ananya Sharma",
    service: "Hair spa + blow dry",
    staff: "Priya",
    status: "Confirmed",
    value: "Rs 1,400",
  },
  {
    time: "11:30 AM",
    customer: "Neha Iyer",
    service: "Facial cleanup",
    staff: "Ritu",
    status: "Reminder due",
    value: "Rs 900",
  },
  {
    time: "01:00 PM",
    customer: "Kavya Rao",
    service: "Bridal trial",
    staff: "Asha",
    status: "Advance paid",
    value: "Rs 3,500",
  },
  {
    time: "04:30 PM",
    customer: "Meera Nair",
    service: "Haircut",
    staff: "Priya",
    status: "Walk-in",
    value: "Rs 600",
  },
];

const reminders = [
  "Send WhatsApp reminder to Neha for 11:30 AM",
  "Follow up with Riya, missed appointment yesterday",
  "Ask Kavya to confirm bridal trial reference photos",
];

const customers = [
  { name: "Ananya Sharma", visits: 8, lastVisit: "12 Jun", spend: "Rs 9,800" },
  { name: "Kavya Rao", visits: 3, lastVisit: "08 Jun", spend: "Rs 12,400" },
  { name: "Neha Iyer", visits: 5, lastVisit: "02 Jun", spend: "Rs 4,300" },
];

const metrics = [
  {
    label: "Today bookings",
    value: "14",
    helper: "3 still need reminders",
    icon: CalendarCheck,
  },
  {
    label: "Expected revenue",
    value: "Rs 18.6k",
    helper: "From confirmed visits",
    icon: IndianRupee,
  },
  {
    label: "Customer records",
    value: "286",
    helper: "42 visited this month",
    icon: Users,
  },
  {
    label: "No-show risk",
    value: "2",
    helper: "Act before lunch",
    icon: BellRing,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#1e221f]">
      <div className="border-b border-[#ded7ca] bg-[#fffdf8]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-[#163a2b] text-white shadow-sm">
              <Scissors className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5d35]">
                BizFlow
              </p>
              <h1 className="text-xl font-semibold">Glow Studio dashboard</h1>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative block min-w-0 sm:w-72">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#79736a]"
                aria-hidden="true"
              />
              <span className="sr-only">Search customers or bookings</span>
              <input
                className="h-10 w-full rounded-md border border-[#ded7ca] bg-white pl-9 pr-3 text-sm outline-none transition focus:border-[#1d6f53] focus:ring-2 focus:ring-[#1d6f53]/15"
                placeholder="Search customers or bookings"
              />
            </label>
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#1d6f53] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#185d46]">
              <Plus className="size-4" aria-hidden="true" />
              New booking
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="h-fit rounded-lg border border-[#ded7ca] bg-[#fffdf8] p-3">
          <nav className="grid gap-1 text-sm font-medium">
            {["Dashboard", "Appointments", "Customers", "Services", "Reminders"].map(
              (item) => (
                <a
                  className={`rounded-md px-3 py-2 transition ${
                    item === "Dashboard"
                      ? "bg-[#163a2b] text-white"
                      : "text-[#575047] hover:bg-[#eee7db]"
                  }`}
                  href="#"
                  key={item}
                >
                  {item}
                </a>
              ),
            )}
          </nav>
          <div className="mt-4 rounded-md border border-[#d9eadf] bg-[#eef8f1] p-3 text-sm text-[#254b37]">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Tenant safe by design
            </div>
            <p className="leading-6">
              Real data will be scoped per business before launch.
            </p>
          </div>
        </aside>

        <section className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <article
                  className="rounded-lg border border-[#ded7ca] bg-[#fffdf8] p-4 shadow-sm"
                  key={metric.label}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-[#6c655d]">{metric.label}</p>
                      <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
                    </div>
                    <div className="flex size-10 items-center justify-center rounded-md bg-[#eee7db] text-[#5f4426]">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-[#6c655d]">{metric.helper}</p>
                </article>
              );
            })}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
            <article className="rounded-lg border border-[#ded7ca] bg-[#fffdf8] shadow-sm">
              <div className="flex flex-col gap-3 border-b border-[#ded7ca] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Today&apos;s schedule</h2>
                  <p className="text-sm text-[#6c655d]">
                    Tuesday, 16 June 2026
                  </p>
                </div>
                <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-[#cfc6b8] bg-white px-3 text-sm font-semibold text-[#2b2f2c] transition hover:bg-[#f4efe6]">
                  <CalendarCheck className="size-4" aria-hidden="true" />
                  View calendar
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#ded7ca] text-[#6c655d]">
                      <th className="px-4 py-3 font-medium">Time</th>
                      <th className="px-4 py-3 font-medium">Customer</th>
                      <th className="px-4 py-3 font-medium">Service</th>
                      <th className="px-4 py-3 font-medium">Staff</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr
                        className="border-b border-[#eee7db] last:border-0"
                        key={`${appointment.time}-${appointment.customer}`}
                      >
                        <td className="px-4 py-4 font-semibold">
                          {appointment.time}
                        </td>
                        <td className="px-4 py-4">{appointment.customer}</td>
                        <td className="px-4 py-4 text-[#575047]">
                          {appointment.service}
                        </td>
                        <td className="px-4 py-4 text-[#575047]">
                          {appointment.staff}
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center rounded-md bg-[#edf5ef] px-2 py-1 text-xs font-semibold text-[#236043]">
                            {appointment.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-semibold">
                          {appointment.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <aside className="grid gap-6">
              <article className="rounded-lg border border-[#ded7ca] bg-[#fffdf8] p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">Reminder queue</h2>
                    <p className="text-sm text-[#6c655d]">
                      WhatsApp first, automation later
                    </p>
                  </div>
                  <MessageCircle
                    className="size-5 text-[#1d6f53]"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-4 grid gap-3">
                  {reminders.map((reminder) => (
                    <div
                      className="flex items-start gap-3 rounded-md border border-[#eee7db] bg-white p-3"
                      key={reminder}
                    >
                      <Clock3
                        className="mt-0.5 size-4 shrink-0 text-[#7a5d35]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-6 text-[#3f403d]">
                        {reminder}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-lg border border-[#ded7ca] bg-[#163a2b] p-4 text-white shadow-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-5 text-[#f3c969]" aria-hidden="true" />
                  <h2 className="text-lg font-semibold">MVP focus</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#dbe9df]">
                  We are building appointments, customer memory, and reminders
                  first because those are easiest to demo and closest to revenue.
                </p>
              </article>
            </aside>
          </div>

          <article className="rounded-lg border border-[#ded7ca] bg-[#fffdf8] p-4 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Top customers</h2>
                <p className="text-sm text-[#6c655d]">
                  Early customer history view for repeat visits and follow-ups
                </p>
              </div>
              <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-[#cfc6b8] bg-white px-3 text-sm font-semibold text-[#2b2f2c] transition hover:bg-[#f4efe6]">
                <Users className="size-4" aria-hidden="true" />
                Open customers
              </button>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {customers.map((customer) => (
                <div
                  className="rounded-md border border-[#eee7db] bg-white p-4"
                  key={customer.name}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{customer.name}</p>
                      <p className="mt-1 text-sm text-[#6c655d]">
                        Last visit: {customer.lastVisit}
                      </p>
                    </div>
                    <CheckCircle2
                      className="size-5 text-[#1d6f53]"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span>{customer.visits} visits</span>
                    <span className="font-semibold">{customer.spend}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
