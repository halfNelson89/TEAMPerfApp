import { useState } from "react";
import { productConfig } from "./config";
import { demoData } from "./demoData";

type Role = "parent" | "coach";
type View = "home" | "portal";
type PortalPage = "overview" | "checkin" | "insights" | "learn" | "support";

const heroImage =
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1800&q=88";

const roleContent = {
  parent: {
    label: "Parent",
    title: "Raise the person, not just the player.",
    description:
      "Build the language, awareness, and confidence to support your athlete through pressure, setbacks, and growth.",
    accent: "#d9ff54",
  },
  coach: {
    label: "Coach",
    title: "Build teams that perform under pressure.",
    description:
      "Learn practical frameworks for trust, sustainable motivation, emotional regulation, and high-performance culture.",
    accent: "#f0a4ff",
  },
};

const Icon = ({
  name,
  className = "h-5 w-5",
}: {
  name:
    | "arrow"
    | "check"
    | "play"
    | "book"
    | "shield"
    | "chart"
    | "menu"
    | "close"
    | "back"
    | "clock";
  className?: string;
}) => {
  const paths = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    check: <path d="m5 12 4 4L19 6" />,
    play: <path d="m9 7 8 5-8 5V7Z" />,
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </>
    ),
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4" />,
    chart: <path d="M4 19V9m6 10V5m6 14v-7m4 7H2" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    back: <path d="m15 18-6-6 6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
};

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`flex items-center gap-2.5 text-left ${light ? "text-white" : "text-[#171b19]"}`}
      aria-label={`${productConfig.name} home`}
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-current">
        <span className="h-3.5 w-1 rotate-[28deg] rounded-full bg-current" />
      </span>
      <span className="text-[13px] font-bold leading-[0.95] tracking-[0.12em] uppercase">
        {productConfig.name}
      </span>
    </button>
  );
}

function DemoBanner() {
  return (
    <div className="border-b border-black/10 bg-[#fff8df] px-5 py-2 text-center text-xs font-medium text-black/60">
      Demo with sample data. Names and scores are examples.
    </div>
  );
}

export function CrisisPanel({ close }: { close: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crisis-resources-title"
    >
      <div className="w-full max-w-lg rounded-[2rem] bg-white p-7 shadow-2xl sm:p-9">
        <div className="flex items-center justify-between">
          <h2 id="crisis-resources-title" className="text-xl font-bold">
            Crisis resources
          </h2>
          <button onClick={close} aria-label="Close crisis resources">
            <Icon name="close" className="h-6 w-6" />
          </button>
        </div>
        <ul className="mt-7 space-y-4 text-sm leading-6 text-black/65">
          <li>If someone is in immediate danger, call 911.</li>
          <li>988 Suicide and Crisis Lifeline: call or text 988, 24 hours a day.</li>
          <li>Crisis Text Line: text HOME to 741741.</li>
          <li>
            These services are free and confidential. This portal is educational and is
            not an emergency service.
          </li>
        </ul>
      </div>
    </div>
  );
}

function PortalFooter({ openCrisis }: { openCrisis: () => void }) {
  return (
    <footer className="border-t border-black/10 px-5 py-5 sm:px-9">
      <div className="mx-auto flex max-w-[1328px] justify-end">
        <button onClick={openCrisis} className="text-xs font-bold text-black/50">
          Crisis resources
        </button>
      </div>
    </footer>
  );
}

