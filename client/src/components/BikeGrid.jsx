import React from 'react';
import { Bike, Wrench, Check, ArrowDownRight, CircleAlert, RotateCcw } from 'lucide-react';

export default function BikeGrid({
  bikes = [],
  selectedId,
  onSelect,
  onSelectOther,
  isLoading,
  isError,
  onRetry,
  customBikeName,
  onCustomBikeChange,
  isOther,
  selectedBike
}) {
  return (
    <section id="garage" className="section-pad soft-grid">
      <div className="container-wide">
        <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="section-kicker">01 / Your garage</p>
            <h2 className="display-font mt-3 text-4xl font-extrabold tracking-[-0.05em] md:text-5xl">
              Start with the machine.
            </h2>
          </div>
          <p className="max-w-[280px] text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
            The right context makes every answer sharper. Pick your bike and we’ll do the translating.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-testid="loading-bikes">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="shimmer h-[172px] rounded-[1.25rem]" />
            ))}
          </div>
        ) : isError ? (
          <div
            className="flex flex-col items-start gap-3 rounded-2xl border border-[hsl(var(--accent)/.4)] bg-[hsl(var(--accent)/.12)] p-5 sm:flex-row sm:items-center"
            data-testid="error-bikes"
          >
            <CircleAlert className="shrink-0 text-[hsl(var(--accent))]" size={22} />
            <p className="flex-1 text-sm text-[hsl(var(--foreground))]">
              We couldn’t load the bike garage.
            </p>
            <button
              type="button"
              className="btn btn-ghost text-sm"
              onClick={onRetry}
              data-testid="error-bikes-retry"
            >
              <RotateCcw size={15} /> Try again
            </button>
          </div>
        ) : bikes.length === 0 ? (
          <div className="card-surface p-8 text-center" data-testid="empty-bikes">
            <Bike className="mx-auto mb-3 text-[hsl(var(--muted-foreground))]" size={32} />
            <p className="font-semibold">The garage is quiet right now.</p>
            <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
              Check back soon for supported bikes.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {bikes.map((bike) => {
              const isSelected = selectedId === bike.id;
              return (
                <button
                  key={bike.id}
                  type="button"
                  data-testid={`button-select-bike-${bike.id}`}
                  onClick={() => onSelect(bike)}
                  className={`bike-card card-surface focus-ring p-4 text-left ${
                    isSelected ? 'selected' : ''
                  }`}
                >
                  <div className="mb-5 flex items-start justify-between">
                    <span
                      className="bike-mark grid h-10 w-10 place-items-center rounded-xl"
                      style={{ '--bike-accent': bike.accent }}
                    >
                      <Bike size={20} strokeWidth={2.3} />
                    </span>
                    {isSelected ? (
                      <Check size={19} className="text-[hsl(var(--foreground))]" />
                    ) : (
                      <ArrowDownRight size={18} className="text-[hsl(var(--muted-foreground))]" />
                    )}
                  </div>
                  <p className="mono-font mb-1 text-[10px] uppercase tracking-[0.13em] text-[hsl(var(--muted-foreground))]">
                    {bike.brand} · {bike.category}
                  </p>
                  <h3 className="display-font text-[1.12rem] font-bold">{bike.model}</h3>
                  <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                    {bike.yearRange} · {bike.engine}
                  </p>
                </button>
              );
            })}

            <button
              type="button"
              data-testid="button-select-bike-other"
              onClick={onSelectOther}
              className={`bike-card card-surface focus-ring p-4 text-left ${
                isOther ? 'selected' : ''
              }`}
            >
              <div className="mb-5 flex items-start justify-between">
                <span
                  className="bike-mark grid h-10 w-10 place-items-center rounded-xl"
                  style={{ '--bike-accent': 'hsl(var(--accent))' }}
                >
                  <Wrench size={20} strokeWidth={2.3} />
                </span>
                {isOther ? (
                  <Check size={19} />
                ) : (
                  <ArrowDownRight size={18} className="text-[hsl(var(--muted-foreground))]" />
                )}
              </div>
              <p className="mono-font mb-1 text-[10px] uppercase tracking-[0.13em] text-[hsl(var(--muted-foreground))]">
                Any make · Any model
              </p>
              <h3 className="display-font text-[1.12rem] font-bold">Other bike</h3>
              <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                Type it in yourself
              </p>
            </button>
          </div>
        )}

        {isOther && (
          <div className="mt-4 max-w-xl">
            <label className="label" htmlFor="custom-bike-name">
              Your bike
            </label>
            <input
              id="custom-bike-name"
              className="field"
              value={customBikeName}
              onChange={(e) => onCustomBikeChange(e.target.value)}
              placeholder="Example: Honda Activa 6G"
              data-testid="input-custom-bike-name"
            />
            <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
              Use any make, model, or year — we’ll keep your description as the main clue.
            </p>
          </div>
        )}

        {Boolean(selectedBike || (isOther && customBikeName.trim())) && (
          <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]" data-testid="text-selected-bike">
            Selected:{' '}
            <strong className="text-[hsl(var(--foreground))]">
              {isOther ? customBikeName : `${selectedBike.brand} ${selectedBike.model}`}
            </strong>{' '}
            · ready for a closer look.
          </p>
        )}
      </div>
    </section>
  );
}
