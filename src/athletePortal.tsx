import { useState, type ReactNode } from "react";
import { productConfig } from "./config";
import { demoData } from "./demoData";
import { Brand, DemoBanner } from "./pages";

type AthleteScreen = "home" | "skills" | "skill" | "check-in" | "progress" | "help" | "privacy";

const athleteNav = [
  ["Home", "/portal/athlete"],
  ["Skills", "/portal/athlete/skills"],
  ["Check-in", "/portal/athlete/check-in"],
  ["Progress", "/portal/athlete/progress"],
] as const;

function AthleteHeader({ screen }: { screen: AthleteScreen }) {
  return (
    <header className="app-safe-top sticky top-0 z-30 border-b border-black/10 bg-[#f4f2eb]/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1000px] items-center justify-between gap-2 px-4 py-4 sm:px-8">
        <a href="/"><Brand /></a>
        <div className="flex items-center gap-2">
          <a href="/portal/athlete/help" className="min-h-11 rounded-full bg-[#d9ff54] px-4 py-3 text-xs font-bold">
            Need to talk?
          </a>
          <a
            href="/portal/account?role=athlete"
            aria-label="Account"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#17201d] text-xs font-bold text-white"
          >
            {demoData.athletePreview.firstName.slice(0, 1)}
          </a>
        </div>
      </div>
      <nav className="flex justify-start gap-1 overflow-x-auto border-t border-black/5 px-3 py-2 sm:justify-center">
        {athleteNav.map(([label, href]) => {
          const active =
            screen === "skill" ? href === "/portal/athlete/skills" : href.endsWith(screen === "home" ? "/athlete" : `/${screen}`);
          return (
            <a
              key={href}
              href={href}
              className={`min-h-11 shrink-0 rounded-full px-5 py-3 text-xs font-bold ${
                active ? "bg-white shadow-sm" : "text-black/45"
              }`}
            >
              {label}
            </a>
          );
        })}
      </nav>
      <div className="flex justify-start gap-1 overflow-x-auto border-t border-black/5 px-3 py-2">
        <a href="/portal?role=parent" className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-black/45">Parent</a>
        <a href="/portal?role=coach" className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-black/45">Coach</a>
        <span className="shrink-0 rounded-full bg-white px-3 py-2 text-xs font-bold shadow-sm">Athlete</span>
        <a href="/portal/admin" className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-black/45">Admin</a>
        <a href="/staff" className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-black/45">Staff</a>
      </div>
    </header>
  );
}

function PreviewBanner() {
  return (
    <div className="border-b border-black/10 bg-[#efe7ff] px-4 py-2 text-center text-xs font-bold text-black/60">
      Preview. The athlete experience is coming in 2027.
    </div>
  );
}

function AthletePage({
  screen,
  children,
  title,
}: {
  screen: AthleteScreen;
  children: ReactNode;
  title: string;
}) {
  document.title = `${title} | ${productConfig.name}`;
  return (
    <main className="min-h-screen bg-[#f4f2eb] text-[#171b19]">
      <AthleteHeader screen={screen} />
      <DemoBanner />
      <PreviewBanner />
      {children}
    </main>
  );
}

const athleteWrap = "mx-auto max-w-[900px] px-4 py-8 sm:px-8 lg:py-12";

function AthleteHome() {
  const athlete = demoData.athletePreview;
  return (
    <AthletePage screen="home" title="Athlete home">
      <div className={athleteWrap}>
        <p className="eyebrow">{athlete.team} · Age {athlete.age}</p>
        <h1 className="font-display mt-4 text-5xl tracking-[-0.04em]">Hi, {athlete.firstName}.</h1>
        <div className="mt-8 grid gap-4">
          <section className="rounded-[2rem] bg-[#d9ff54] p-7">
            <p className="eyebrow">Today&apos;s skill</p>
            <h2 className="font-display mt-5 text-4xl">{athlete.todaySkill.name}</h2>
            <div className="mt-7 flex items-center justify-between">
              <span className="text-sm font-bold">{athlete.todaySkill.duration}</span>
              <a href="/portal/athlete/skills/reset" className="min-h-12 rounded-full bg-[#171b19] px-7 py-3.5 text-sm font-bold text-white">Start</a>
            </div>
          </section>
          <section className="rounded-[2rem] bg-white p-7">
            <p className="eyebrow">This week&apos;s check-in</p>
            <a href="/portal/athlete/check-in" className="mt-7 inline-block min-h-12 rounded-full bg-[#171b19] px-7 py-3.5 text-sm font-bold text-white">Start check-in</a>
          </section>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-3xl bg-white p-6">
            <p className="text-[10px] font-bold tracking-wider text-black/40 uppercase">Streak</p>
            <p className="font-display mt-3 text-4xl">{athlete.streak}</p>
          </div>
          <div className="rounded-3xl bg-white p-6">
            <p className="text-[10px] font-bold tracking-wider text-black/40 uppercase">Skills completed</p>
            <p className="font-display mt-3 text-4xl">{athlete.skillsCompleted}</p>
          </div>
        </div>
        <a href="/portal/athlete/privacy" className="mt-8 inline-block text-sm font-bold underline underline-offset-4">
          Who can see my answers?
        </a>
      </div>
    </AthletePage>
  );
}

