import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { productConfig } from "./config";
import { demoData } from "./demoData";
import { Brand, CrisisPanel, DemoBanner, PortalFooter } from "./pages";

type AdminScreen = "overview" | "teams" | "people" | "reports" | "settings" | "billing" | "team";
type Team = (typeof demoData.admin.teams)[number] | {
  id: string;
  name: string;
  sport: string;
  season: string;
  dueDate: string;
  coaches: number;
  parents: number;
  completion: number;
  complete: number;
  joinLink: string;
  roster: readonly [];
};

const navItems = [
  ["Overview", "/portal/admin"],
  ["Teams", "/portal/admin/teams"],
  ["People", "/portal/admin/people"],
  ["Reports", "/portal/admin/reports"],
  ["Settings", "/portal/admin/settings"],
  ["Billing", "/portal/admin/billing"],
] as const;

function AdminHeader({ screen }: { screen: AdminScreen }) {
  const active = screen === "team" ? "teams" : screen;
  return (
    <header className="app-safe-top sticky top-0 z-30 border-b border-black/10 bg-[#f4f2eb]/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1328px] items-center justify-between gap-3 px-5 py-4 sm:px-9">
        <a href="/" aria-label={`${productConfig.name} home`}>
          <Brand />
        </a>
        <nav className="hidden items-center gap-1 rounded-full bg-black/5 p-1 lg:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`rounded-full px-4 py-2 text-xs font-bold ${
                active === label.toLowerCase() ? "bg-white shadow-sm" : "text-black/45"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden rounded-full bg-black/5 p-1 sm:flex">
          <a href="/portal?role=parent" className="rounded-full px-4 py-2 text-xs font-bold text-black/50">
            Parent
          </a>
          <a href="/portal?role=coach" className="rounded-full px-4 py-2 text-xs font-bold text-black/50">
            Coach
          </a>
          <span className="rounded-full bg-white px-4 py-2 text-xs font-bold shadow-sm">Admin</span>
          <a href="/staff" className="rounded-full px-4 py-2 text-xs font-bold text-black/50">Staff</a>
        </div>
        <a href="/" className="hidden rounded-full border border-black/15 px-4 py-2.5 text-xs font-bold sm:block">
          Exit portal
        </a>
        <a
          href="/portal/account?role=admin"
          aria-label="Account"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#17201d] text-xs font-bold text-white"
        >
          {demoData.mentor.initials}
        </a>
      </div>
      <div className="border-t border-black/5 lg:hidden">
        <nav className="flex gap-1 overflow-x-auto px-3 py-2">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${
                active === label.toLowerCase() ? "bg-white shadow-sm" : "text-black/45"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex justify-center gap-1 border-t border-black/5 p-2 sm:hidden">
          <a href="/portal?role=parent" className="rounded-full px-4 py-2 text-xs font-bold text-black/50">Parent</a>
          <a href="/portal?role=coach" className="rounded-full px-4 py-2 text-xs font-bold text-black/50">Coach</a>
          <span className="rounded-full bg-white px-4 py-2 text-xs font-bold shadow-sm">Admin</span>
          <a href="/staff" className="rounded-full px-4 py-2 text-xs font-bold text-black/50">Staff</a>
        </div>
      </div>
    </header>
  );
}

function AdminPage({ children, screen }: { children: ReactNode; screen: AdminScreen }) {
  const [crisisOpen, setCrisisOpen] = useState(false);
  document.title = `Admin | ${productConfig.name}`;
  return (
    <main className="min-h-screen bg-[#f4f2eb] text-[#171b19]">
      <AdminHeader screen={screen} />
      <DemoBanner />
      {children}
      <PortalFooter openCrisis={() => setCrisisOpen(true)} />
      {crisisOpen && <CrisisPanel close={() => setCrisisOpen(false)} />}
    </main>
  );
}

const pageWrap = "mx-auto max-w-[1328px] px-5 py-10 sm:px-9 lg:py-14";
const inputClass =
  "mt-2 min-h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-none focus:border-black/50";

function PageHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="font-display mt-4 text-5xl tracking-[-0.04em] sm:text-6xl">{title}</h1>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-black/10">
      <div className="h-full rounded-full bg-[#17201d]" style={{ width: `${value}%` }} />
    </div>
  );
}