function Home({
  openPortal,
}: {
  openPortal: (role: Role) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="overflow-hidden bg-[#f4f2eb] text-[#171b19]">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-9 lg:px-14">
          <Brand light />
          <nav className="hidden items-center gap-6 text-sm font-medium text-white/85 xl:flex">
            {productConfig.publicNavigation.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => openPortal("parent")}
            className="hidden rounded-full bg-[#d9ff54] px-5 py-3 text-sm font-bold text-[#171b19] transition hover:scale-[1.03] xl:block"
          >
            Enter portal
          </button>
          <button
            className="text-white xl:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <Icon name={menuOpen ? "close" : "menu"} className="h-7 w-7" />
          </button>
        </div>
        {menuOpen && (
          <div className="mx-5 rounded-2xl bg-[#171b19] p-5 text-white shadow-2xl xl:hidden">
            <div className="grid gap-1">
              {productConfig.publicNavigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-left font-medium hover:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => openPortal("parent")}
                className="mt-3 rounded-full bg-[#d9ff54] px-5 py-3 font-bold text-[#171b19]"
              >
                Enter portal
              </button>
            </div>
          </div>
        )}
      </header>

      <section className="relative min-h-[760px] bg-[#202b27] lg:min-h-[820px]">
        <img
          src={heroImage}
          alt="Athlete running on a track at golden hour"
          className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,22,19,.92)_0%,rgba(13,22,19,.72)_40%,rgba(13,22,19,.08)_78%),linear-gradient(0deg,rgba(13,22,19,.55)_0%,transparent_45%)]" />
        <div className="relative mx-auto flex min-h-[760px] max-w-[1440px] items-end px-5 pb-20 pt-36 sm:px-9 lg:min-h-[820px] lg:items-center lg:px-14 lg:pb-0">
          <div className="max-w-3xl text-white">
            <div className="mb-6 flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-[#d9ff54] uppercase">
              <span className="h-px w-8 bg-current" />
              Mental performance education
            </div>
            <h1 className="font-display max-w-[820px] text-[clamp(3.3rem,7.5vw,7.2rem)] leading-[0.88] tracking-[-0.055em]">
              The mind behind
              <br />
              <span className="text-[#d9ff54] italic">the performance.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/78 sm:text-lg">
              Practical, science-led training for the parents and coaches shaping
              resilient, healthy, high-performing young athletes.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollTo("pathways")}
                className="group flex items-center justify-center gap-3 rounded-full bg-[#d9ff54] px-7 py-4 text-sm font-bold text-[#171b19] transition hover:scale-[1.02]"
              >
                Find your pathway
                <Icon name="arrow" className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo("mission")}
                className="rounded-full border border-white/40 px-7 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#171b19]"
              >
                Why this matters
              </button>
              <a
                href="/organizations"
                className="rounded-full border border-white/40 px-7 py-4 text-center text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#171b19]"
              >
                For schools and clubs
              </a>
            </div>
          </div>
          <div className="absolute right-9 bottom-9 hidden items-center gap-3 text-xs text-white/70 lg:flex">
            <span className="h-px w-16 bg-white/40" />
            Scroll to explore
          </div>
        </div>
      </section>

      <section id="method" className="px-5 py-24 sm:px-9 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1328px]">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="eyebrow">The {productConfig.name} method</p>
              <h2 className="font-display mt-5 text-5xl leading-[0.96] tracking-[-0.04em] sm:text-6xl">
                Train the whole
                <br />
                <span className="italic text-[#66706b]">human.</span>
              </h2>
            </div>
            <div className="lg:pt-7">
              <p className="max-w-2xl text-xl leading-8 text-[#525955] sm:text-2xl sm:leading-9">
                Talent can open a door. The right support helps an athlete walk
                through it—and stay well on the other side.
              </p>
              <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-[#cecfc7] sm:grid-cols-3">
                {[
                  ["01", "Recognize", "Spot shifts in mood, motivation, and behavior before they become a crisis."],
                  ["02", "Respond", "Use language that builds trust, autonomy, and emotional safety."],
                  ["03", "Reinforce", "Create habits and environments where healthy performance can last."],
                ].map(([number, title, copy]) => (
                  <div key={number} className="bg-[#f4f2eb] p-7 lg:p-8">
                    <span className="text-xs font-bold text-[#7b827e]">{number}</span>
                    <h3 className="mt-12 text-xl font-bold">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#656c68]">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pathways" className="bg-[#17201d] px-5 py-24 text-white sm:px-9 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1328px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-[#d9ff54]">Choose your pathway</p>
              <h2 className="font-display mt-5 text-5xl leading-none tracking-[-0.04em] sm:text-6xl">
                One team. Two roles.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/60">
              Separate learning experiences, designed around the moments and
              decisions unique to your role.
            </p>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {(["parent", "coach"] as Role[]).map((role, index) => {
              const item = roleContent[role];
              return (
                <button
                  key={role}
                  onClick={() => openPortal(role)}
                  className="pathway-card group relative min-h-[430px] overflow-hidden rounded-[2rem] p-8 text-left sm:p-11"
                  style={{ backgroundColor: index === 0 ? "#d9ff54" : "#f0a4ff" }}
                >
                  <div className="flex h-full flex-col justify-between text-[#171b19]">
                    <div className="flex items-start justify-between">
                      <span className="rounded-full border border-black/20 px-4 py-2 text-xs font-bold tracking-wider uppercase">
                        {item.label} portal
                      </span>
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#171b19] text-white transition duration-300 group-hover:rotate-[-35deg] group-hover:scale-110">
                        <Icon name="arrow" />
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display max-w-lg text-4xl leading-[0.98] tracking-[-0.04em] sm:text-5xl">
                        {item.title}
                      </h3>
                      <p className="mt-5 max-w-md text-sm leading-6 text-black/65">
                        {item.description}
                      </p>
                      <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold">
                        Explore the {role} experience
                        <Icon name="arrow" className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="mission" className="relative bg-[#d9ff54] px-5 py-24 sm:px-9 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1328px]">
          <div className="grid items-end gap-12 lg:grid-cols-[1.35fr_0.65fr]">
            <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.055em]">
              Better support creates
              <br />
              <span className="italic">braver athletes.</span>
            </h2>
            <div>
              <p className="text-base leading-7 text-black/65">
                We&apos;re 100% committed to raising the next generation of elite,
                high-performing humans—capable on the field and grounded beyond it.
              </p>
              <button
                onClick={() => openPortal("parent")}
                className="mt-7 flex items-center gap-3 rounded-full bg-[#171b19] px-6 py-4 text-sm font-bold text-white transition hover:scale-[1.03]"
              >
                Start learning <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f2eb] px-5 py-16 sm:px-9 lg:px-14">
        <div className="mx-auto max-w-[1328px]">
          <h2 className="font-display text-4xl tracking-[-0.03em]">Who built this</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-black/65">
            {productConfig.name} was created by Dr. Corrine Fallon, Licensed
            Psychologist, Pennsylvania license PS018778.
          </p>
          <a href="/about" className="mt-5 inline-block text-sm font-bold underline underline-offset-4">
            About Dr. Fallon
          </a>
        </div>
      </section>

      <footer className="bg-[#171b19] px-5 py-10 text-white sm:px-9 lg:px-14">
        <div className="mx-auto flex max-w-[1328px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Brand light />
          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-white/65">
            {productConfig.publicNavigation.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
            <a href="/verify">Verify a certificate</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}

const checkInQuestions = [
  {
    category: "Mood",
    prompt: "How have you been feeling in yourself this week?",
    followUp: "What was one moment you felt most like yourself?",
    low: "Really low",
    high: "Really good",
  },
  {
    category: "Energy",
    prompt: "How has your energy felt, both in sport and away from it?",
    followUp: "When did you notice your energy dip or lift?",
    low: "Exhausted",
    high: "Energized",
  },
  {
    category: "Enjoyment",
    prompt: "How much have you enjoyed training and competing this week?",
    followUp: "Was there anything that made your sport feel less fun?",
    low: "Not at all",
    high: "A lot",
  },
  {
    category: "Pressure",
    prompt: "How much pressure have you felt to perform or get things right?",
    followUp: "Where do you think most of that pressure is coming from?",
    low: "Overwhelming",
    high: "Manageable",
  },
  {
    category: "Connection",
    prompt: "How supported and understood have you felt by the people around you?",
    followUp: "Who has felt easiest to talk to this week?",
    low: "Alone",
    high: "Well supported",
  },
  {
    category: "Recovery",
    prompt: "How well have you been sleeping and recovering?",
    followUp: "Is anything making it hard to switch off or rest?",
    low: "Very poorly",
    high: "Very well",
  },
];

function WeeklyCheckIn({
  role,
  onExit,
  onComplete,
}: {
  role: Role;
  onExit: () => void;
  onComplete: () => void;
}) {
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [note, setNote] = useState("");
  const [finished, setFinished] = useState(false);
  const current = checkInQuestions[question];
  const selected = answers[question];

  const selectAnswer = (value: number) => {
    const next = [...answers];
    next[question] = value;
    setAnswers(next);
  };

  const continueCheckIn = () => {
    if (question < checkInQuestions.length - 1) {
      setQuestion(question + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const score = Math.round(
      (answers.reduce((total, answer) => total + answer, 0) / (answers.length * 5)) * 100,
    );
    const needsAttention = answers
      .map((answer, index) => ({ answer, category: checkInQuestions[index].category }))
      .filter(({ answer }) => answer <= 2);

    return (
      <div className="mx-auto max-w-[920px] px-5 py-10 sm:px-9 lg:py-16">
        <button onClick={onExit} className="flex items-center gap-2 text-sm font-bold text-black/55">
          <Icon name="back" className="h-5 w-5" /> Exit check-in
        </button>
        <div className="mt-10 overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_70px_rgba(24,32,29,.08)]">
          <div className="bg-[#17201d] p-8 text-white sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d9ff54] text-[#17201d]">
              <Icon name="check" className="h-7 w-7" />
            </div>
            <p className="eyebrow mt-8 text-[#d9ff54]">Check-in complete</p>
            <h1 className="font-display mt-4 text-5xl tracking-[-0.04em]">
              Thank you for listening.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">
              {demoData.athlete.firstName}&apos;s responses have been added to her weekly wellbeing record.
              Consistent, calm conversations are more valuable than any single score.
            </p>
          </div>
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[0.65fr_1.35fr]">
            <div className="rounded-3xl bg-[#f4f2eb] p-7 text-center">
              <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-[#d9ff54] bg-white">
                <div>
                  <span className="font-display text-5xl">{score}</span>
                  <span className="text-sm text-black/40">/100</span>
                </div>
              </div>
              <p className="mt-5 text-sm font-bold">Weekly wellbeing pulse</p>
              <p className="mt-1 text-xs leading-5 text-black/45">A conversation aid, not a clinical score</p>
            </div>
            <div>
              <p className="eyebrow">What to notice</p>
              <h2 className="mt-3 text-2xl font-bold">
                {needsAttention.length > 0
                  ? "A few areas may need extra care."
                  : "Responses look steady this week."}
              </h2>
              <p className="mt-3 text-sm leading-6 text-black/55">
                {needsAttention.length > 0
                  ? `${demoData.athlete.firstName} reported lower responses around ${needsAttention
                      .map((item) => item.category.toLowerCase())
                      .join(" and ")}. Keep the conversation open and check in again soon.`
                  : "Continue making space for honest conversations, especially after high-pressure moments."}
              </p>
              <div className="mt-6 rounded-2xl border border-[#e3c363] bg-[#fff8df] p-5">
                <p className="text-xs font-bold uppercase tracking-wider">Important</p>
                <p className="mt-2 text-xs leading-5 text-black/60">
                  This check-in does not diagnose mental health conditions. If {demoData.athlete.firstName}
                  mentions self-harm, feeling unsafe, or being unable to cope, contact
                  a qualified professional or local emergency support immediately.
                </p>
              </div>
              <button
                onClick={onComplete}
                className="mt-7 flex items-center gap-3 rounded-full bg-[#171b19] px-6 py-3.5 text-sm font-bold text-white"
              >
                View wellbeing insights <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)] flex-col">
      <div className="h-1 bg-black/10">
        <div
          className="h-full bg-[#17201d] transition-all duration-500"
          style={{ width: `${((question + 1) / checkInQuestions.length) * 100}%` }}
        />
      </div>
      <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col px-5 py-8 sm:px-9 lg:py-12">
        <div className="flex items-center justify-between">
          <button onClick={onExit} className="flex items-center gap-2 text-sm font-bold text-black/55">
            <Icon name="back" className="h-5 w-5" /> Save and exit
          </button>
          <span className="text-xs font-bold text-black/45">
            {question + 1} of {checkInQuestions.length}
          </span>
        </div>
        <div className="mt-10 grid flex-1 items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="rounded-[2rem] bg-[#17201d] p-7 text-white sm:p-9">
            <p className="eyebrow text-[#d9ff54]">Before you ask</p>
            <h2 className="font-display mt-5 text-3xl leading-tight">
              Make this feel like a conversation, not an assessment.
            </h2>
            <div className="mt-8 space-y-5">
              {[
                "Find a calm, private moment.",
                "Use the question in your own words.",
                "Listen fully before responding.",
                "Report what they said—not what you hoped to hear.",
              ].map((tip) => (
                <div key={tip} className="flex gap-3 text-sm leading-6 text-white/65">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d9ff54] text-[#17201d]">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  {tip}
                </div>
              ))}
            </div>
            <p className="mt-10 border-t border-white/10 pt-6 text-xs leading-5 text-white/40">
              {role === "coach"
                ? "For coaches: keep responses private and follow your organization’s safeguarding policy."
                : "For parents: reassurance and curiosity will usually invite more honesty than advice."}
            </p>
          </aside>
          <section className="rounded-[2rem] bg-white p-7 shadow-[0_15px_60px_rgba(24,32,29,.06)] sm:p-10 lg:p-12">
            <p className="eyebrow text-black/40">{current.category}</p>
            <div className="mt-5 rounded-2xl bg-[#eef4d4] px-5 py-4">
              <p className="text-[10px] font-bold tracking-wider text-black/45 uppercase">
                Ask {demoData.athlete.firstName}
              </p>
              <h1 className="mt-2 text-2xl font-bold leading-8 sm:text-3xl sm:leading-10">
                “{current.prompt}”
              </h1>
            </div>
            <p className="mt-7 text-xs font-bold tracking-wider text-black/45 uppercase">
              Report their answer
            </p>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => selectAnswer(value)}
                  className={`flex h-14 items-center justify-center rounded-xl border text-base font-bold transition sm:h-16 ${
                    selected === value
                      ? "border-[#17201d] bg-[#17201d] text-white"
                      : "border-black/10 bg-[#f7f6f1] hover:border-black/40"
                  }`}
                  aria-label={`Response ${value} out of 5`}
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] font-medium text-black/40">
              <span>{current.low}</span>
              <span>{current.high}</span>
            </div>
            <details className="mt-7 rounded-2xl border border-black/10 p-4">
              <summary className="cursor-pointer text-sm font-bold">Need a gentle follow-up?</summary>
              <p className="mt-3 text-sm leading-6 text-black/55">Try: “{current.followUp}”</p>
            </details>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Optional private note…"
              className="mt-4 min-h-20 w-full resize-none rounded-2xl border border-black/10 bg-[#f7f6f1] p-4 text-sm outline-none transition focus:border-black/40"
            />
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setQuestion(Math.max(0, question - 1))}
                className={`text-sm font-bold ${question === 0 ? "invisible" : ""}`}
              >
                Previous
              </button>
              <button
                disabled={!selected}
                onClick={continueCheckIn}
                className="flex items-center gap-3 rounded-full bg-[#171b19] px-6 py-3.5 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-30"
              >
                {question === checkInQuestions.length - 1 ? "Finish check-in" : "Next question"}
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function WellbeingInsights({ startCheckIn }: { startCheckIn: () => void }) {
  const weeks = demoData.wellbeingHistory;
  return (
    <div className="mx-auto max-w-[1328px] px-5 py-10 sm:px-9 lg:py-14">
      <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow">Athlete wellbeing</p>
          <h1 className="font-display mt-4 text-5xl tracking-[-0.04em] sm:text-6xl">
            {demoData.athlete.firstName}&apos;s weekly pulse
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-black/50">
            Look for meaningful changes over time—not perfect scores from week to week.
          </p>
        </div>
        <button
          onClick={startCheckIn}
          className="flex items-center justify-center gap-3 rounded-full bg-[#171b19] px-6 py-4 text-sm font-bold text-white"
        >
          Start this week&apos;s check-in <Icon name="arrow" className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="rounded-[2rem] bg-white p-7 sm:p-9">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold">Six-week wellbeing trend</p>
              <p className="mt-1 text-xs text-black/40">Based on weekly conversations</p>
            </div>
            <span className="rounded-full bg-[#eef4d4] px-3 py-1.5 text-xs font-bold">Steady</span>
          </div>
          <div className="mt-10 flex h-56 items-end gap-3 sm:gap-6">
            {weeks.map(([week, value]) => (
              <div key={week} className="flex h-full flex-1 flex-col justify-end">
                <span className="mb-2 text-center text-xs font-bold">{value}</span>
                <div
                  className="rounded-t-xl bg-[#d9ff54] transition hover:bg-[#c8ee43]"
                  style={{ height: `${value}%` }}
                />
                <span className="mt-3 truncate text-center text-[9px] font-medium text-black/40 sm:text-[10px]">
                  {week}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-[2rem] bg-[#17201d] p-7 text-white sm:p-9">
          <p className="eyebrow text-[#d9ff54]">This week</p>
          <div className="mt-7 space-y-6">
            {[
              ["Connection", "Strong", "bg-[#d9ff54]"],
              ["Mood", "Steady", "bg-[#d9ff54]"],
              ["Recovery", "Watch", "bg-[#f4c66a]"],
            ].map(([label, status, color]) => (
              <div key={label} className="flex items-center justify-between border-b border-white/10 pb-5">
                <span className="text-sm text-white/65">{label}</span>
                <span className="flex items-center gap-2 text-xs font-bold">
                  <span className={`h-2 w-2 rounded-full ${color}`} /> {status}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-7 text-xs leading-5 text-white/45">
            Recovery has declined for two weeks. Consider asking about sleep, training
            load, and what is making it hard to switch off.
          </p>
        </section>
      </div>

      <section className="mt-5 rounded-[2rem] bg-[#efe7ff] p-7 sm:p-9">
        <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Suggested conversation</p>
            <h2 className="font-display mt-4 text-3xl">Check in on recovery.</h2>
          </div>
          <div>
            <p className="text-lg font-bold leading-7">
              “I&apos;ve noticed it&apos;s been harder to recharge lately. How have you
              been sleeping, and is there anything on your mind at night?”
            </p>
            <p className="mt-4 text-sm leading-6 text-black/50">
              Ask at a neutral time—not immediately before or after training.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function LearnHub({ role }: { role: Role }) {
  return (
    <div className="mx-auto max-w-[1328px] px-5 py-10 sm:px-9 lg:py-14">
      <div>
        <p className="eyebrow">{roleContent[role].label} learning pathway</p>
        <h1 className="font-display mt-4 text-5xl tracking-[-0.04em] sm:text-6xl">
          Build skill, one step at a time.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-black/50">
          Complete short lessons, practice through games, then use each skill in real life.
        </p>
      </div>
      <iframe
        key={role}
        src={`/fallon-course-player.html?role=${role}&embedded=1`}
        title={`${roleContent[role].label} course player`}
        className="mt-10 min-h-[1100px] w-full border-0"
      />
    </div>
  );
}

function SupportHub({ openCrisis }: { openCrisis: () => void }) {
  return (
    <div className="mx-auto max-w-[1120px] px-5 py-10 sm:px-9 lg:py-14">
      <p className="eyebrow">Support & safeguarding</p>
      <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">
        Know when listening needs to become action.
      </h1>
      <p className="mt-5 max-w-2xl text-sm leading-6 text-black/50">
        Practical guidance for recognizing concerning changes, responding calmly, and
        connecting an athlete with qualified support.
      </p>

      <section className="mt-12 grid gap-5 lg:grid-cols-3">
        {[
          ["Notice a pattern", "Look for persistent changes in mood, sleep, enjoyment, connection, or ability to cope—not one difficult day."],
          ["Ask directly", "Use calm, plain language. Asking about safety or self-harm does not put the idea into someone’s head."],
          ["Connect support", "Involve a qualified mental health professional and follow organizational safeguarding procedures."],
        ].map(([title, copy], index) => (
          <div key={title} className="rounded-3xl bg-white p-7">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef0e9] text-sm font-bold">
              {index + 1}
            </span>
            <h2 className="mt-8 text-xl font-bold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-black/50">{copy}</p>
          </div>
        ))}
      </section>

      <section className="mt-5 rounded-[2rem] border border-[#e6c660] bg-[#fff8df] p-7 sm:p-9">
        <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Immediate concern</p>
            <h2 className="font-display mt-4 text-3xl">If an athlete may be unsafe</h2>
          </div>
          <div>
            <p className="text-sm font-bold leading-6">
              Stay with them, listen without judgment, remove immediate dangers where
              safe to do so, and contact local emergency or crisis support.
            </p>
            <p className="mt-4 text-xs leading-5 text-black/50">
              This portal is educational and is not an emergency service or a substitute
              for care from a qualified mental health professional.
            </p>
            <button
              onClick={openCrisis}
              className="mt-6 rounded-full bg-[#171b19] px-6 py-3.5 text-sm font-bold text-white"
            >
              View crisis and professional resources
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function CoachHome({
  openLearn,
  changeRole,
}: {
  openLearn: () => void;
  changeRole: (role: Role) => void;
}) {
  const team = demoData.team;
  const course = demoData.courses.coach;

  return (
    <div className="mx-auto max-w-[1328px] px-5 py-10 sm:px-9 lg:py-14">
      <div className="mb-8 flex sm:hidden">
        <div className="flex rounded-full bg-black/5 p-1">
          {(["parent", "coach"] as Role[]).map((item) => (
            <button
              key={item}
              onClick={() => changeRole(item)}
              className={`rounded-full px-4 py-2 text-xs font-bold capitalize ${
                item === "coach" ? "bg-white shadow-sm" : "text-black/50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow">Coach portal</p>
        <h1 className="font-display mt-4 text-5xl leading-none tracking-[-0.04em] sm:text-6xl">
          {team.name}
        </h1>
      </div>

      <section className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] bg-white p-7 sm:p-9">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="eyebrow">Team completion</p>
              <h2 className="font-display mt-4 text-4xl tracking-[-0.03em]">
                {team.completion.percent}% complete
              </h2>
            </div>
            <span className="rounded-full bg-[#eef4d4] px-3 py-2 text-xs font-bold">
              {team.completion.parentsComplete + team.completion.coachesComplete} of{" "}
              {team.completion.parentsTotal + team.completion.coachesTotal}
            </span>
          </div>
          <div className="mt-8 h-2 overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-[#17201d]"
              style={{ width: `${team.completion.percent}%` }}
            />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[#f4f2eb] p-5">
              <p className="text-[10px] font-bold tracking-wider text-black/40 uppercase">
                Parents
              </p>
              <p className="mt-2 text-xl font-bold">
                {team.completion.parentsComplete} of {team.completion.parentsTotal}
              </p>
            </div>
            <div className="rounded-2xl bg-[#f4f2eb] p-5">
              <p className="text-[10px] font-bold tracking-wider text-black/40 uppercase">
                Coaches
              </p>
              <p className="mt-2 text-xl font-bold">
                {team.completion.coachesComplete} of {team.completion.coachesTotal}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#efe7ff] p-7 sm:p-9">
          <p className="eyebrow">Your course progress</p>
          <h2 className="mt-6 text-xl font-bold leading-7">{course.title}</h2>
          <div className="mt-8 flex items-end justify-between">
            <span className="font-display text-5xl">{course.progress}%</span>
            <span className="rounded-full bg-white/70 px-3 py-2 text-xs font-bold">
              {course.status}
            </span>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-[#17201d]"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <button
            onClick={openLearn}
            className="mt-7 flex items-center gap-2 text-sm font-bold"
          >
            Continue course <Icon name="arrow" className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="mt-5 overflow-hidden rounded-[2rem] bg-white">
        <div className="border-b border-black/10 p-7 sm:px-9">
          <p className="eyebrow">Team roster</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="border-b border-black/10 text-[10px] font-bold tracking-wider text-black/40 uppercase">
                <th className="px-9 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Course status</th>
                <th className="px-9 py-4 text-right">Completion date</th>
              </tr>
            </thead>
            <tbody>
              {team.roster.map((person) => (
                <tr key={person.name} className="border-b border-black/5 last:border-0">
                  <td className="px-9 py-4 text-sm font-bold">{person.name}</td>
                  <td className="px-6 py-4 text-sm text-black/55">{person.role}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-[#f4f2eb] px-3 py-1.5 text-xs font-bold">
                      {person.status}
                    </span>
                  </td>
                  <td className="px-9 py-4 text-right text-sm text-black/45">
                    {person.completed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-5 rounded-[2rem] bg-[#17201d] p-7 text-white sm:p-9">
        <p className="eyebrow text-[#d9ff54]">Team pulse</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-5">
          {team.pulse.map(([area, average]) => (
            <div key={area} className="rounded-2xl border border-white/10 p-5">
              <p className="text-xs text-white/50">{area}</p>
              <p className="font-display mt-2 text-4xl">{average}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-white/45">
          Team average. Individual check-ins are private to each family.
        </p>
      </section>
    </div>
  );
}

function Portal({
  role,
  setRole,
  goHome,
}: {
  role: Role;
  setRole: (role: Role) => void;
  goHome: () => void;
}) {
  const content = roleContent[role];
  const [page, setPage] = useState<PortalPage>("overview");
  const [crisisOpen, setCrisisOpen] = useState(false);
  const changeRole = (nextRole: Role) => {
    setRole(nextRole);
    setPage("overview");
  };

  if (role === "parent" && page === "checkin") {
    return (
      <main className="min-h-screen bg-[#f4f2eb] text-[#171b19]">
        <PortalHeader role={role} setRole={changeRole} goHome={goHome} page={page} setPage={setPage} />
        <DemoBanner />
        <WeeklyCheckIn
          role={role}
          onExit={() => setPage("overview")}
          onComplete={() => setPage("insights")}
        />
        <PortalFooter openCrisis={() => setCrisisOpen(true)} />
        {crisisOpen && <CrisisPanel close={() => setCrisisOpen(false)} />}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f2eb] text-[#171b19]">
      <PortalHeader role={role} setRole={changeRole} goHome={goHome} page={page} setPage={setPage} />
      <DemoBanner />

      {role === "parent" && page === "insights" ? (
        <WellbeingInsights startCheckIn={() => setPage("checkin")} />
      ) : page === "learn" ? (
        <LearnHub role={role} />
      ) : page === "support" ? (
        <SupportHub openCrisis={() => setCrisisOpen(true)} />
      ) : role === "coach" ? (
        <CoachHome openLearn={() => setPage("learn")} changeRole={changeRole} />
      ) : (
      <div className="mx-auto max-w-[1328px] px-5 py-10 sm:px-9 lg:py-14">
        <div className="mb-8 flex sm:hidden">
          <div className="flex rounded-full bg-black/5 p-1">
            {(["parent", "coach"] as Role[]).map((item) => (
              <button
                key={item}
                onClick={() => changeRole(item)}
                className={`rounded-full px-4 py-2 text-xs font-bold capitalize ${
                  role === item ? "bg-white shadow-sm" : "text-black/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">{content.label} mental fitness portal</p>
            <h1 className="font-display mt-4 text-5xl leading-none tracking-[-0.04em] sm:text-6xl">
              Good morning, {demoData.mentor.firstName}.
            </h1>
            <p className="mt-4 text-sm text-[#686f6b]">
              Here&apos;s what to notice, ask, and practice today.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_1px_0_rgba(0,0,0,.06)]">
              <p className="text-[10px] font-bold tracking-wider text-black/45 uppercase">Week streak</p>
              <p className="mt-1 text-xl font-bold">{demoData.overview.weeklyStreak}</p>
            </div>
            <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_1px_0_rgba(0,0,0,.06)]">
              <p className="text-[10px] font-bold tracking-wider text-black/45 uppercase">Completed</p>
              <p className="mt-1 text-xl font-bold">{demoData.overview.lessonsCompleted}</p>
            </div>
          </div>
        </div>

        <section className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[2rem] bg-[#17201d] p-7 text-white sm:p-9">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="eyebrow text-[#d9ff54]">
                  {demoData.athlete.firstName}&apos;s weekly pulse
                </p>
                <h2 className="font-display mt-4 text-4xl tracking-[-0.035em]">Steady</h2>
                <p className="mt-2 text-sm text-white/50">
                  Updated {demoData.overview.pulseUpdated}
                </p>
              </div>
              <button
                onClick={() => setPage("insights")}
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-white/75"
              >
                View trends
              </button>
            </div>
            <div className="mt-8 grid items-center gap-8 sm:grid-cols-[180px_1fr]">
              <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-white/10">
                <div className="absolute inset-[-12px] rotate-45 rounded-full border-[12px] border-transparent border-r-[#d9ff54] border-b-[#d9ff54]" />
                <div className="text-center">
                  <span className="font-display text-5xl">{demoData.overview.pulseScore}</span>
                  <p className="text-[9px] font-bold tracking-wider text-white/40 uppercase">of 100</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  ["Mood", "Steady", "bg-[#d9ff54]"],
                  ["Enjoyment", "Improving", "bg-[#d9ff54]"],
                  ["Pressure", "Elevated", "bg-[#f4c66a]"],
                  ["Recovery", "Declining", "bg-[#f4c66a]"],
                  ["Connection", "Strong", "bg-[#d9ff54]"],
                ].map(([label, status, color]) => (
                  <div key={label} className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs text-white/50">{label}</span>
                    <span className="flex items-center gap-2 text-xs font-bold">
                      <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2rem] bg-[#d9ff54] p-7">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Recommended next action</p>
                <span className="rounded-full bg-black/10 px-3 py-1.5 text-[10px] font-bold">2 min</span>
              </div>
              <h2 className="font-display mt-6 text-3xl leading-tight">
                Check in on recovery, not performance.
              </h2>
              <p className="mt-3 text-sm leading-6 text-black/60">
                Recovery has declined for two weeks. Ask about sleep, training load,
                and what is making it hard to switch off.
              </p>
              <button
                onClick={() => setPage("checkin")}
                className="mt-6 flex items-center gap-2 text-sm font-bold"
              >
                Start guided conversation <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => setPage("learn")}
              className="group rounded-[2rem] bg-[#efe7ff] p-7 text-left"
            >
              <p className="eyebrow">Today&apos;s mental training · 5 min</p>
              <div className="mt-5 flex items-end justify-between gap-5">
                <h2 className="text-xl font-bold leading-6">
                  Respond without trying to immediately fix it.
                </h2>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#171b19] text-white transition group-hover:scale-110">
                  <Icon name="play" className="h-4 w-4" />
                </span>
              </div>
            </button>
          </div>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] bg-white p-7 sm:p-9">
            <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#f4c66a]" />
                  <p className="eyebrow">Weekly wellbeing check-in</p>
                </div>
                <h2 className="font-display mt-5 text-4xl tracking-[-0.035em]">
                  Make space to hear how {demoData.athlete.firstName} is really doing.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-6 text-black/50">
                  A six-question guided conversation covering mood, energy, enjoyment,
                  pressure, connection, and recovery.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-[#fff3ca] px-3 py-2 text-[10px] font-bold tracking-wider uppercase">
                Due today
              </span>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setPage("checkin")}
                className="flex items-center justify-center gap-3 rounded-full bg-[#171b19] px-6 py-3.5 text-sm font-bold text-white"
              >
                Start weekly check-in <Icon name="arrow" className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage("insights")}
                className="rounded-full border border-black/15 px-6 py-3.5 text-sm font-bold"
              >
                View wellbeing history
              </button>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-7 sm:p-9">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Recent context</p>
              <button onClick={() => setPage("insights")} className="text-xs font-bold">View timeline</button>
            </div>
            <div className="mt-7 space-y-5">
              {demoData.recentContext.map(([date, event, color]) => (
                <div key={event} className="flex gap-4">
                  <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${color}`} />
                  <div>
                    <p className="text-sm font-bold">{event}</p>
                    <p className="mt-1 text-[10px] font-bold tracking-wider text-black/35 uppercase">{date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Continue building your skills</p>
              <h2 className="font-display mt-3 text-4xl tracking-[-0.03em]">Your training</h2>
            </div>
            <button onClick={() => setPage("learn")} className="text-xs font-bold">View academy</button>
          </div>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            <button
              onClick={() => setPage("learn")}
              className="group rounded-3xl border border-black/10 bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef0e9] text-sm font-bold">
                  1
                </span>
                <span className="text-xs font-bold text-black/45">
                  {demoData.courses.parent.progress}%
                </span>
              </div>
              <h3 className="mt-10 text-xl font-bold leading-6">
                {demoData.courses.parent.title}
              </h3>
              <div className="mt-7 h-1 overflow-hidden rounded-full bg-black/10">
                <div
                  className="h-full rounded-full bg-[#17201d]"
                  style={{ width: `${demoData.courses.parent.progress}%` }}
                />
              </div>
            </button>
          </div>
        </section>
      </div>
      )}
      <PortalFooter openCrisis={() => setCrisisOpen(true)} />
      {crisisOpen && <CrisisPanel close={() => setCrisisOpen(false)} />}
    </main>
  );
}

function PortalHeader({
  role,
  setRole,
  goHome,
  page,
  setPage,
}: {
  role: Role;
  setRole: (role: Role) => void;
  goHome: () => void;
  page: PortalPage;
  setPage: (page: PortalPage) => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-[#f4f2eb]/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1328px] items-center justify-between px-5 py-4 sm:px-9">
        <div onClick={goHome}>
          <Brand />
        </div>
        <nav className="hidden items-center gap-1 rounded-full bg-black/5 p-1 lg:flex">
          {(role === "coach"
            ? [
                ["overview", "Home"],
                ["learn", "Learn"],
                ["support", "Support"],
              ]
            : [
                ["overview", "Home"],
                ["checkin", "Weekly check-in"],
                ["insights", "Trends"],
                ["learn", "Learn"],
                ["support", "Support"],
              ]
          ).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setPage(value as PortalPage)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                page === value ? "bg-white shadow-sm" : "text-black/45 hover:text-black"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden rounded-full bg-black/5 p-1 sm:flex">
            {(["parent", "coach"] as Role[]).map((item) => (
              <button
                key={item}
                onClick={() => setRole(item)}
                className={`rounded-full px-4 py-2 text-xs font-bold capitalize transition ${
                  role === item ? "bg-white shadow-sm" : "text-black/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            onClick={goHome}
            className="hidden rounded-full border border-black/15 px-4 py-2.5 text-xs font-bold sm:block"
          >
            Exit portal
          </button>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#17201d] text-xs font-bold text-white">
            {demoData.mentor.initials}
          </span>
        </div>
      </div>
      <nav className="flex justify-start gap-1 overflow-x-auto border-t border-black/5 px-3 py-2 sm:justify-center lg:hidden">
        {(role === "coach"
          ? [
              ["overview", "Home"],
              ["learn", "Learn"],
              ["support", "Support"],
            ]
          : [
              ["overview", "Home"],
              ["checkin", "Check-in"],
              ["insights", "Trends"],
              ["learn", "Learn"],
              ["support", "Support"],
            ]
        ).map(([value, label]) => (
          <button
            key={value}
            onClick={() => setPage(value as PortalPage)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${
              page === value ? "bg-white shadow-sm" : "text-black/45"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}

export function MainApp() {
  document.title = productConfig.browserTitle;
  const [view, setView] = useState<View>("portal");
  const [role, setRole] = useState<Role>("parent");

  const openPortal = (nextRole: Role) => {
    setRole(nextRole);
    setView("portal");
    window.scrollTo(0, 0);
  };

  return view === "home" ? (
    <Home openPortal={openPortal} />
  ) : (
    <Portal
      role={role}
      setRole={setRole}
      goHome={() => setView("home")}
    />
  );
}

export function CoursesPage() {
  document.title = `Courses for Parents and Coaches | ${productConfig.name}`;

  return (
    <div className="min-h-screen bg-[#f4f2eb] text-[#171b19]">
      <header className="border-b border-black/10 bg-[#f4f2eb]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-9 lg:px-14">
          <div onClick={() => (window.location.href = "/")}>
            <Brand />
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium xl:flex">
            {productConfig.publicNavigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={item.href === "/courses" ? "page" : undefined}
                className={item.href === "/courses" ? "font-bold" : ""}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="/"
            className="rounded-full bg-[#d9ff54] px-5 py-3 text-sm font-bold"
          >
            Enter portal
          </a>
          <details className="relative xl:hidden">
            <summary className="cursor-pointer list-none rounded-full border border-black/15 px-4 py-2.5 text-sm font-bold">
              Menu
            </summary>
            <nav className="absolute right-0 top-14 z-40 grid w-64 gap-1 rounded-2xl bg-[#17201d] p-4 text-sm font-medium text-white shadow-2xl">
              {productConfig.publicNavigation.map((item) => (
                <a key={item.href} href={item.href} className="rounded-xl px-3 py-3 hover:bg-white/10">
                  {item.label}
                </a>
              ))}
              <a href="/" className="mt-2 rounded-full bg-[#d9ff54] px-4 py-3 text-center font-bold text-[#171b19]">
                Enter portal
              </a>
            </nav>
          </details>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-9 lg:px-14">
          <p className="eyebrow">{productConfig.name} learning</p>
          <h1 className="font-display mt-4 text-4xl tracking-[-0.04em] sm:text-6xl">
            Courses for Parents and Coaches
          </h1>
        </div>
        <iframe
          src="/fallon-course-player.html"
          title={`${productConfig.name} course player`}
          className="min-h-screen w-full border-0"
        />
      </main>

      <footer className="bg-[#171b19] px-5 py-10 text-white sm:px-9 lg:px-14">
        <div className="mx-auto flex max-w-[1328px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Brand light />
          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-white/65">
            {productConfig.publicNavigation.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
            <a href="/verify">Verify a certificate</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
