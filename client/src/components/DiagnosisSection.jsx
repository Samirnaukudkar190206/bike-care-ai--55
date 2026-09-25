import React from 'react';
import { Sparkles, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';

export default function DiagnosisSection({
  issue,
  onIssueChange,
  onSubmit,
  isPending,
  error,
  result,
  hasValidBike
}) {
  return (
    <section id="guide" className="section-pad bg-[hsl(var(--secondary))] text-[hsl(var(--background))]">
      <div className="container-wide grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
        <div className="lg:sticky lg:top-10">
          <p className="section-kicker text-[hsl(var(--primary))]">02 / Guided help</p>
          <h2 className="display-font mt-3 text-4xl font-extrabold leading-[.95] tracking-[-.05em] md:text-6xl">
            Hear something?
            <br />
            <span className="text-[hsl(var(--primary))]">Say something.</span>
          </h2>
          <p className="mt-6 max-w-[410px] leading-relaxed text-[hsl(var(--background)/.68)]">
            Describe the symptom like you’d tell a friend. BikeCare AI turns the clues into a calm
            next step, not a wall of jargon.
          </p>

          <div className="mt-9 grid max-w-[420px] grid-cols-2 gap-3">
            <div className="rounded-2xl border border-[hsl(var(--background)/.15)] p-4">
              <Sparkles className="mb-5 text-[hsl(var(--primary))]" size={20} />
              <p className="font-semibold">Plain-language checks</p>
              <p className="mt-1 text-xs text-[hsl(var(--background)/.55)]">
                Built around your bike
              </p>
            </div>
            <div className="rounded-2xl border border-[hsl(var(--background)/.15)] p-4">
              <ShieldCheck className="mb-5 text-[hsl(var(--accent))]" size={20} />
              <p className="font-semibold">Safety-aware</p>
              <p className="mt-1 text-xs text-[hsl(var(--background)/.55)]">
                Knows when to call a pro
              </p>
            </div>
          </div>
        </div>

        <div className="card-surface p-5 text-[hsl(var(--foreground))] sm:p-7">
          <div className="mb-7 flex items-center justify-between gap-3">
            <div>
              <p className="mono-font text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">
                Quick diagnosis
              </p>
              <h3 className="display-font mt-2 text-2xl font-bold">
                What’s your bike telling you?
              </h3>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[hsl(var(--muted))]">
              <MessageCircle size={20} />
            </span>
          </div>

          <form onSubmit={onSubmit} data-testid="form-diagnosis">
            <label className="label" htmlFor="issue">
              The symptom
            </label>
            <textarea
              id="issue"
              value={issue}
              onChange={(e) => onIssueChange(e.target.value)}
              className="field min-h-[130px] resize-y"
              placeholder="Example: It cranks, but takes three tries to start when cold…"
              data-testid="input-issue"
            />

            {error && (
              <p className="mt-3 text-sm text-[hsl(var(--destructive))]" data-testid="error-diagnosis">
                {error}
              </p>
            )}

            <div className="mt-5 flex justify-end border-t border-[hsl(var(--border))] pt-5">
              <button
                type="submit"
                className="btn btn-dark"
                disabled={isPending || !hasValidBike}
                data-testid="button-run-diagnosis"
              >
                {isPending ? 'Reading the clues…' : 'Get a clear next step'} <ArrowRight size={16} />
              </button>
            </div>
          </form>

          {isPending && (
            <div className="mt-6 space-y-3" data-testid="loading-diagnosis">
              <div className="shimmer h-5 rounded-md" />
              <div className="shimmer h-12 rounded-md" />
              <div className="shimmer h-12 rounded-md" />
            </div>
          )}

          {result && !isPending && (
            <div className="mt-7 border-t border-[hsl(var(--border))] pt-6" data-testid="result-diagnosis">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="pill border-[hsl(var(--primary)/.5)] bg-[hsl(var(--primary)/.15)] text-xs">
                    Guide ready
                  </span>
                  <h4 className="display-font mt-3 text-2xl font-bold">{result.title}</h4>
                </div>
                <span
                  className={`pill ${
                    result.urgency === 'high'
                      ? 'border-[hsl(var(--destructive)/.4)] bg-[hsl(var(--destructive)/.1)]'
                      : 'bg-[hsl(var(--muted))]'
                  }`}
                  data-testid="status-diagnosis-urgency"
                >
                  {result.urgency} urgency
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                {result.summary}
              </p>

              <div className="mt-5 space-y-3">
                {result.steps.map((step, idx) => (
                  <div key={`${step}-${idx}`} className="flex gap-3 text-sm">
                    <span className="step-number shrink-0">{idx + 1}</span>
                    <p className="pt-1">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[hsl(var(--muted))] p-4">
                <span className="text-sm">
                  Estimated cost <strong className="ml-1">{result.estimatedCost}</strong>
                </span>
                {result.bookingRecommended && (
                  <a
                    href="#book"
                    className="btn btn-primary py-2 text-xs"
                    data-testid="link-diagnosis-book"
                  >
                    Book a closer look <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
