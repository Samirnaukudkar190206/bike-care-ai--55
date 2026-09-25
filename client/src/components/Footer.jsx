import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[hsl(var(--secondary))] py-7 text-[hsl(var(--background)/.65)]">
      <div className="container-wide flex flex-col justify-between gap-3 text-xs sm:flex-row sm:items-center">
        <p className="display-font font-bold text-[hsl(var(--background))]">
          BikeCare<span className="text-[hsl(var(--primary))]">AI</span>
        </p>
        <p>Built for the ride between “what was that?” and “all good.”</p>
        <p className="mono-font text-[10px] uppercase tracking-[.13em]">
          © 2025 BikeCare AI
        </p>
      </div>
    </footer>
  );
}
