import React from 'react';
import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import {
  Wrench,
  Check,
  ArrowLeft,
  Mail,
  Phone,
  CalendarDays,
  Clock,
  MapPin,
  Download,
  RotateCcw
} from 'lucide-react';
import { fetchBooking } from '../lib/api.js';

export default function BookingReceipt() {
  const params = useParams();
  const idOrRef = params.id;
  const isNumeric = Number.isFinite(Number(idOrRef)) && Number(idOrRef) > 0;
  const hasParam = Boolean(idOrRef);

  const { data: booking, isLoading, isError } = useQuery({
    queryKey: [`/api/bookings/${idOrRef}`],
    queryFn: () => fetchBooking(idOrRef),
    enabled: hasParam
  });

  if (!hasParam || isError) {
    return (
      <div className="page-shell noise flex min-h-[100dvh] items-center justify-center px-5">
        <div
          className="card-surface w-full max-w-lg p-8 text-center sm:p-12"
          data-testid="error-booking-page"
        >
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[hsl(var(--accent)/.15)] text-[hsl(var(--accent))]">
            <RotateCcw size={25} />
          </span>
          <p className="section-kicker mt-7">Booking lookup</p>
          <h1 className="display-font mt-3 text-4xl font-extrabold tracking-[-.05em]">
            That receipt went missing.
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
            We couldn’t find a booking with that reference. Head back to the garage and we’ll get
            you sorted.
          </p>
          <Link href="/" className="btn btn-dark mt-8" data-testid="link-back-home-error">
            <ArrowLeft size={16} /> Back to BikeCare AI
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !booking) {
    return (
      <div className="page-shell noise flex min-h-[100dvh] items-center justify-center px-5">
        <div className="mx-auto w-full max-w-3xl space-y-4" data-testid="loading-booking">
          <div className="shimmer h-10 w-40 rounded-xl" />
          <div className="shimmer h-[420px] rounded-[1.5rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell noise">
      <header className="border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/.86)] backdrop-blur-md">
        <div className="container-wide flex items-center justify-between py-5">
          <Link href="/" className="focus-ring flex items-center gap-2.5" data-testid="link-booking-logo">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
              <Wrench size={18} />
            </span>
            <span className="display-font text-lg font-extrabold tracking-[-.04em]">
              BikeCare<span className="text-[hsl(var(--accent))]">AI</span>
            </span>
          </Link>

          <Link href="/#contact" className="btn btn-ghost py-2 text-sm" data-testid="link-booking-contact">
            Need a hand? <Mail size={15} />
          </Link>
        </div>
      </header>

      <main className="container-wide section-pad">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="focus-ring mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
            data-testid="link-back-home"
          >
            <ArrowLeft size={16} /> Back to garage
          </Link>

          <div className="card-surface overflow-hidden" data-testid="booking-receipt">
            <div className="relative overflow-hidden bg-[hsl(var(--secondary))] px-6 py-10 text-[hsl(var(--background))] sm:px-12 sm:py-14">
              <div className="absolute -right-8 -top-16 h-48 w-48 rounded-full border-[24px] border-[hsl(var(--primary)/.2)]" />
              <div className="relative">
                <span
                  className="grid h-14 w-14 place-items-center rounded-2xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                  data-testid="status-booking-success"
                >
                  <Check size={28} strokeWidth={3} />
                </span>
                <p className="mono-font mt-7 text-[10px] uppercase tracking-[.18em] text-[hsl(var(--background)/.55)]">
                  Booking requested
                </p>
                <h1 className="display-font mt-3 max-w-[520px] text-4xl font-extrabold leading-[.95] tracking-[-.06em] sm:text-6xl">
                  Your next ride has a plan.
                </h1>
                <p className="mt-5 max-w-[480px] text-sm leading-relaxed text-[hsl(var(--background)/.68)]">
                  Your booking is saved. Keep this reference handy for your workshop visit.
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-12">
              <div className="flex flex-col justify-between gap-4 border-b border-[hsl(var(--border))] pb-7 sm:flex-row sm:items-end">
                <div>
                  <p className="section-kicker">Booking reference</p>
                  <p className="mono-font mt-2 text-2xl font-bold tracking-[.08em]" data-testid="text-booking-reference">
                    {booking.reference}
                  </p>
                </div>
                <span className="pill bg-[hsl(var(--primary)/.18)] text-xs capitalize" data-testid="status-booking">
                  {booking.status}
                </span>
              </div>

              <div className="grid gap-8 py-8 sm:grid-cols-2">
                <div>
                  <p className="section-kicker">Rider</p>
                  <p className="mt-3 font-semibold" data-testid="text-booking-name">
                    {booking.name}
                  </p>
                  <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                    {booking.email}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                    <Phone size={14} /> {booking.phone}
                  </p>
                </div>

                <div>
                  <p className="section-kicker">Bike</p>
                  <p className="mt-3 font-semibold" data-testid="text-booking-bike">
                    {booking.bikeName}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                    <Wrench size={14} /> {booking.service}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 border-y border-[hsl(var(--border))] py-5 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl bg-[hsl(var(--muted))] p-4">
                  <CalendarDays size={18} className="text-[hsl(var(--accent))]" />
                  <div>
                    <p className="mono-font text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">
                      Preferred date
                    </p>
                    <p className="mt-1 text-sm font-semibold" data-testid="text-booking-date">
                      {booking.preferredDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-[hsl(var(--muted))] p-4">
                  <Clock size={18} className="text-[hsl(var(--accent))]" />
                  <div>
                    <p className="mono-font text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">
                      Preferred time
                    </p>
                    <p className="mt-1 text-sm font-semibold" data-testid="text-booking-time">
                      {booking.preferredTime}
                    </p>
                  </div>
                </div>
              </div>

              {booking.notes && (
                <div className="mt-7 rounded-xl border border-dashed border-[hsl(var(--border))] p-4">
                  <p className="section-kicker">Your note</p>
                  <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {booking.notes}
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <p className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                  <MapPin size={14} /> We’ll follow up with the confirmed workshop details.
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => window.print()}
                  data-testid="button-print-booking"
                >
                  <Download size={15} /> Save receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[hsl(var(--secondary))] py-7 text-center text-xs text-[hsl(var(--background)/.6)]">
        BikeCare<span className="text-[hsl(var(--primary))]">AI</span> · Keep the ride ready.
      </footer>
    </div>
  );
}
