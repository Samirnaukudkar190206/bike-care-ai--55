import React from 'react';
import { Mail, MapPin, Check, Phone, ArrowRight } from 'lucide-react';

export default function ContactSection({
  formData,
  onFormChange,
  onSubmit,
  isPending,
  isSuccess,
  onResetSuccess,
  error,
  responseTime
}) {
  return (
    <section id="contact" className="section-pad bg-[hsl(var(--muted))]">
      <div className="container-wide grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div>
          <p className="section-kicker">04 / Human help</p>
          <h2 className="display-font mt-3 text-4xl font-extrabold leading-[.95] tracking-[-.05em] md:text-6xl">
            Still got a
            <br />
            <span className="text-[hsl(var(--accent))]">question?</span>
          </h2>
          <p className="mt-6 max-w-[360px] leading-relaxed text-[hsl(var(--muted-foreground))]">
            Send a note to the crew. No ticket maze, no scripts — just a useful reply from a real person.
          </p>

          <div className="mt-8 space-y-3 text-sm">
            <p className="flex items-center gap-3">
              <Mail size={17} /> hello@bikecare.ai
            </p>
            <p className="flex items-center gap-3">
              <MapPin size={17} /> The open road, wherever you are
            </p>
          </div>
        </div>

        <div className="card-surface bg-[hsl(var(--card))] p-5 sm:p-7">
          {isSuccess ? (
            <div
              className="flex min-h-[320px] flex-col items-center justify-center text-center"
              data-testid="success-contact"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                <Check size={26} strokeWidth={2.5} />
              </span>
              <h3 className="display-font mt-5 text-2xl font-bold">Message received.</h3>
              <p className="mt-2 max-w-[320px] text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                The crew will get back to you as soon as the wrench is down.
              </p>
              <button
                type="button"
                className="btn btn-ghost mt-7"
                onClick={onResetSuccess}
                data-testid="button-send-another"
              >
                Send another note
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" data-testid="form-contact">
              <div>
                <label className="label" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  className="field"
                  value={formData.name}
                  onChange={(e) => onFormChange('name', e.target.value)}
                  placeholder="Your name"
                  data-testid="input-contact-name"
                />
              </div>

              <div>
                <label className="label" htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="field"
                  value={formData.email}
                  onChange={(e) => onFormChange('email', e.target.value)}
                  placeholder="you@inbox.com"
                  data-testid="input-contact-email"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="label" htmlFor="contact-message">
                  Your note
                </label>
                <textarea
                  id="contact-message"
                  className="field min-h-[150px] resize-y"
                  value={formData.message}
                  onChange={(e) => onFormChange('message', e.target.value)}
                  placeholder="Tell us what’s on your mind…"
                  data-testid="input-contact-message"
                />
              </div>

              {error && (
                <p className="sm:col-span-2 text-sm text-[hsl(var(--destructive))]" data-testid="error-contact">
                  {error}
                </p>
              )}

              <div className="sm:col-span-2 flex flex-col justify-between gap-4 border-t border-[hsl(var(--border))] pt-5 sm:flex-row sm:items-center">
                <span className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                  <Phone size={14} /> Replies typically within {responseTime || '< 15 min'}
                </span>
                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={isPending}
                  data-testid="button-submit-contact"
                >
                  {isPending ? 'Sending…' : 'Send message'} <ArrowRight size={15} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
