import { useState, type FormEvent, type ReactNode } from "react";
import { productConfig } from "./config";
import { demoData } from "./demoData";
import { Brand, CrisisPanel, PortalFooter } from "./pages";

const inputClass =
  "mt-2 min-h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-none focus:border-black/50";

function AuthShell({ children, title }: { children: ReactNode; title: string }) {
  document.title = `${title} | ${productConfig.name}`;
  return (
    <main className="min-h-screen bg-[#f4f2eb] text-[#171b19]">
      <header className="app-safe-top border-b border-black/10">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-5 py-5 sm:px-9">
          <a href="/"><Brand /></a>
          <a href="/" className="text-sm font-bold text-black/50">Back to home</a>
        </div>
      </header>
      {children}
    </main>
  );
}

export function SignInPage() {
  const queryState = new URLSearchParams(window.location.search).get("state");
  const [state, setState] = useState<"default" | "error" | "reset">(
    queryState === "error" ? "error" : "default",
  );
  const signIn = (event: FormEvent) => {
    event.preventDefault();
    window.location.href = "/portal";
  };
  return (
    <AuthShell title="Sign in">
      <div className="mx-auto max-w-lg px-5 py-16 sm:px-9 lg:py-24">
        <p className="eyebrow">Portal access</p>
        <h1 className="font-display mt-4 text-5xl tracking-[-0.04em] sm:text-6xl">Sign in</h1>
        <form onSubmit={signIn} className="mt-9 rounded-[2rem] bg-white p-7 sm:p-9">
          <label className="text-sm font-bold">Email<input type="email" className={inputClass} /></label>
          <label className="mt-5 block text-sm font-bold">Password<input type="password" className={inputClass} /></label>
          {state === "error" && (
            <p role="alert" className="mt-5 rounded-xl bg-[#fff0eb] p-4 text-sm font-bold">
              That email and password do not match. Try again or reset your password.
            </p>
          )}
          {state === "reset" && (
            <p role="status" className="mt-5 rounded-xl bg-[#eef4d4] p-4 text-sm font-bold">
              If that email has an account, a reset link is on its way.
            </p>
          )}
          <button className="mt-7 w-full rounded-full bg-[#171b19] px-6 py-4 text-sm font-bold text-white">
            Sign in
          </button>
          <div className="mt-6 flex flex-col gap-3 text-sm font-bold sm:flex-row sm:justify-between">
            <button type="button" onClick={() => setState("reset")} className="text-left underline underline-offset-4">
              Forgot password?
            </button>
            <a href="/join/U14GIRLS" className="underline underline-offset-4">Have a team code? Join your team</a>
          </div>
        </form>
      </div>
    </AuthShell>
  );
}

function JoinState({ title, copy, action }: { title: string; copy?: string; action?: ReactNode }) {
  return (
    <AuthShell title="Join your team">
      <div className="mx-auto max-w-xl px-5 py-20 text-center sm:px-9">
        <h1 className="font-display text-5xl tracking-[-0.04em]">{title}</h1>
        {copy && <p className="mt-5 text-base leading-7 text-black/55">{copy}</p>}
        {action && <div className="mt-8">{action}</div>}
      </div>
    </AuthShell>
  );
}