function Overview({ teams }: { teams: Team[] }) {
  const figures = demoData.admin.figures;
  const attention = teams.filter((team) => team.completion < 50);
  return (
    <AdminPage screen="overview">
      <div className={pageWrap}>
        <PageHeading eyebrow="Administrator portal" title={demoData.admin.organization.name} />
        {teams.length === 0 ? (
          <section className="mt-12 rounded-[2rem] bg-white p-10 text-center sm:p-16">
            <h2 className="font-display text-4xl">Create your first team to get started</h2>
            <a href="/portal/admin/teams?create=1" className="mt-7 inline-block rounded-full bg-[#171b19] px-6 py-3.5 text-sm font-bold text-white">
              Create team
            </a>
          </section>
        ) : (
          <>
            <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Overall completion rate", `${figures.completionRate}%`],
                ["People enrolled", figures.enrolled],
                ["People complete", figures.complete],
                ["People overdue", figures.overdue],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl bg-white p-6">
                  <p className="text-[10px] font-bold tracking-wider text-black/40 uppercase">{label}</p>
                  <p className="font-display mt-4 text-5xl">{value}</p>
                </div>
              ))}
            </section>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              <section className="rounded-[2rem] bg-white p-7 sm:p-9">
                <h2 className="text-xl font-bold">Teams</h2>
                <div className="mt-7 space-y-7">
                  {teams.map((team) => (
                    <a key={team.id} href={`/portal/admin/teams/${team.id}`} className="block">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                        <div>
                          <p className="font-bold">{team.name}</p>
                          <p className="mt-1 text-xs text-black/45">{team.sport} · {team.season} · Due {team.dueDate}</p>
                        </div>
                        <span className="text-sm font-bold">{team.completion}%</span>
                      </div>
                      <div className="mt-3"><ProgressBar value={team.completion} /></div>
                    </a>
                  ))}
                </div>
              </section>
              <section className="rounded-[2rem] bg-[#fff8df] p-7 sm:p-9">
                <h2 className="text-xl font-bold">Needs attention</h2>
                <div className="mt-7 space-y-4">
                  {attention.map((team) => (
                    <a key={team.id} href={`/portal/admin/teams/${team.id}`} className="block rounded-2xl bg-white/65 p-5">
                      <p className="font-bold">{team.name}</p>
                      <p className="mt-2 text-sm text-black/50">{team.completion}% complete</p>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </AdminPage>
  );
}

function TeamsScreen({
  teams,
  addTeam,
}: {
  teams: Team[];
  addTeam: (team: Team) => void;
}) {
  const [creating, setCreating] = useState(new URLSearchParams(window.location.search).get("create") === "1");
  const [error, setError] = useState(false);
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    if (!name) {
      setError(true);
      return;
    }
    const id = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
    addTeam({
      id,
      name,
      sport: String(form.get("sport") ?? ""),
      season: String(form.get("season") ?? ""),
      dueDate: String(form.get("dueDate") ?? ""),
      coaches: 0,
      parents: 0,
      completion: 0,
      complete: 0,
      joinLink: `https://teaminstitute.org/join/${id}`,
      roster: [],
    });
    setError(false);
    setCreating(false);
  };
  return (
    <AdminPage screen="teams">
      <div className={pageWrap}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <PageHeading eyebrow="Administrator portal" title="Teams" />
          <button onClick={() => setCreating(true)} className="rounded-full bg-[#171b19] px-6 py-3.5 text-sm font-bold text-white">
            Create team
          </button>
        </div>
        {creating && (
          <form onSubmit={save} className="mt-8 rounded-[2rem] bg-white p-7 sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-bold">Team name<input name="name" className={inputClass} /></label>
              <label className="text-sm font-bold">Sport<input name="sport" className={inputClass} /></label>
              <label className="text-sm font-bold">Season<input name="season" className={inputClass} /></label>
              <label className="text-sm font-bold">Due date<input name="dueDate" type="date" className={inputClass} /></label>
            </div>
            {error && <p role="alert" className="mt-5 text-sm font-bold text-[#9a3f2f]">Enter a team name.</p>}
            <div className="mt-6 flex gap-3">
              <button className="rounded-full bg-[#171b19] px-6 py-3 text-sm font-bold text-white">Save team</button>
              <button type="button" onClick={() => setCreating(false)} className="rounded-full border border-black/15 px-6 py-3 text-sm font-bold">Cancel</button>
            </div>
          </form>
        )}
        <section className="mt-8 overflow-hidden rounded-[2rem] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead><tr className="border-b border-black/10 text-[10px] font-bold tracking-wider text-black/40 uppercase">
                {["Team name", "Sport", "Season", "Coaches", "Parents", "Completion", "Due date"].map((heading) => <th key={heading} className="px-6 py-4">{heading}</th>)}
              </tr></thead>
              <tbody>{teams.map((team) => (
                <tr key={team.id} className="border-b border-black/5 last:border-0">
                  <td className="px-6 py-4"><a href={`/portal/admin/teams/${team.id}`} className="font-bold">{team.name}</a></td>
                  <td className="px-6 py-4 text-sm text-black/55">{team.sport}</td>
                  <td className="px-6 py-4 text-sm text-black/55">{team.season}</td>
                  <td className="px-6 py-4 text-sm">{team.coaches}</td>
                  <td className="px-6 py-4 text-sm">{team.parents}</td>
                  <td className="px-6 py-4 text-sm font-bold">{team.completion}%</td>
                  <td className="px-6 py-4 text-sm text-black/55">{team.dueDate}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminPage>
  );
}

function TeamDetail({ team }: { team: Team }) {
  const [filter, setFilter] = useState("All");
  const [confirming, setConfirming] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const roster = team.roster.filter((person) => filter === "All" || person.status === filter);
  const unfinished = team.roster.filter((person) => person.status !== "Complete").length;
  const joinUrl = new URL(team.joinLink, window.location.origin).href;
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(joinUrl);
    } catch {
      // Clipboard access is not available in every preview environment.
    }
    setCopied(true);
  };
  return (
    <AdminPage screen="team">
      <div className={pageWrap}>
        <a href="/portal/admin/teams" className="text-sm font-bold text-black/50">Back to teams</a>
        <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">{team.sport} · {team.season}</p>
            <h1 className="font-display mt-4 text-5xl tracking-[-0.04em] sm:text-6xl">{team.name}</h1>
            <p className="mt-4 text-sm text-black/50">Due {team.dueDate}</p>
          </div>
          <div className="w-full max-w-sm">
            <div className="mb-3 flex justify-between text-sm font-bold"><span>Completion</span><span>{team.completion}%</span></div>
            <ProgressBar value={team.completion} />
          </div>
        </div>
        <section className="mt-10 grid gap-5 rounded-[2rem] bg-[#efe7ff] p-7 sm:p-9 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">Join link</p>
            <p className="mt-4 break-all text-sm font-bold">{joinUrl}</p>
            <p className="mt-4 text-sm leading-6 text-black/55">Share this at your pre-season meeting. Coaches and parents join in about two minutes.</p>
            <button onClick={copyLink} className="mt-6 rounded-full bg-[#171b19] px-6 py-3 text-sm font-bold text-white">
              {copied ? "Copied." : "Copy link"}
            </button>
          </div>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(joinUrl)}`}
            alt={`QR code for ${team.name} join link`}
            className="h-44 w-44 rounded-xl bg-white p-2"
          />
        </section>
        <section className="mt-5 overflow-hidden rounded-[2rem] bg-white">
          <div className="flex flex-col justify-between gap-5 border-b border-black/10 p-7 sm:flex-row sm:items-center sm:px-9">
            <div className="flex flex-wrap gap-2">
              {["All", "Not started", "In progress", "Complete"].map((item) => (
                <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 text-xs font-bold ${filter === item ? "bg-[#17201d] text-white" : "bg-[#f4f2eb]"}`}>
                  {item}
                </button>
              ))}
            </div>
            <button onClick={() => { setConfirming(true); setSent(false); }} className="rounded-full border border-black/15 px-5 py-3 text-sm font-bold">
              Send reminder
            </button>
          </div>
          {confirming && (
            <div className="border-b border-black/10 bg-[#fff8df] p-6 sm:px-9">
              <p className="font-bold">Send a reminder to {unfinished} people who have not finished?</p>
              <div className="mt-4 flex gap-3">
                <button onClick={() => { setSent(true); setConfirming(false); }} className="rounded-full bg-[#171b19] px-5 py-2.5 text-xs font-bold text-white">Confirm</button>
                <button onClick={() => setConfirming(false)} className="rounded-full border border-black/15 px-5 py-2.5 text-xs font-bold">Cancel</button>
              </div>
            </div>
          )}
          {sent && <p role="status" className="border-b border-black/10 bg-[#eef4d4] p-5 font-bold sm:px-9">Reminders sent.</p>}
          <RosterTable people={roster.map((person) => ({ ...person, team: team.name }))} showTeam={false} />
        </section>
      </div>
    </AdminPage>
  );
}

