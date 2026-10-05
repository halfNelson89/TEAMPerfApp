import { useState, type FormEvent, type ReactNode } from "react";
import { productConfig } from "./config";
import { demoData } from "./demoData";
import { Brand, CrisisPanel } from "./pages";

function PublicHeader() {
  return (
    <header className="relative z-30 border-b border-black/10 bg-[#f4f2eb]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-5 py-5 sm:px-9 lg:px-14">
        <div onClick={() => (window.location.href = "/")}>
          <Brand />
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {productConfig.publicNavigation.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-black/55">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="/"
          className="hidden rounded-full bg-[#d9ff54] px-5 py-3 text-sm font-bold sm:block"
        >
          Enter portal
        </a>
        <details className="relative lg:hidden">
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
  );
}

function PublicFooter() {
  return (
    <footer className="bg-[#171b19] px-5 py-10 text-white sm:px-9 lg:px-14">
      <div className="mx-auto max-w-[1328px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Brand light />
          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-white/65">
            {productConfig.publicNavigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href="/verify">Verify a certificate</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function PublicPage({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  document.title = `${title} | ${productConfig.name}`;
  return (
    <div className="min-h-screen bg-[#f4f2eb] text-[#171b19]">
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}

const inputClass =
  "mt-2 min-h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-none transition focus:border-black/50";

function SampleReport() {
  const team = demoData.team;
  return (
    <div className="overflow-hidden rounded-[2rem] bg-white">
      <div className="flex flex-col justify-between gap-5 border-b border-black/10 p-7 sm:flex-row sm:items-end sm:p-9">
        <div>
          <span className="rounded-full bg-[#eef4d4] px-3 py-2 text-[10px] font-bold tracking-wider uppercase">
            Sample report
          </span>
          <h3 className="font-display mt-5 text-4xl">{team.name}</h3>
        </div>
        <div className="sm:text-right">
          <p className="font-display text-5xl">{team.completion.percent}%</p>
          <p className="text-xs font-bold tracking-wider text-black/40 uppercase">Completion rate</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="border-b border-black/10 text-[10px] font-bold tracking-wider text-black/40 uppercase">
              <th className="px-9 py-4">Name</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-9 py-4 text-right">Completion date</th>
            </tr>
          </thead>
          <tbody>
            {team.roster.map((person) => (
              <tr key={person.name} className="border-b border-black/5 last:border-0">
                <td className="px-9 py-4 text-sm font-bold">{person.name}</td>
                <td className="px-6 py-4 text-sm text-black/55">{person.role}</td>
                <td className="px-6 py-4 text-sm">{person.status}</td>
                <td className="px-9 py-4 text-right text-sm text-black/45">{person.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DemoForm() {
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const required = ["name", "role", "organization", "organizationType", "athletes", "email", "message"];
    const missing = required.some((field) => !String(values.get(field) ?? "").trim());
    if (missing) {
      setStatus("error");
      return;
    }
    // TODO: This form must be connected to a back end later.
    setStatus("success");
  };

  return (
    <form onSubmit={submit} noValidate className="rounded-[2rem] bg-white p-7 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold">
          Name
          <input className={inputClass} name="name" />
        </label>
        <label className="text-sm font-bold">
          Role
          <input className={inputClass} name="role" />
        </label>
        <label className="text-sm font-bold">
          Organization
          <input className={inputClass} name="organization" />
        </label>
        <label className="text-sm font-bold">
          Organization type
          <select className={inputClass} name="organizationType" defaultValue="">
            <option value="" disabled>Select one</option>
            <option>High school</option>
            <option>Club</option>
            <option>Other</option>
          </select>
        </label>
        <label className="text-sm font-bold">
          Number of athletes
          <input className={inputClass} name="athletes" type="number" min="1" />
        </label>
        <label className="text-sm font-bold">
          Email
          <input className={inputClass} name="email" type="email" />
        </label>
      </div>
      <label className="mt-5 block text-sm font-bold">
        Message
        <textarea className={`${inputClass} min-h-32 py-3`} name="message" />
      </label>
      {status === "error" && (
        <p role="alert" className="mt-5 text-sm font-bold text-[#9a3f2f]">
          Please complete all required fields.
        </p>
      )}
      {status === "success" && (
        <p role="status" className="mt-5 rounded-xl bg-[#eef4d4] p-4 text-sm font-bold">
          Thank you. We will reply within two business days.
        </p>
      )}
      <button className="mt-6 rounded-full bg-[#171b19] px-6 py-3.5 text-sm font-bold text-white">
        Request a demo
      </button>
      <p className="mt-6 text-xs leading-5 text-black/45">
        TEAM Institute provides education. It is not therapy and does not diagnose or treat any condition.
      </p>
    </form>
  );
}

export function OrganizationsPage() {
  const benefits = [
    ["Coach course", "Coaching the Whole Athlete. Eleven guided stops with lessons, games, and a conversation exercise."],
    ["Parent course", "The Car Ride Home. The same guided format, built for sports parents."],
    ["Enrollment by team", "Create a team, share one link or QR code, and coaches and parents join in minutes."],
    ["Completion tracking", "See who has started, who has finished, and who needs a reminder."],
    ["Verified certificates", "Every certificate carries an ID that anyone can check on this site."],
    ["Season report", "Export a completion report for your board, district, or booster club."],
  ];
  return (
    <PublicPage title="For schools and clubs">
      <section className="px-5 py-20 sm:px-9 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1328px]">
          <p className="eyebrow">For schools and clubs</p>
          <h1 className="font-display mt-5 max-w-5xl text-5xl leading-[0.94] tracking-[-0.045em] sm:text-7xl">
            Train the adults around your athletes. Prove they completed it.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-black/60">
            Performance and resilience training for coaches and parents, with completion records your organization can verify.
          </p>
        </div>
      </section>

      <section className="bg-[#17201d] px-5 py-20 text-white sm:px-9 lg:px-14 lg:py-24">
        <div className="mx-auto max-w-[1328px]">
          <h2 className="font-display text-4xl sm:text-5xl">What your organization gets</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[2rem] bg-white/15 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(([title, copy]) => (
              <div key={title} className="bg-[#17201d] p-7 sm:p-8">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-9 lg:px-14 lg:py-24">
        <div className="mx-auto max-w-[1328px]">
          <p className="eyebrow">See a sample report</p>
          <div className="mt-8"><SampleReport /></div>
        </div>
      </section>

      <section className="bg-[#d9ff54] px-5 py-20 sm:px-9 lg:px-14">
        <div className="mx-auto max-w-[1328px]">
          <h2 className="font-display text-4xl sm:text-5xl">How it works</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              "1. Create your teams.",
              "2. Share the join link at your pre-season meeting.",
              "3. Track completion and export your report.",
            ].map((step) => (
              <div key={step} className="rounded-3xl bg-white/55 p-7 text-lg font-bold">{step}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="request-demo" className="scroll-mt-8 px-5 py-20 sm:px-9 lg:px-14 lg:py-24">
        <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="eyebrow">Request a demo</p>
            <h2 className="font-display mt-5 text-4xl sm:text-5xl">Bring TEAM Institute to your organization.</h2>
          </div>
          <DemoForm />
        </div>
      </section>
    </PublicPage>
  );
}

export function PricingPage() {
  const tiers = [
    {
      name: "Education",
      price: productConfig.prices.education,
      copy: "Coach and parent courses, enrollment by team, completion tracking, verified certificates, season report.",
      action: "Request a demo",
    },
    {
      name: "Complete",
      price: productConfig.prices.complete,
      copy: "Everything in Education, plus an athlete skills program, weekly check-ins, and a safeguarding workflow.",
      action: "Join the waitlist",
      tag: "Coming 2027",
    },
    {
      name: "Live sessions",
      price: productConfig.prices.liveSessions.display,
      copy: "Pre-season parent webinars and coach workshops with Dr. Fallon.",
      action: "Ask about dates",
    },
  ];
  const questions = [
    ["Who pays?", "The school or club. Clubs can add the fee to registration."],
    ["Is there a minimum?", "One team."],
    ["Do multi-sport athletes pay each season?", "On the Complete tier, cost is capped per athlete per year."],
    ["Can we pay by invoice?", "Yes. Schools can pay by invoice or purchase order."],
  ];
  return (
    <PublicPage title="Pricing">
      <section className="px-5 py-20 sm:px-9 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1328px]">
          <p className="eyebrow">Pricing</p>
          <h1 className="font-display mt-5 text-6xl tracking-[-0.045em] sm:text-7xl">Pricing</h1>
          <p className="mt-6 text-lg text-black/60">Coaches and parents are always included at no extra charge.</p>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div key={tier.name} className="flex flex-col rounded-[2rem] bg-white p-7 sm:p-9">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-bold">{tier.name}</h2>
                  {tier.tag && <span className="rounded-full bg-[#efe7ff] px-3 py-2 text-[10px] font-bold uppercase">{tier.tag}</span>}
                </div>
                <p className="font-display mt-8 text-4xl leading-tight">{tier.price}</p>
                <p className="mt-5 flex-1 text-sm leading-6 text-black/55">{tier.copy}</p>
                <a href="/organizations#request-demo" className="mt-8 rounded-full bg-[#171b19] px-6 py-3.5 text-center text-sm font-bold text-white">
                  {tier.action}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#17201d] px-5 py-20 text-white sm:px-9 lg:px-14">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="font-display text-4xl sm:text-5xl">Common questions</h2>
          <div className="mt-10 divide-y divide-white/10">
            {questions.map(([question, answer]) => (
              <div key={question} className="grid gap-3 py-6 sm:grid-cols-[0.7fr_1.3fr]">
                <h3 className="font-bold">{question}</h3>
                <p className="text-sm leading-6 text-white/60">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicPage>
  );
}

export function AboutPage() {
  const [crisisOpen, setCrisisOpen] = useState(false);
  return (
    <PublicPage title="About">
      <section className="px-5 py-20 sm:px-9 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1120px]">
          <p className="eyebrow">About</p>
          <h1 className="font-display mt-5 max-w-5xl text-5xl leading-[0.94] tracking-[-0.045em] sm:text-7xl">
            Built by a psychologist who works with young people every day.
          </h1>
          <p className="mt-10 max-w-4xl text-lg leading-8 text-black/60">
            TEAM Institute was created by Dr. Corrine Fallon, Psy.D., NCSP, a licensed psychologist in Pennsylvania (license PS018778). Through her practice, Fallon Psych, she works with children, teens, and young adults ages 10 to 21 on anxiety and stress, focus, mood, school refusal, performance anxiety, and life transitions. She also provides performance coaching for athletes and educational consulting for families.
          </p>
          <div className="mt-14 max-w-4xl border-t border-black/10 pt-10">
            <h2 className="font-display text-4xl">Why she built this</h2>
            <p className="mt-5 text-lg leading-8 text-black/60">
              The adults around a young athlete shape how that athlete handles pressure, mistakes, and setbacks. Most coaches and parents are never taught how. TEAM Institute gives them practical language and habits they can use the same day.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#17201d] px-5 py-20 text-white sm:px-9 lg:px-14">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="font-display text-4xl sm:text-5xl">The method</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[2rem] bg-white/15 md:grid-cols-3">
            {[
              ["Recognize", "Spot shifts in mood, motivation, and behavior before they become a crisis."],
              ["Respond", "Use language that builds trust, autonomy, and emotional safety."],
              ["Reinforce", "Create habits and environments where healthy performance can last."],
            ].map(([title, copy]) => (
              <div key={title} className="bg-[#17201d] p-8">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-9 lg:px-14">
        <div className="mx-auto max-w-[900px] rounded-[2rem] bg-white p-7 sm:p-10">
          <h2 className="font-display text-4xl">What this is, and is not</h2>
          <p className="mt-5 text-base leading-7 text-black/60">
            TEAM Institute is an education program. It is not therapy, it does not diagnose or treat any condition, and using it does not create a psychologist-patient relationship. If you are worried about a young person&apos;s safety, see our{" "}
            <button onClick={() => setCrisisOpen(true)} className="font-bold underline underline-offset-4">
              crisis resources
            </button>.
          </p>
        </div>
      </section>
      {crisisOpen && <CrisisPanel close={() => setCrisisOpen(false)} />}
    </PublicPage>
  );
}

export function VerifyPage() {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState<"idle" | "empty" | "valid" | "invalid">("idle");
  const sample = demoData.certificates[0];
  const verify = (event: FormEvent) => {
    event.preventDefault();
    const normalized = certificateId.trim().toUpperCase();
    setResult(!normalized ? "empty" : normalized === sample.id ? "valid" : "invalid");
  };
  return (
    <PublicPage title="Verify a certificate">
      <section className="px-5 py-20 sm:px-9 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[760px]">
          <p className="eyebrow">Certificate verification</p>
          <h1 className="font-display mt-5 text-5xl tracking-[-0.04em] sm:text-6xl">Verify a certificate</h1>
          <form onSubmit={verify} className="mt-10 rounded-[2rem] bg-white p-7 sm:p-9">
            <label className="text-sm font-bold">
              Certificate ID
              <input
                className={inputClass}
                value={certificateId}
                onChange={(event) => setCertificateId(event.target.value)}
              />
            </label>
            <button className="mt-6 rounded-full bg-[#171b19] px-6 py-3.5 text-sm font-bold text-white">
              Verify
            </button>
            {result === "empty" && <p className="mt-6 text-sm font-bold">Enter a certificate ID.</p>}
            {result === "invalid" && <p className="mt-6 text-sm font-bold">No certificate found with that ID.</p>}
          </form>
          {result === "valid" && (
            <div className="mt-5 rounded-[2rem] bg-[#eef4d4] p-7 sm:p-9">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">Valid certificate</h2>
                <span className="rounded-full bg-white px-3 py-2 text-[10px] font-bold uppercase">Sample</span>
              </div>
              <dl className="mt-7 grid gap-5 sm:grid-cols-2">
                <div><dt className="text-[10px] font-bold uppercase text-black/40">Name</dt><dd className="mt-1 font-bold">{sample.name}</dd></div>
                <div><dt className="text-[10px] font-bold uppercase text-black/40">Date</dt><dd className="mt-1 font-bold">{sample.completed}</dd></div>
                <div className="sm:col-span-2"><dt className="text-[10px] font-bold uppercase text-black/40">Course</dt><dd className="mt-1 font-bold">{sample.course}</dd></div>
              </dl>
            </div>
          )}
        </div>
      </section>
    </PublicPage>
  );
}
