import { productConfig } from "./config";
import { demoData } from "./demoData";
import { Brand, DemoBanner } from "./pages";

function StaffHeader({ page }: { page: "overview" | "emails" }) {
  return (
    <header className="app-safe-top sticky top-0 z-30 border-b border-black/10 bg-[#f4f2eb]/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1328px] items-center justify-between gap-3 px-5 py-4 sm:px-9">
        <a href="/"><Brand /></a>
        <nav className="hidden rounded-full bg-black/5 p-1 md:flex">
          <a href="/staff" className={`rounded-full px-4 py-2 text-xs font-bold ${page === "overview" ? "bg-white shadow-sm" : "text-black/45"}`}>Overview</a>
          <a href="/staff/emails" className={`rounded-full px-4 py-2 text-xs font-bold ${page === "emails" ? "bg-white shadow-sm" : "text-black/45"}`}>Email templates</a>
        </nav>
        <div className="hidden rounded-full bg-black/5 p-1 lg:flex">
          <a href="/portal?role=parent" className="rounded-full px-3 py-2 text-xs font-bold text-black/45">Parent</a>
          <a href="/portal?role=coach" className="rounded-full px-3 py-2 text-xs font-bold text-black/45">Coach</a>
          <a href="/portal/athlete" className="rounded-full px-3 py-2 text-xs font-bold text-black/45">Athlete</a>
          <a href="/portal/admin" className="rounded-full px-3 py-2 text-xs font-bold text-black/45">Admin</a>
          <a href="/portal/professional" className="rounded-full px-3 py-2 text-xs font-bold text-black/45">Professional</a>
          <span className="rounded-full bg-white px-3 py-2 text-xs font-bold shadow-sm">Staff</span>
        </div>
        <a href="/" className="rounded-full border border-black/15 px-4 py-2.5 text-xs font-bold">Exit</a>
      </div>
      <div className="border-t border-black/5 md:hidden">
        <nav className="flex justify-center gap-1 p-2">
          <a href="/staff" className={`rounded-full px-4 py-2 text-xs font-bold ${page === "overview" ? "bg-white shadow-sm" : "text-black/45"}`}>Overview</a>
          <a href="/staff/emails" className={`rounded-full px-4 py-2 text-xs font-bold ${page === "emails" ? "bg-white shadow-sm" : "text-black/45"}`}>Email templates</a>
        </nav>
        <div className="flex justify-start gap-1 overflow-x-auto border-t border-black/5 px-3 py-2">
          <a href="/portal?role=parent" className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-black/45">Parent</a>
          <a href="/portal?role=coach" className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-black/45">Coach</a>
          <a href="/portal/athlete" className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-black/45">Athlete</a>
          <a href="/portal/admin" className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-black/45">Admin</a>
          <a href="/portal/professional" className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-black/45">Professional</a>
          <span className="shrink-0 rounded-full bg-white px-3 py-2 text-xs font-bold shadow-sm">Staff</span>
        </div>
      </div>
    </header>
  );
}

const pageWrap = "mx-auto max-w-[1328px] px-5 py-10 sm:px-9 lg:py-14";