type PersonRow = {
  name: string;
  role: string;
  status: string;
  completed: string;
  team: string;
};

function RosterTable({ people, showTeam }: { people: PersonRow[]; showTeam: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead><tr className="border-b border-black/10 text-[10px] font-bold tracking-wider text-black/40 uppercase">
          <th className="px-9 py-4">Name</th><th className="px-6 py-4">Role</th>
          {showTeam && <th className="px-6 py-4">Team</th>}
          <th className="px-6 py-4">Course status</th><th className="px-9 py-4 text-right">Completion date</th>
        </tr></thead>
        <tbody>{people.map((person) => (
          <tr key={`${person.team}-${person.name}`} className="border-b border-black/5 last:border-0">
            <td className="px-9 py-4 text-sm font-bold">{person.name}</td>
            <td className="px-6 py-4 text-sm text-black/55">{person.role}</td>
            {showTeam && <td className="px-6 py-4 text-sm text-black/55">{person.team}</td>}
            <td className="px-6 py-4 text-sm">{person.status}</td>
            <td className="px-9 py-4 text-right text-sm text-black/45">{person.completed}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function PeopleScreen({ teams }: { teams: Team[] }) {
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const people = useMemo(
    () => teams.flatMap((team) => team.roster.map((person) => ({ ...person, team: team.name }))),
    [teams],
  );
  const filtered = people.filter(
    (person) =>
      person.name.toLowerCase().includes(search.toLowerCase()) &&
      (teamFilter === "All" || person.team === teamFilter) &&
      (roleFilter === "All" || person.role === roleFilter) &&
      (statusFilter === "All" || person.status === statusFilter),
  );
  return (
    <AdminPage screen="people">
      <div className={pageWrap}>
        <PageHeading eyebrow="Administrator portal" title="People" />
        <section className="mt-10 overflow-hidden rounded-[2rem] bg-white">
          <div className="grid gap-3 border-b border-black/10 p-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-9">
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name" className="min-h-11 rounded-xl border border-black/15 px-4 text-sm" />
            <select value={teamFilter} onChange={(event) => setTeamFilter(event.target.value)} className="min-h-11 rounded-xl border border-black/15 bg-white px-3 text-sm">
              <option>All</option>{teams.map((team) => <option key={team.id}>{team.name}</option>)}
            </select>
            <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} className="min-h-11 rounded-xl border border-black/15 bg-white px-3 text-sm">
              <option>All</option><option>Parent</option><option>Coach</option>
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="min-h-11 rounded-xl border border-black/15 bg-white px-3 text-sm">
              <option>All</option><option>Not started</option><option>In progress</option><option>Complete</option>
            </select>
          </div>
          {filtered.length ? (
            <RosterTable people={filtered} showTeam />
          ) : (
            <div className="p-12 text-center sm:p-16">
              <h2 className="font-display text-4xl">No results</h2>
            </div>
          )}
        </section>
      </div>
    </AdminPage>
  );
}

function ReportsScreen({ teams }: { teams: Team[] }) {
  const [scope, setScope] = useState("Whole organization");
  const [season, setSeason] = useState("Fall season");
  const [notice, setNotice] = useState(false);
  const selectedTeam = teams.find((team) => team.name === scope);
  const reportTeams = selectedTeam ? [selectedTeam] : teams;
  const people = reportTeams.flatMap((team) => team.roster.map((person) => ({ ...person, team: team.name })));
  const complete = people.filter((person) => person.status === "Complete").length;
  const rate = people.length ? Math.round((complete / people.length) * 100) : 0;
  return (
    <AdminPage screen="reports">
      <div className={pageWrap}>
        <PageHeading eyebrow="Administrator portal" title="Reports" />
        <div className="mt-10 grid gap-4 rounded-[2rem] bg-white p-7 sm:grid-cols-2 sm:p-9">
          <label className="text-sm font-bold">Scope
            <select value={scope} onChange={(event) => setScope(event.target.value)} className={inputClass}>
              <option>Whole organization</option>{teams.map((team) => <option key={team.id}>{team.name}</option>)}
            </select>
          </label>
          <label className="text-sm font-bold">Season
            <select value={season} onChange={(event) => setSeason(event.target.value)} className={inputClass}><option>Fall season</option></select>
          </label>
        </div>
        <section className="mt-5 overflow-hidden rounded-[2rem] bg-white">
          <div className="grid gap-5 border-b border-black/10 p-7 sm:grid-cols-2 sm:p-9 lg:grid-cols-4">
            <div><p className="text-[10px] font-bold text-black/40 uppercase">Organization</p><p className="mt-2 font-bold">{demoData.admin.organization.name}</p></div>
            <div><p className="text-[10px] font-bold text-black/40 uppercase">Team</p><p className="mt-2 font-bold">{scope}</p></div>
            <div><p className="text-[10px] font-bold text-black/40 uppercase">Date generated</p><p className="mt-2 font-bold">{demoData.admin.reportGenerated}</p></div>
            <div><p className="text-[10px] font-bold text-black/40 uppercase">Completion rate</p><p className="mt-2 font-bold">{rate}%</p></div>
          </div>
          <RosterTable people={people} showTeam={!selectedTeam} />
        </section>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {["Download PDF", "Download spreadsheet"].map((label) => (
            <button key={label} onClick={() => setNotice(true)} className="rounded-full bg-[#171b19] px-6 py-3.5 text-sm font-bold text-white">{label}</button>
          ))}
        </div>
        {notice && <p role="status" className="mt-5 rounded-2xl bg-[#fff8df] p-5 text-sm font-bold">Export will be available when the back end is connected.</p>}
      </div>
    </AdminPage>
  );
}

function SettingsScreen() {
  const admin = demoData.admin;
  return (
    <AdminPage screen="settings">
      <div className={pageWrap}>
        <PageHeading eyebrow="Administrator portal" title="Settings" />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <section className="rounded-[2rem] bg-white p-7 sm:p-9">
            <h2 className="text-xl font-bold">Organization</h2>
            <label className="mt-7 block text-sm font-bold">Organization name<input defaultValue={admin.organization.name} className={inputClass} /></label>
            <label className="mt-5 block text-sm font-bold">Organization type<input defaultValue={admin.organization.type} className={inputClass} /></label>
          </section>
          <section className="rounded-[2rem] bg-white p-7 sm:p-9">
            <h2 className="text-xl font-bold">Administrators</h2>
            <div className="mt-7 space-y-4">{admin.administrators.map((person) => (
              <div key={person.name} className="rounded-2xl bg-[#f4f2eb] p-5"><p className="font-bold">{person.name}</p><p className="mt-1 text-xs text-black/45">{person.role}</p></div>
            ))}</div>
          </section>
          <section className="rounded-[2rem] bg-white p-7 sm:p-9">
            <h2 className="text-xl font-bold">Billing contact</h2>
            <label className="mt-7 block text-sm font-bold">Name<input defaultValue={admin.billingContact.name} className={inputClass} /></label>
            <label className="mt-5 block text-sm font-bold">Email<input defaultValue={admin.billingContact.email} className={inputClass} /></label>
          </section>
          <section className="rounded-[2rem] bg-[#efe7ff] p-7 sm:p-9">
            <p className="eyebrow">Current plan</p>
            <h2 className="mt-5 text-xl font-bold">{admin.plan}</h2>
            <p className="font-display mt-5 text-3xl">{productConfig.prices.education}</p>
          </section>
          <section className="rounded-[2rem] bg-white p-7 sm:p-9 lg:col-span-2">
            <label className="text-sm font-bold">Wellbeing contact<input defaultValue={admin.wellbeingContact} className={inputClass} /></label>
            <p className="mt-3 text-xs text-black/45">Used by the Complete tier. Not active on the Education plan.</p>
          </section>
        </div>
      </div>
    </AdminPage>
  );
}

function BillingScreen({ teams }: { teams: Team[] }) {
  const [notice, setNotice] = useState(false);
  const [planState, setPlanState] = useState<"Trial" | "Active" | "Past due">("Active");
  const seasonTotal = teams.length * productConfig.prices.educationAmount;
  return (
    <AdminPage screen="billing">
      <div className={pageWrap}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <PageHeading eyebrow="Administrator portal" title="Billing" />
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-wider text-black/40 uppercase">Demo state</p>
            <div className="flex rounded-full bg-black/5 p-1">
              {(["Trial", "Active", "Past due"] as const).map((state) => (
                <button
                  key={state}
                  onClick={() => setPlanState(state)}
                  className={`rounded-full px-4 py-2 text-xs font-bold ${
                    planState === state ? "bg-white shadow-sm" : "text-black/50"
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>
        </div>
        {planState === "Trial" && (
          <p className="mt-7 rounded-2xl bg-[#eef4d4] p-5 text-sm font-bold">
            14 days left in your trial.
          </p>
        )}
        {planState === "Past due" && (
          <p className="mt-7 rounded-2xl bg-[#fff0eb] p-5 text-sm font-bold">
            Payment is past due. Update your payment method to keep access.
          </p>
        )}
        <section className="mt-10 grid gap-5 rounded-[2rem] bg-[#efe7ff] p-7 sm:grid-cols-3 sm:p-9">
          <div>
            <p className="text-[10px] font-bold tracking-wider text-black/40 uppercase">Current plan</p>
            <p className="mt-3 text-lg font-bold">{demoData.admin.plan}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-wider text-black/40 uppercase">Teams</p>
            <p className="font-display mt-3 text-4xl">{teams.length}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-wider text-black/40 uppercase">Season total</p>
            <p className="font-display mt-3 text-4xl">${seasonTotal}</p>
            <p className="mt-2 text-xs text-black/45">{productConfig.prices.education}</p>
          </div>
        </section>
        <section className="mt-5 overflow-hidden rounded-[2rem] bg-white">
          <div className="border-b border-black/10 p-7 sm:px-9">
            <h2 className="text-xl font-bold">Invoices</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-black/10 text-[10px] font-bold tracking-wider text-black/40 uppercase">
                  <th className="px-9 py-4">Date</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-9 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {demoData.admin.invoices.map((invoice) => (
                  <tr key={`${invoice.date}-${invoice.description}`} className="border-b border-black/5 last:border-0">
                    <td className="px-9 py-4 text-sm">{invoice.date}</td>
                    <td className="px-6 py-4 text-sm font-bold">{invoice.description}</td>
                    <td className="px-6 py-4 text-sm">{invoice.amount}</td>
                    <td className="px-9 py-4 text-right text-sm font-bold">{invoice.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {["Update payment method", "Download invoice"].map((label) => (
            <button
              key={label}
              onClick={() => setNotice(true)}
              className="rounded-full bg-[#171b19] px-6 py-3.5 text-sm font-bold text-white"
            >
              {label}
            </button>
          ))}
        </div>
        {notice && (
          <p role="status" className="mt-5 rounded-2xl bg-[#fff8df] p-5 text-sm font-bold">
            Available when the back end is connected.
          </p>
        )}
      </div>
    </AdminPage>
  );
}

export function AdminPortal({ path }: { path: string }) {
  const [teams, setTeams] = useState<Team[]>(() => {
    try {
      const saved = sessionStorage.getItem("team-institute-demo-teams");
      return saved ? (JSON.parse(saved) as Team[]) : [...demoData.admin.teams];
    } catch {
      return [...demoData.admin.teams];
    }
  });
  const addTeam = (team: Team) =>
    setTeams((current) => {
      const next = [...current, team];
      sessionStorage.setItem("team-institute-demo-teams", JSON.stringify(next));
      return next;
    });
  const detailMatch = path.match(/^\/portal\/admin\/teams\/([^/]+)$/);
  if (detailMatch) {
    const team = teams.find((item) => item.id === detailMatch[1]) ?? teams[0];
    return <TeamDetail team={team} />;
  }
  if (path === "/portal/admin/teams") return <TeamsScreen teams={teams} addTeam={addTeam} />;
  if (path === "/portal/admin/people") return <PeopleScreen teams={teams} />;
  if (path === "/portal/admin/reports") return <ReportsScreen teams={teams} />;
  if (path === "/portal/admin/settings") return <SettingsScreen />;
  if (path === "/portal/admin/billing") return <BillingScreen teams={teams} />;
  return <Overview teams={teams} />;
}
