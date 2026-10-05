import { useState } from "react";
import { demoData } from "./demoData";

type Audience = "athlete" | "parent" | "coach";

export function TalkRequestFlow({
  audience,
  close,
  openCrisis,
}: {
  audience: Audience;
  close: () => void;
  openCrisis: () => void;
}) {
  const [step, setStep] = useState(1);
  const [about, setAbout] = useState("");
  const [method, setMethod] = useState("");
  const [time, setTime] = useState("");
  const professional = demoData.professional;
  const noneYet =
    new URLSearchParams(window.location.search).get("professional") === "none" ||
    professional.demoState === "None yet";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4 sm:p-6">
      <div className="mx-auto my-4 w-full max-w-xl rounded-[2rem] bg-[#f4f2eb] p-5 shadow-2xl sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold">Step {step} of 5</p>
          <button onClick={close} className="min-h-11 rounded-full border border-black/15 px-4 text-sm font-bold">
            Close
          </button>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/10">
          <div className="h-full rounded-full bg-[#17201d]" style={{ width: `${(step / 5) * 100}%` }} />
        </div>

        {step === 1 && (
          <section className="mt-7">
            <div className="rounded-2xl bg-[#fff0eb] p-6">
              <p className="text-lg font-bold">If this is urgent, do not wait. Call or text 988, or call 911.</p>
              <button onClick={openCrisis} className="mt-4 text-sm font-bold underline underline-offset-4">
                Crisis resources
              </button>
            </div>
            <button onClick={() => setStep(2)} className="mt-7 min-h-14 w-full rounded-full bg-[#171b19] px-7 text-base font-bold text-white">
              Continue
            </button>
          </section>
        )}

        {step === 2 && (
          <section className="mt-7">
            <h2 className="font-display text-4xl">Who is this about?</h2>
            <div className="mt-7 grid gap-3">
              <button
                onClick={() => setAbout("Me")}
                className={`min-h-20 rounded-2xl border-2 p-5 text-left text-base font-bold ${about === "Me" ? "border-[#17201d] bg-white" : "border-black/10 bg-white"}`}
              >
                Me
              </button>
              {audience !== "athlete" && (
                <button
                  onClick={() => setAbout("An athlete I am concerned about")}
                  className={`min-h-20 rounded-2xl border-2 p-5 text-left text-base font-bold ${
                    about === "An athlete I am concerned about" ? "border-[#17201d] bg-white" : "border-black/10 bg-white"
                  }`}
                >
                  An athlete I am concerned about
                </button>
              )}
            </div>
            <FlowButtons back={() => setStep(1)} next={() => setStep(3)} disabled={!about} />
          </section>
        )}

        {step === 3 && (
          <section className="mt-7">
            <h2 className="font-display text-4xl">How would you like to be contacted?</h2>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {["Phone", "Email"].map((option) => (
                <button
                  key={option}
                  onClick={() => setMethod(option)}
                  className={`min-h-16 rounded-2xl border-2 bg-white text-base font-bold ${
                    method === option ? "border-[#17201d]" : "border-black/10"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <label className="mt-6 block text-sm font-bold">
              Preferred time of day
              <select
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="mt-2 min-h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-sm"
              >
                <option value="">Select one</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </label>
            <FlowButtons back={() => setStep(2)} next={() => setStep(4)} disabled={!method || !time} />
          </section>
        )}

        {step === 4 && (
          <section className="mt-7">
            <h2 className="font-display text-4xl">Optional message</h2>
            <label className="mt-6 block text-sm font-bold">
              Share only what you are comfortable sharing.
              <textarea className="mt-2 min-h-36 w-full resize-none rounded-2xl border border-black/15 bg-white p-4 text-sm" />
            </label>
            <FlowButtons back={() => setStep(3)} next={() => setStep(5)} />
          </section>
        )}

        {step === 5 && (
          <section className="mt-7 rounded-[2rem] bg-[#eef4d4] p-7 text-center">
            <h2 className="font-display text-4xl">
              {noneYet
                ? "Your request has been sent to your organization's wellbeing contact."
                : `Your request has been sent to ${professional.sample.name}. You should hear back within ${professional.responseTime}.`}
            </h2>
            <button onClick={close} className="mt-7 min-h-14 rounded-full bg-[#171b19] px-8 text-base font-bold text-white">
              Done
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

function FlowButtons({
  back,
  next,
  disabled = false,
}: {
  back: () => void;
  next: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="mt-7 flex justify-between gap-3">
      <button onClick={back} className="min-h-14 rounded-full border border-black/15 px-7 text-base font-bold">Back</button>
      <button onClick={next} disabled={disabled} className="min-h-14 rounded-full bg-[#171b19] px-8 text-base font-bold text-white disabled:opacity-30">Next</button>
    </div>
  );
}