export function StaffPage() {
  document.title = `Staff | ${productConfig.name}`;
  const staff = demoData.staff;
  return (
    <main className="min-h-screen bg-[#f4f2eb] text-[#171b19]">
      <StaffHeader page="overview" />
      <DemoBanner />
      <div className={pageWrap}>
        <p className="eyebrow">Internal staff console</p>
        <h1 className="font-display mt-4 text-5xl tracking-[-0.04em] sm:text-6xl">Staff</h1>
        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Organizations", staff.figures.organizations],
            ["Active teams", staff.figures.activeTeams],
            ["People enrolled", staff.figures.peopleEnrolled],
            ["Overall completion rate", `${staff.figures.completionRate}%`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl bg-white p-6">
              <p className="text-[10px] font-bold tracking-wider text-black/40 uppercase">{label}</p>
              <p className="font-display mt-4 text-5xl">{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-5 overflow-hidden rounded-[2rem] bg-white">
          <div className="border-b border-black/10 p-7 sm:px-9"><h2 className="text-xl font-bold">Organizations</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[940px] border-collapse text-left">
              <thead><tr className="border-b border-black/10 text-[10px] font-bold tracking-wider text-black/40 uppercase">
                {["Name", "Type", "Plan", "Teams", "People", "Completion", "Contact requests", "Season end date"].map((heading) => <th key={heading} className="px-6 py-4">{heading}</th>)}
              </tr></thead>
              <tbody>{staff.organizations.map((organization) => (
                <tr key={organization.name} className="border-b border-black/5 last:border-0">
                  <td className="px-6 py-4 text-sm font-bold">{organization.name}</td>
                  <td className="px-6 py-4 text-sm text-black/55">{organization.type}</td>
                  <td className="px-6 py-4 text-sm">{organization.plan}</td>
                  <td className="px-6 py-4 text-sm">{organization.teams}</td>
                  <td className="px-6 py-4 text-sm">{organization.people}</td>
                  <td className="px-6 py-4 text-sm font-bold">{organization.completion}%</td>
                  <td className="px-6 py-4 text-sm font-bold">{organization.contactRequests}</td>
                  <td className="px-6 py-4 text-sm text-black/55">{organization.seasonEnd}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[2rem] bg-white">
          <div className="border-b border-black/10 p-7 sm:px-9"><h2 className="text-xl font-bold">Demo requests</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead><tr className="border-b border-black/10 text-[10px] font-bold tracking-wider text-black/40 uppercase">
                {["Date", "Name", "Organization", "Type", "Number of athletes", "Status"].map((heading) => <th key={heading} className="px-6 py-4">{heading}</th>)}
              </tr></thead>
              <tbody>{staff.demoRequests.map((request) => (
                <tr key={`${request.date}-${request.name}`} className="border-b border-black/5 last:border-0">
                  <td className="px-6 py-4 text-sm text-black/55">{request.date}</td>
                  <td className="px-6 py-4 text-sm font-bold">{request.name}</td>
                  <td className="px-6 py-4 text-sm">{request.organization}</td>
                  <td className="px-6 py-4 text-sm text-black/55">{request.type}</td>
                  <td className="px-6 py-4 text-sm">{request.athletes}</td>
                  <td className="px-6 py-4"><span className="rounded-full bg-[#f4f2eb] px-3 py-1.5 text-xs font-bold">{request.status}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function EmailPreview({
  label,
  subject,
  children,
  button,
}: {
  label: string;
  subject: string;
  children: React.ReactNode;
  button: string;
}) {
  return (
    <section className="overflow-hidden rounded-[2rem] bg-white">
      <div className="border-b border-black/10 bg-[#f4f2eb] px-6 py-4">
        <p className="text-[10px] font-bold tracking-wider text-black/40 uppercase">{label}</p>
        <p className="mt-2 font-bold">{subject}</p>
      </div>
      <div className="p-7 sm:p-9">
        <p className="text-xs font-bold tracking-[0.12em] uppercase">{productConfig.name}</p>
        <div className="mt-7 text-sm leading-7 text-black/60">{children}</div>
        <button className="mt-7 rounded-full bg-[#171b19] px-6 py-3.5 text-sm font-bold text-white">{button}</button>
        <p className="mt-8 border-t border-black/10 pt-5 text-xs text-black/40">TEAM Institute provides education. It is not therapy.</p>
      </div>
    </section>
  );
}

export function StaffEmailsPage() {
  document.title = `Email templates | ${productConfig.name}`;
  const emails = demoData.staff.emails;
  return (
    <main className="min-h-screen bg-[#f4f2eb] text-[#171b19]">
      <StaffHeader page="emails" />
      <DemoBanner />
      <div className="mx-auto max-w-[960px] px-5 py-10 sm:px-9 lg:py-14">
        <p className="eyebrow">Internal staff console</p>
        <h1 className="font-display mt-4 text-5xl tracking-[-0.04em] sm:text-6xl">Email templates</h1>
        <div className="mt-10 space-y-5">
          <EmailPreview label="Invitation" subject={`Join ${emails.invitation.team} on ${productConfig.name}`} button="Join your team">
            <p>{emails.invitation.inviter} has invited you to complete a short course for {emails.invitation.team}. It takes about 70 minutes and is due {emails.invitation.dueDate}.</p>
          </EmailPreview>
          <EmailPreview label="Welcome" subject="You are in. Here is how to start." button="Start my course">
            <p>Your course has 11 guided stops. You can stop and pick up where you left off on any device.</p>
          </EmailPreview>
          <EmailPreview label="Reminder" subject={`Your course for ${emails.reminder.team} is due ${emails.reminder.dueDate}`} button="Continue">
            <p>You have completed {emails.reminder.stopsComplete} of 11 stops. About {emails.reminder.minutesRemaining} minutes remain.</p>
          </EmailPreview>
          <EmailPreview label="Completion" subject={`You completed ${emails.completion.course}`} button="View certificate">
            <p>Your certificate is ready. Certificate ID: {emails.completion.certificateId}. Anyone can verify it at {productConfig.website}/verify.</p>
          </EmailPreview>
          <EmailPreview label="Monthly summary for administrators" subject={`${emails.summary.organization}: ${emails.summary.completion} percent complete`} button="Open dashboard">
            <div className="overflow-hidden rounded-xl border border-black/10">
              {emails.summary.teams.map((team) => (
                <div key={team.name} className="flex justify-between border-b border-black/10 px-4 py-3 last:border-0">
                  <span className="font-bold">{team.name}</span><span>{team.completion}%</span>
                </div>
              ))}
            </div>
            <p className="mt-4">{emails.summary.overdue} people overdue.</p>
          </EmailPreview>
        </div>
      </div>
    </main>
  );
}