export function JoinPage({ code }: { code: string }) {
  const state = new URLSearchParams(window.location.search).get("state");
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"parent" | "coach" | null>(null);
  const [termsError, setTermsError] = useState(false);
  const team = demoData.join;

  if (state === "expired") {
    return <JoinState title="This join link has expired." copy="Ask your coach or administrator for a new one." />;
  }
  if (state === "member") {
    return (
      <JoinState
        title="You are already on this team."
        action={<a href="/portal?screen=learn" className="inline-block rounded-full bg-[#171b19] px-7 py-4 text-sm font-bold text-white">Go to my course</a>}
      />
    );
  }
  if (code.toUpperCase() !== team.code) {
    return <JoinState title="Code not found" />;
  }

  const createAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const checked = new FormData(event.currentTarget).get("terms") === "on";
    if (!checked) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    setStep(4);
  };

  return (
    <AuthShell title="Join your team">
      <div className="mx-auto max-w-xl px-5 py-10 sm:px-9 lg:py-16">
        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className={`h-2 flex-1 rounded-full ${item <= step ? "bg-[#17201d]" : "bg-black/10"}`} />
          ))}
        </div>
        {step === 1 && (
          <section className="rounded-[2rem] bg-white p-7 sm:p-9">
            <p className="eyebrow">Join your team</p>
            <h1 className="font-display mt-5 text-4xl">Is this your team?</h1>
            <dl className="mt-8 grid gap-5 rounded-2xl bg-[#f4f2eb] p-6 sm:grid-cols-2">
              <div><dt className="text-[10px] font-bold uppercase text-black/40">Team</dt><dd className="mt-1 font-bold">{team.teamName}</dd></div>
              <div><dt className="text-[10px] font-bold uppercase text-black/40">Organization</dt><dd className="mt-1 font-bold">{team.organization}</dd></div>
              <div><dt className="text-[10px] font-bold uppercase text-black/40">Sport</dt><dd className="mt-1 font-bold">{team.sport}</dd></div>
              <div><dt className="text-[10px] font-bold uppercase text-black/40">Season</dt><dd className="mt-1 font-bold">{team.season}</dd></div>
            </dl>
            <button onClick={() => setStep(2)} className="mt-7 min-h-14 w-full rounded-full bg-[#171b19] px-6 text-base font-bold text-white">This is my team</button>
            <a href="/" className="mt-3 flex min-h-14 items-center justify-center rounded-full border border-black/15 px-6 text-base font-bold">This is not my team</a>
          </section>
        )}
        {step === 2 && (
          <section>
            <p className="eyebrow">Join your team</p>
            <h1 className="font-display mt-5 text-4xl">Choose your role</h1>
            <div className="mt-8 grid gap-4">
              <button onClick={() => { setRole("parent"); setStep(3); }} className="min-h-24 rounded-[2rem] border-2 border-black/10 bg-white p-6 text-left text-lg font-bold">
                I am a parent or guardian
              </button>
              <button onClick={() => { setRole("coach"); setStep(3); }} className="min-h-24 rounded-[2rem] border-2 border-black/10 bg-white p-6 text-left text-lg font-bold">
                I am a coach
              </button>
            </div>
          </section>
        )}
        {step === 3 && (
          <form onSubmit={createAccount} className="rounded-[2rem] bg-white p-7 sm:p-9">
            <p className="eyebrow">Create your account</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-bold">First name<input className={inputClass} /></label>
              <label className="text-sm font-bold">Last name<input className={inputClass} /></label>
            </div>
            <label className="mt-5 block text-sm font-bold">Email<input type="email" className={inputClass} /></label>
            <label className="mt-5 block text-sm font-bold">Password<input type="password" className={inputClass} /></label>
            <label className="mt-6 flex items-start gap-3 text-sm leading-6">
              <input name="terms" type="checkbox" required className="mt-1 h-5 w-5 shrink-0" />
              <span>I agree to the <a href="/terms" className="font-bold underline">Terms</a> and <a href="/privacy" className="font-bold underline">Privacy Policy</a></span>
            </label>
            {termsError && <p role="alert" className="mt-4 text-sm font-bold text-[#9a3f2f]">Agree to the Terms and Privacy Policy to continue.</p>}
            <button className="mt-7 min-h-14 w-full rounded-full bg-[#171b19] px-6 text-base font-bold text-white">Create account</button>
            <button type="button" onClick={() => setStep(2)} className="mt-3 min-h-12 w-full text-sm font-bold text-black/50">Back</button>
            <input type="hidden" value={role ?? ""} readOnly />
          </form>
        )}
        {step === 4 && (
          <section className="rounded-[2rem] bg-[#d9ff54] p-8 text-center sm:p-10">
            <h1 className="font-display text-5xl">You are in.</h1>
            <p className="mt-5 text-base leading-7">Your course takes about 70 minutes and is due {team.dueDate}.</p>
            <a href={`/welcome?role=${role ?? "parent"}`} className="mt-8 inline-block min-h-14 rounded-full bg-[#171b19] px-8 py-4 text-base font-bold text-white">Start my course</a>
          </section>
        )}
      </div>
    </AuthShell>
  );
}

export function WelcomePage() {
  const team = demoData.join;
  const role = new URLSearchParams(window.location.search).get("role") === "coach" ? "coach" : "parent";
  const learnHref = role === "coach" ? "/portal?role=coach&screen=learn" : "/portal?screen=learn";
  return (
    <AuthShell title="Welcome">
      <div className="mx-auto max-w-2xl px-5 py-14 sm:px-9 lg:py-20">
        <p className="eyebrow">Welcome</p>
        <h1 className="font-display mt-5 text-5xl tracking-[-0.04em] sm:text-6xl">Welcome</h1>
        <div className="mt-9 grid gap-4">
          {[
            ["What you will do", "11 guided stops with lessons, games, and one conversation exercise"],
            ["How long it takes", "about 70 minutes, in as many sittings as you like"],
            ["When it is due", team.dueDate],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-3xl bg-white p-6">
              <h2 className="font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-black/55">{copy}</p>
            </div>
          ))}
        </div>
        <p className="mt-7 text-sm font-bold">This course is education. It is not therapy.</p>
        <a href={learnHref} className="mt-7 inline-block rounded-full bg-[#171b19] px-8 py-4 text-base font-bold text-white">Start</a>
      </div>
    </AuthShell>
  );
}

