import Link from "next/link";
import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("mx-auto w-full max-w-6xl px-5", className)}>{children}</div>;
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  type,
  className,
  children,
  onClick,
}: {
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors whitespace-nowrap",
    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-5 py-2.5 text-sm",
    size === "lg" && "px-7 py-3.5 text-base",
    variant === "primary" && "bg-brand-700 text-white hover:bg-brand-800",
    variant === "secondary" && "bg-accent-400 text-ink-950 hover:bg-accent-500",
    variant === "outline" && "border border-ink-900/15 text-ink-900 hover:bg-ink-50",
    variant === "ghost" && "text-ink-900 hover:bg-ink-50",
    className
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function Badge({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "accent" | "ink" | "placeholder" }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
        tone === "brand" && "bg-brand-100 text-brand-800",
        tone === "accent" && "bg-accent-100 text-accent-800",
        tone === "ink" && "bg-ink-100 text-ink-700",
        tone === "placeholder" && "bg-amber-100 text-amber-800"
      )}
    >
      {children}
    </span>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={clsx("rounded-2xl border border-ink-900/8 bg-white p-6 shadow-sm", className)}>{children}</div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{children}</p>;
}

export function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
      <strong className="font-semibold">Namuna ma&apos;lumot.</strong> {children}
    </p>
  );
}

export function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-xl border border-ink-900/8 bg-white px-5 py-4 open:bg-brand-50/40">
      <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-ink-900">
        {q}
        <span className="ml-4 shrink-0 text-ink-500 transition-transform group-open:rotate-45">+</span>
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-ink-700">{a}</p>
    </details>
  );
}
