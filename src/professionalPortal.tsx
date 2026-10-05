import { useState, type ReactNode } from "react";
import { productConfig } from "./config";
import { demoData } from "./demoData";
import { Brand, DemoBanner } from "./pages";

type ProfessionalPage = "requests" | "settings";

function ProfessionalHeader({ page }: { page: ProfessionalPage }) {
  return (
    <header className="app-safe-top sticky top-0 z-30 border-b border-black/10 bg-[#f4f2eb]/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 px-4 py-4 sm:px-8">
        <a href="/"><Brand /></a>
        <nav className="hidden rounded-full bg-black/5 p-1 sm:flex">
          <a href="/portal/professional" className={`rounded-full px-4 py-2 text-xs font-bold ${page === "requests" ? "bg-white shadow-sm" : "text-black/45"}`}>Requests</a>
          <a href="/portal/professional/settings" className={`rounded-full px-4 py-2 text-xs font-bold ${page === "settings" ? "bg-white shadow-sm" : "text-black/45"}`}>Settings</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="/" className="rounded-full border border-black/15 px-4 py-2.5 text-xs font-bold">Exit</a>
          <a href="/portal/account?role=professional" aria-label="Account" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#17201d] text-xs font-bold text-white">
            {demoData.mentor.initials}
          </a>
        </div>
      </div>
      <nav className="flex justify-center gap-1 border-t border-black/5 p-2 sm:hidden">
        <a href="/portal/professional" className={`rounded-full px-4 py-2 text-xs font-bold ${page === "requests" ? "bg-white shadow-sm" : "text-black/45"}`}>Requests</a>
        <a href="/portal/professional/settings" className={`rounded-full px-4 py-2 text-xs font-bold ${page === "settings" ? "bg-white shadow-sm" : "text-black/45"}`}>Settings</a>
      </nav>
      <div className="flex justify-start gap-1 overflow-x-auto border-t border-black/5 px-3 py-2">
        <a href="/portal?role=parent" className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-black/45">Parent</a>
        <a href="/portal?role=coach" className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-black/45">Coach</a>
        <a href="/portal/athlete" className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-black/45">Athlete</a>
        <a href="/portal/admin" className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-black/45">Admin</a>
        <span className="shrink-0 rounded-full bg-white px-3 py-2 text-xs font-bold shadow-sm">Professional</span>
        <a href="/staff" className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-black/45">Staff</a>
      </div>
    </header>
  );
}

function ProfessionalShell({ page, children }: { page: ProfessionalPage; children: ReactNode }) {
  document.title = `${page === "requests" ? "Requests" : "Professional settings"} | ${productConfig.name}`;
  return (
    <main className="min-h-screen bg-[#f4f2eb] text-[#171b19]">
      <ProfessionalHeader page={page} />
      <DemoBanner />
      <div className="border-b border-black/10 bg-[#fff8df] px-4 py-3 text-center text-xs font-bold text-black/60">
        Requests are confidential. Follow your professional and legal obligations for each contact.
      </div>
      {children}
    </main>
  );
}

export function ProfessionalRequestsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const requests = demoData.professional.contactRequests;
  const selected = requests.find((request) => request.id === selectedId);
  return (
    <ProfessionalShell page="requests">
      <div className="mx-auto max-w-[1000px] px-4 py-8 sm:px-8 lg:py-12">
        <p className="eyebrow">Professional portal</p>
        <h1 className="font-display mt-4 text-5xl tracking-[-0.04em]">Requests</h1>
        <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="overflow-hidden rounded-[2rem] bg-white">
            {requests.map((request) => (
              <button
                key={request.id}
                onClick={() => setSelectedId(request.id)}
                className={`w-full border-b border-black/10 p-6 text-left last:border-0 ${
                  selectedId === request.id ? "bg-[#eef4d4]" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold">{request.date}</span>
                  <span className="rounded-full bg-[#f4f2eb] px-3 py-1.5 text-[10px] font-bold uppercase">
                    {statuses[request.id] ?? request.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-black/55">{request.role} · {request.method}</p>
              </button>
            ))}
          </section>
          <section className="min-h-80 rounded-[2rem] bg-white p-7 sm:p-9">
            {selected ? (
              <>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-bold">{selected.name}</h2>
                  <span className="text-xs font-bold text-black/45">{selected.role}</span>
                </div>
                <dl className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div><dt className="text-[10px] font-bold uppercase text-black/40">Email</dt><dd className="mt-1 text-sm font-bold">{selected.email}</dd></div>
                  <div><dt className="text-[10px] font-bold uppercase text-black/40">Phone</dt><dd className="mt-1 text-sm font-bold">{selected.phone}</dd></div>
                  <div><dt className="text-[10px] font-bold uppercase text-black/40">Preferred method</dt><dd className="mt-1 text-sm font-bold">{selected.method}</dd></div>
                  <div><dt className="text-[10px] font-bold uppercase text-black/40">Preferred time</dt><dd className="mt-1 text-sm font-bold">{selected.preferredTime}</dd></div>
                </dl>
                <div className="mt-7 rounded-2xl bg-[#f4f2eb] p-5">
                  <p className="text-[10px] font-bold uppercase text-black/40">Optional message</p>
                  <p className="mt-2 text-sm leading-6">{selected.message || "No message provided."}</p>
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button onClick={() => setStatuses((current) => ({ ...current, [selected.id]: "Contacted" }))} className="rounded-full bg-[#171b19] px-6 py-3 text-sm font-bold text-white">Mark contacted</button>
                  <button onClick={() => setStatuses((current) => ({ ...current, [selected.id]: "Closed" }))} className="rounded-full border border-black/15 px-6 py-3 text-sm font-bold">Close</button>
                </div>
              </>
            ) : (
              <div className="flex min-h-64 items-center justify-center text-center text-sm font-bold text-black/40">
                Select a request
              </div>
            )}
          </section>
        </div>
      </div>
    </ProfessionalShell>
  );
}

export function ProfessionalSettingsPage() {
  const professional = demoData.professional.sample;
  return (
    <ProfessionalShell page="settings">
      <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-8 lg:py-12">
        <p className="eyebrow">Professional portal</p>
        <h1 className="font-display mt-4 text-5xl tracking-[-0.04em]">Settings</h1>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <section className="rounded-[2rem] bg-white p-7">
            <p className="text-[10px] font-bold uppercase text-black/40">Availability</p>
            <p className="mt-3 font-bold">{professional.availability}</p>
          </section>
          <section className="rounded-[2rem] bg-[#eef4d4] p-7">
            <p className="text-[10px] font-bold uppercase text-black/40">Response time</p>
            <p className="mt-3 font-bold">{demoData.professional.responseTime}</p>
          </section>
          <section className="rounded-[2rem] bg-white p-7 sm:col-span-2">
            <h2 className="text-xl font-bold">Contact details</h2>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              <div><dt className="text-[10px] font-bold uppercase text-black/40">Name</dt><dd className="mt-1 font-bold">{professional.name}, {professional.credentials}</dd></div>
              <div><dt className="text-[10px] font-bold uppercase text-black/40">License</dt><dd className="mt-1 font-bold">{professional.licenseState} {professional.licenseNumber}</dd></div>
              <div><dt className="text-[10px] font-bold uppercase text-black/40">Email</dt><dd className="mt-1 font-bold">{professional.email}</dd></div>
              <div><dt className="text-[10px] font-bold uppercase text-black/40">Phone</dt><dd className="mt-1 font-bold">{professional.phone}</dd></div>
            </dl>
          </section>
        </div>
      </div>
    </ProfessionalShell>
  );
}