export function AccountPage() {
  const sourceRole = new URLSearchParams(window.location.search).get("role");
  const returnToPortal =
    sourceRole === "admin"
      ? "/portal/admin"
      : sourceRole === "coach"
        ? "/portal?role=coach"
        : "/portal";
  const [saved, setSaved] = useState(false);
  const [courseReminders, setCourseReminders] = useState(demoData.account.emailPreferences.courseReminders);
  const [teamAnnouncements, setTeamAnnouncements] = useState(demoData.account.emailPreferences.teamAnnouncements);
  const [crisisOpen, setCrisisOpen] = useState(false);
  const profileSave = (event: FormEvent) => {
    event.preventDefault();
    setSaved(true);
  };
  return (
    <main className="min-h-screen bg-[#f4f2eb] text-[#171b19]">
      <header className="app-safe-top border-b border-black/10">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-5 py-4 sm:px-9">
          <a href={returnToPortal}><Brand /></a>
          <a href={returnToPortal} className="rounded-full border border-black/15 px-4 py-2.5 text-xs font-bold">Back to portal</a>
        </div>
      </header>
      <div className="mx-auto max-w-[1000px] px-5 py-10 sm:px-9 lg:py-14">
        <p className="eyebrow">Portal</p>
        <h1 className="font-display mt-4 text-5xl tracking-[-0.04em] sm:text-6xl">Account</h1>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <form onSubmit={profileSave} className="rounded-[2rem] bg-white p-7 sm:p-9">
            <h2 className="text-xl font-bold">Profile</h2>
            <label className="mt-6 block text-sm font-bold">First name<input defaultValue={demoData.mentor.firstName} className={inputClass} /></label>
            <label className="mt-5 block text-sm font-bold">Last name<input defaultValue={demoData.mentor.lastName} className={inputClass} /></label>
            <label className="mt-5 block text-sm font-bold">Email<input defaultValue={demoData.mentor.email} className={inputClass} /></label>
            <button className="mt-6 rounded-full bg-[#171b19] px-6 py-3 text-sm font-bold text-white">Save changes</button>
            {saved && <span className="ml-4 text-sm font-bold text-black/50">Saved</span>}
          </form>
          <form onSubmit={(event) => event.preventDefault()} className="rounded-[2rem] bg-white p-7 sm:p-9">
            <h2 className="text-xl font-bold">Change password</h2>
            <label className="mt-6 block text-sm font-bold">Current password<input type="password" className={inputClass} /></label>
            <label className="mt-5 block text-sm font-bold">New password<input type="password" className={inputClass} /></label>
            <label className="mt-5 block text-sm font-bold">Confirm password<input type="password" className={inputClass} /></label>
            <button className="mt-6 rounded-full bg-[#171b19] px-6 py-3 text-sm font-bold text-white">Change password</button>
          </form>
          <section className="rounded-[2rem] bg-white p-7 sm:p-9">
            <h2 className="text-xl font-bold">My teams</h2>
            <div className="mt-6 space-y-3">{demoData.account.teams.map((team) => (
              <div key={`${team.name}-${team.role}`} className="flex items-center justify-between rounded-2xl bg-[#f4f2eb] p-5">
                <span className="font-bold">{team.name}</span><span className="text-xs font-bold text-black/45">{team.role}</span>
              </div>
            ))}</div>
          </section>
          <section className="rounded-[2rem] bg-white p-7 sm:p-9">
            <h2 className="text-xl font-bold">Email preferences</h2>
            <div className="mt-6 space-y-5">
              <PreferenceToggle label="Course reminders" value={courseReminders} setValue={setCourseReminders} />
              <PreferenceToggle label="Team announcements" value={teamAnnouncements} setValue={setTeamAnnouncements} />
            </div>
          </section>
        </div>
        <a href="/" className="mt-8 inline-block text-sm font-bold underline underline-offset-4">Sign out</a>
      </div>
      <PortalFooter openCrisis={() => setCrisisOpen(true)} />
      {crisisOpen && <CrisisPanel close={() => setCrisisOpen(false)} />}
    </main>
  );
}

function PreferenceToggle({
  label,
  value,
  setValue,
}: {
  label: string;
  value: boolean;
  setValue: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-5">
      <span className="text-sm font-bold">{label}</span>
      <input type="checkbox" checked={value} onChange={(event) => setValue(event.target.checked)} className="h-5 w-5" />
    </label>
  );
}
