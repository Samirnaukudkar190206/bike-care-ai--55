import React from 'react';
import { Link } from 'wouter';
import { CircleOff, Wrench, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="page-shell noise flex min-h-[100dvh] items-center justify-center px-5">
      <div
        className="card-surface w-full max-w-lg p-8 text-center sm:p-12"
        data-testid="page-not-found"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
          <CircleOff size={25} />
        </span>
        <p className="section-kicker mt-7">Wrong turn</p>
        <h1 className="display-font mt-3 text-5xl font-extrabold tracking-[-.06em]">
          Road closed.
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
          That page isn’t on the route. Let’s get you back to your garage.
        </p>
        <Link href="/" className="btn btn-dark mt-8" data-testid="link-not-found-home">
          <Wrench size={16} /> Back to BikeCare AI <ArrowLeft size={16} />
        </Link>
      </div>
    </div>
  );
}