function AthleteSkills() {
  return (
    <AthletePage screen="skills" title="Skills">
      <div className={athleteWrap}>
        <p className="eyebrow">Athlete preview</p>
        <h1 className="font-display mt-4 text-5xl tracking-[-0.04em]">Skills</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {demoData.athletePreview.themes.map((theme, index) => (
            <a
              key={theme.name}
              href={index === 0 ? "/portal/athlete/skills/reset" : "/portal/athlete/skills"}
              className="flex min-h-32 items-center justify-between gap-5 rounded-[2rem] bg-white p-6"
            >
              <div>
                <h2 className="text-lg font-bold">{theme.name}</h2>
                <p className="mt-3 text-xs font-bold text-black/40">{theme.sessions} sessions</p>
              </div>
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                style={{ background: `conic-gradient(#171b19 ${theme.progress}%, #e7e5dd 0)` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xs font-bold">
                  {theme.progress}%
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </AthletePage>
  );
}

function AthleteSkillSession() {
  const [step, setStep] = useState(1);
  const done = step > 3;
  return (
    <AthletePage screen="skill" title="Skill session">
      <div className="mx-auto max-w-xl px-4 py-8 sm:px-8">
        {done ? (
          <section className="rounded-[2rem] bg-[#d9ff54] p-8 text-center">
            <h1 className="font-display text-5xl">Skill complete</h1>
            <a href="/portal/athlete" className="mt-8 inline-block min-h-14 rounded-full bg-[#171b19] px-8 py-4 text-base font-bold text-white">Back to Home</a>
          </section>
        ) : (
          <>
            <p className="text-sm font-bold">Step {step} of 3</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/10">
              <div className="h-full rounded-full bg-[#17201d]" style={{ width: `${(step / 3) * 100}%` }} />
            </div>
            <section className="mt-8 flex min-h-80 items-center rounded-[2rem] bg-white p-7">
              <div className="w-full rounded-2xl border-2 border-dashed border-black/20 p-8 text-center text-sm font-bold text-black/45">
                Session content in development with Dr. Fallon.
              </div>
            </section>
            <div className="mt-6 flex justify-between gap-3">
              <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="min-h-14 rounded-full border border-black/15 px-7 text-base font-bold disabled:opacity-30">Back</button>
              <button onClick={() => setStep(step + 1)} className="min-h-14 rounded-full bg-[#171b19] px-8 text-base font-bold text-white">Next</button>
            </div>
          </>
        )}
      </div>
    </AthletePage>
  );
}

function AthleteCheckIn() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<number | null>(null);
  const done = step > 6;
  const next = () => {
    setStep(step + 1);
    setSelected(null);
  };
  return (
    <AthletePage screen="check-in" title="Check-in">
      <div className="mx-auto max-w-xl px-4 py-8 sm:px-8">
        {done ? (
          <section className="rounded-[2rem] bg-white p-8 text-center">
            <h1 className="font-display text-5xl">Thanks for checking in.</h1>
            <a href="/portal/athlete" className="mt-8 inline-block min-h-14 rounded-full bg-[#171b19] px-8 py-4 text-base font-bold text-white">Back to Home</a>
          </section>
        ) : (
          <>
            <p className="text-sm font-bold">{step} of 6</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/10">
              <div className="h-full rounded-full bg-[#17201d]" style={{ width: `${(step / 6) * 100}%` }} />
            </div>
            <section className="mt-8 flex min-h-64 items-center rounded-[2rem] bg-white p-7">
              <div className="w-full rounded-2xl border-2 border-dashed border-black/20 p-8 text-center text-sm font-bold text-black/45">
                Check-in questions in development with Dr. Fallon.
              </div>
            </section>
            <div className="mt-6 grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setSelected(value)}
                  aria-label={`Response ${value}`}
                  className={`min-h-14 rounded-xl border-2 text-base font-bold ${
                    selected === value ? "border-[#17201d] bg-[#17201d] text-white" : "border-black/10 bg-white"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-between gap-3">
              <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="min-h-14 rounded-full border border-black/15 px-7 text-base font-bold disabled:opacity-30">Back</button>
              <button onClick={next} disabled={selected === null} className="min-h-14 rounded-full bg-[#171b19] px-8 text-base font-bold text-white disabled:opacity-30">Next</button>
            </div>
          </>
        )}
      </div>
    </AthletePage>
  );
}

function AthleteProgress() {
  const athlete = demoData.athletePreview;
  return (
    <AthletePage screen="progress" title="Progress">
      <div className={athleteWrap}>
        <p className="eyebrow">Athlete preview</p>
        <h1 className="font-display mt-4 text-5xl tracking-[-0.04em]">Progress</h1>
        <section className="mt-8 rounded-[2rem] bg-white p-7">
          <h2 className="text-xl font-bold">Skills completed by theme</h2>
          <div className="mt-7 space-y-6">
            {athlete.themes.map((theme) => (
              <div key={theme.name}>
                <div className="mb-2 flex justify-between gap-3 text-sm font-bold"><span>{theme.name}</span><span>{theme.progress}%</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-black/10"><div className="h-full rounded-full bg-[#17201d]" style={{ width: `${theme.progress}%` }} /></div>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-4 rounded-[2rem] bg-[#efe7ff] p-7">
          <h2 className="text-xl font-bold">Streak calendar</h2>
          <div className="mt-6 grid grid-cols-7 gap-2">
            {athlete.streakCalendar.map((day, index) => (
              <div key={`${day.day}-${index}`} className="text-center">
                <span className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${day.complete ? "bg-[#17201d] text-white" : "bg-white/70"}`}>{day.day}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AthletePage>
  );
}

function AthleteHelp() {
  const contact = demoData.athletePreview.wellbeingContact;
  return (
    <AthletePage screen="help" title="Need to talk?">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-8 lg:py-12">
        <h1 className="font-display text-5xl leading-[0.96] tracking-[-0.04em]">You do not have to handle this alone.</h1>
        <div className="mt-8 grid gap-4">
          {[
            ["Talk to someone now", "Call or text 988, any time, day or night."],
            ["Text instead", "Text HOME to 741741."],
            ["In danger right now", "Call 911."],
          ].map(([title, copy]) => (
            <div key={title} className="min-h-28 rounded-[2rem] bg-white p-6">
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="mt-2 text-base text-black/60">{copy}</p>
            </div>
          ))}
          <div className="rounded-[2rem] bg-[#d9ff54] p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold">Talk to an adult at your club or school</h2>
              <span className="shrink-0 rounded-full bg-white/70 px-3 py-2 text-[10px] font-bold uppercase">Sample contact</span>
            </div>
            <p className="mt-4 font-bold">{contact.name}</p>
            <p className="mt-1 text-sm text-black/55">{contact.role}</p>
          </div>
        </div>
        <p className="mt-7 text-xs text-black/45">This app is for learning skills. It is not an emergency service.</p>
      </div>
    </AthletePage>
  );
}

function AthletePrivacy() {
  const rows = [
    ["My skills progress", "Me, my parent or guardian, my coach"],
    ["My check-in answers", "Me and my parent or guardian"],
    ["Team averages", "My coach sees the team average only, never my answers"],
  ];
  return (
    <AthletePage screen="privacy" title="Who can see my answers?">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-8 lg:py-12">
        <h1 className="font-display text-5xl leading-[0.96] tracking-[-0.04em]">Who can see my answers?</h1>
        <div className="mt-8 overflow-hidden rounded-[2rem] bg-white">
          <table className="w-full border-collapse text-left">
            <tbody>
              {rows.map(([label, value]) => (
                <tr key={label} className="border-b border-black/10 last:border-0">
                  <th className="block px-6 pt-5 text-sm sm:table-cell sm:w-2/5 sm:py-6">{label}</th>
                  <td className="block px-6 pb-5 pt-2 text-sm leading-6 text-black/55 sm:table-cell sm:py-6">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-black/50">Draft. Final privacy rules are being reviewed.</p>
      </div>
    </AthletePage>
  );
}

export function AthletePortal({ path }: { path: string }) {
  if (path === "/portal/athlete/skills/reset") return <AthleteSkillSession />;
  if (path === "/portal/athlete/skills") return <AthleteSkills />;
  if (path === "/portal/athlete/check-in") return <AthleteCheckIn />;
  if (path === "/portal/athlete/progress") return <AthleteProgress />;
  if (path === "/portal/athlete/help") return <AthleteHelp />;
  if (path === "/portal/athlete/privacy") return <AthletePrivacy />;
  return <AthleteHome />;
}
