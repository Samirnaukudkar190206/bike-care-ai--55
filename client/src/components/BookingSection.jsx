import React from 'react';
import { Wrench, Check, Send } from 'lucide-react';

export default function BookingSection({
  bikes = [],
  selectedBikeId,
  onBikeSelectChange,
  customBikeName,
  onCustomBikeNameChange,
  formData,
  onFormChange,
  onSubmit,
  isPending,
  error,
  hasValidBike,
  isOther
}) {
  return (
    <section id="book" className="section-pad">
      <div className="container-wide grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
        <div>
          <p className="section-kicker">03 / Workshop time</p>
          <h2 className="display-font mt-3 text-4xl font-extrabold leading-[.95] tracking-[-.05em] md:text-6xl">
            Leave the wrenching
            <br />
            <span className="text-[hsl(var(--accent))]">to the right hands.</span>
          </h2>
          <p className="mt-6 max-w-[380px] leading-relaxed text-[hsl(var(--muted-foreground))]">
            Tell us what you need and when you’re free. We’ll confirm the slot and keep the rest simple.
          </p>

          <div className="mt-9 divide-y divide-[hsl(var(--border))] border-y border-[hsl(var(--border))]">
            {['Pick a service and time', 'Get a real confirmation', 'Roll in feeling ready'].map(
              (item, idx) => (
                <div key={item} className="flex items-center gap-4 py-4">
                  <span className="mono-font text-xs text-[hsl(var(--accent))]">0{idx + 1}</span>
                  <span className="font-semibold">{item}</span>
                  <Check
                    size={16}
                    className="ml-auto text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] rounded-full p-[2px]"
                  />
                </div>
              )
            )}
          </div>
        </div>

        <div className="card-surface overflow-hidden">
          <div className="flex items-center justify-between gap-4 bg-[hsl(var(--muted))] p-5 sm:p-7">
            <div>
              <p className="mono-font text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">
                Request a slot
              </p>
              <h3 className="display-font mt-2 text-2xl font-bold">Book service</h3>
            </div>
            <Wrench className="text-[hsl(var(--accent))]" />
          </div>

          <form onSubmit={onSubmit} className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7" data-testid="form-booking">
            <div className="sm:col-span-2">
              <label className="label" htmlFor="booking-bike">
                Bike
              </label>
              <select
                id="booking-bike"
                className="field"
                value={selectedBikeId}
                onChange={(e) => onBikeSelectChange(e.target.value)}
                data-testid="select-booking-bike"
              >
                <option value="" disabled>
                  Choose your bike
                </option>
                {bikes.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.brand} {b.model} · {b.yearRange}
                  </option>
                ))}
                <option value="other">Other bike — type it below</option>
              </select>

              {isOther && (
                <input
                  id="booking-custom-bike-name"
                  className="field mt-3"
                  value={customBikeName}
                  onChange={(e) => onCustomBikeNameChange(e.target.value)}
                  placeholder="Example: Honda Activa 6G"
                  data-testid="input-booking-custom-bike-name"
                />
              )}
            </div>

            <div>
              <label className="label" htmlFor="booking-name">
                Your name
              </label>
              <input
                id="booking-name"
                className="field"
                value={formData.name}
                onChange={(e) => onFormChange('name', e.target.value)}
                placeholder="Avery Chen"
                data-testid="input-booking-name"
              />
            </div>

            <div>
              <label className="label" htmlFor="booking-email">
                Email
              </label>
              <input
                id="booking-email"
                type="email"
                className="field"
                value={formData.email}
                onChange={(e) => onFormChange('email', e.target.value)}
                placeholder="you@inbox.com"
                data-testid="input-booking-email"
              />
            </div>

            <div>
              <label className="label" htmlFor="booking-phone">
                Phone
              </label>
              <input
                id="booking-phone"
                type="tel"
                className="field"
                value={formData.phone}
                onChange={(e) => onFormChange('phone', e.target.value)}
                placeholder="+1 555 014 0198"
                data-testid="input-booking-phone"
              />
            </div>

            <div>
              <label className="label" htmlFor="booking-service">
                Service
              </label>
              <select
                id="booking-service"
                className="field"
                value={formData.service}
                onChange={(e) => onFormChange('service', e.target.value)}
                data-testid="select-booking-service"
              >
                <option>Routine service</option>
                <option>Brake check</option>
                <option>Electrical diagnosis</option>
                <option>Pre-ride inspection</option>
                <option>Something else</option>
              </select>
            </div>

            <div>
              <label className="label" htmlFor="booking-date">
                Preferred date
              </label>
              <input
                id="booking-date"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="field"
                value={formData.preferredDate}
                onChange={(e) => onFormChange('preferredDate', e.target.value)}
                data-testid="input-booking-date"
              />
            </div>

            <div>
              <label className="label" htmlFor="booking-time">
                Preferred time
              </label>
              <select
                id="booking-time"
                className="field"
                value={formData.preferredTime}
                onChange={(e) => onFormChange('preferredTime', e.target.value)}
                data-testid="select-booking-time"
              >
                <option>Morning · 8:00–11:00</option>
                <option>Midday · 11:00–14:00</option>
                <option>Afternoon · 14:00–17:00</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="label" htmlFor="booking-notes">
                Anything we should know?{' '}
                <span className="font-normal normal-case tracking-normal text-[hsl(var(--muted-foreground))]">
                  optional
                </span>
              </label>
              <textarea
                id="booking-notes"
                className="field min-h-[82px] resize-y"
                value={formData.notes}
                onChange={(e) => onFormChange('notes', e.target.value)}
                placeholder="A sound, a recent ride, a question…"
                data-testid="input-booking-notes"
              />
            </div>

            {error && (
              <p className="sm:col-span-2 text-sm text-[hsl(var(--destructive))]" data-testid="error-booking">
                {error}
              </p>
            )}

            <div className="sm:col-span-2 flex flex-col justify-between gap-4 border-t border-[hsl(var(--border))] pt-5 sm:flex-row sm:items-center">
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Your confirmation details will appear on the next screen.
              </p>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isPending || !hasValidBike}
                data-testid="button-submit-booking"
              >
                {isPending ? 'Saving your slot…' : 'Request this slot'} <Send size={15} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
