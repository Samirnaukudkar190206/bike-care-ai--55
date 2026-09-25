import React from 'react';
import { Star } from 'lucide-react';

export default function ProofSection({ insights, bookingsCount, isLoading }) {
  return (
    <section className="bg-[hsl(var(--primary))] py-16">
      <div className="container-wide grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <p className="mono-font text-[10px] font-bold uppercase tracking-[.16em] text-[hsl(var(--primary-foreground)/.65)]">
            Garage signals
          </p>
          <h2 className="display-font mt-2 text-3xl font-extrabold tracking-[-.04em] md:text-4xl text-[hsl(var(--primary-foreground))]">
            A little proof goes a long way.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-9 gap-y-5 sm:grid-cols-4 md:gap-x-12 text-[hsl(var(--primary-foreground))]">
          <div>
            <p className="display-font text-3xl font-bold">
              {insights?.bookingsThisMonth ?? (isLoading ? '—' : bookingsCount)}
            </p>
            <p className="mt-1 text-xs font-semibold text-[hsl(var(--primary-foreground)/.65)]">
              bookings this month
            </p>
          </div>

          <div>
            <p className="display-font flex items-center gap-1 text-3xl font-bold">
              {insights?.averageRating?.toFixed(1) ?? '4.9'}{' '}
              <Star size={17} fill="currentColor" />
            </p>
            <p className="mt-1 text-xs font-semibold text-[hsl(var(--primary-foreground)/.65)]">
              rider rating
            </p>
          </div>

          <div>
            <p className="display-font text-3xl font-bold">
              {insights?.bikesSupported ?? '5'}
            </p>
            <p className="mt-1 text-xs font-semibold text-[hsl(var(--primary-foreground)/.65)]">
              bikes supported
            </p>
          </div>

          <div>
            <p className="display-font text-3xl font-bold">
              {insights?.responseTime ?? '< 15 min'}
            </p>
            <p className="mt-1 text-xs font-semibold text-[hsl(var(--primary-foreground)/.65)]">
              response time
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
