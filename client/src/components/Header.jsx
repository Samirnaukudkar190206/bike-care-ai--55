import React from 'react';
import { Wrench, ArrowRight } from 'lucide-react';

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="container-wide flex items-center justify-between py-5">
        <a href="#top" className="focus-ring flex items-center gap-2.5" data-testid="link-home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
            <Wrench size={18} />
          </span>
          <span className="display-font text-lg font-extrabold tracking-[-0.04em]">
            BikeCare<span className="text-[hsl(var(--accent))]">AI</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
          <a href="#garage" className="focus-ring transition-opacity hover:opacity-60" data-testid="link-garage">
            Garage
          </a>
          <a href="#guide" className="focus-ring transition-opacity hover:opacity-60" data-testid="link-guide">
            Guided help
          </a>
          <a href="#contact" className="focus-ring transition-opacity hover:opacity-60" data-testid="link-contact">
            Contact
          </a>
        </nav>

        <a href="#book" className="btn btn-primary py-2.5 text-sm" data-testid="link-book-header">
          Book a service <ArrowRight size={15} />
        </a>
      </div>
    </header>
  );
}
