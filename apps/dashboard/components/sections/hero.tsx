"use client";

import { useState } from "react";
import { Car, User, ArrowRight, Sparkles, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DealerType } from "@/types";

const stats = [
  {
    icon: TrendingUp,
    value: "9x",
    label: "More Likely to Buy",
    detail: "when a lead gets a reply inside 5 minutes",
  },
  {
    icon: Car,
    value: "37%",
    label: "More Trade-ins",
    detail: "captured with AI-guided trade appraisals",
  },
  {
    icon: Shield,
    value: "10x",
    label: "ROI",
    detail: "average return within the first 90 days",
  },
];

export function Hero() {
  const [sellerType, setSellerType] = useState<DealerType>("dealer");

  return (
    <section className="relative overflow-hidden bg-navy-950 bg-pulse-radial pt-8 pb-24 sm:pt-10 sm:pb-32">
      <div className="swarm-field">
        <div className="swarm-node h-[26rem] w-[26rem] bg-pulse-violet/25 -top-24 -left-24" />
        <div
          className="swarm-node h-[22rem] w-[22rem] bg-pulse-magenta/20 top-1/3 -right-16"
          style={{ animationDelay: "1.2s" }}
        />
        <div
          className="swarm-node h-[18rem] w-[18rem] bg-pulse-deep/40 bottom-0 left-1/3"
          style={{ animationDelay: "2.4s" }}
        />
      </div>
      {/* headlight beams: two angled cones of light piercing the dark, like a car at night */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
        <div
          className="absolute -top-10 left-[8%] h-[42rem] w-40 origin-top animate-headlight bg-gradient-to-b from-pulse-violet/25 via-pulse-violet/5 to-transparent blur-2xl"
          style={{ transform: "rotate(18deg)" }}
        />
        <div
          className="absolute -top-10 right-[8%] h-[42rem] w-40 origin-top animate-headlight bg-gradient-to-b from-pulse-violet/25 via-pulse-violet/5 to-transparent blur-2xl"
          style={{ transform: "rotate(-18deg)", animationDelay: "1.4s" }}
        />
      </div>
      <div className="grain-overlay" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        {/* wordmark + badge */}
        <div className="mb-8 flex flex-col items-center gap-4 animate-rise">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pulse-violet to-pulse-purple text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-semibold tracking-[0.14em] text-ink-100">
              AUTOCLAW
            </span>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-pulse-violet/30 bg-pulse-violet/10 px-3.5 py-1.5 text-xs font-medium text-ink-300 font-mono">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
            </span>
            Now serving Abuja dealers
          </span>
        </div>

        {/* headline */}
        <h1
          className="animate-rise font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink-100 sm:text-6xl md:text-7xl"
          style={{ animationDelay: "0.1s" }}
        >
          Sell Cars <span className="text-gradient">9x Faster</span>
        </h1>
        <p
          className="mt-6 max-w-xl animate-rise text-balance text-base text-ink-300 sm:text-lg"
          style={{ animationDelay: "0.18s" }}
        >
          A swarm of AI agents prices your stock, writes the listing, syndicates it
          everywhere, and chases every lead — while you run the floor.
        </p>

        {/* dealer / private toggle */}
        <div
          className="mt-10 grid w-full max-w-md animate-rise grid-cols-2 gap-3"
          style={{ animationDelay: "0.26s" }}
          role="radiogroup"
          aria-label="I am a"
        >
          <button
            type="button"
            role="radio"
            aria-checked={sellerType === "dealer"}
            onClick={() => setSellerType("dealer")}
            className={cn(
              "focus-ring flex flex-col items-center gap-2 rounded-xl2 border px-4 py-5 transition-all duration-200",
              sellerType === "dealer"
                ? "border-pulse-violet/60 bg-pulse-violet/10 shadow-[0_0_0_1px_rgba(139,92,246,0.35)]"
                : "border-white/10 bg-navy-900/60 hover:border-white/20"
            )}
          >
            <Car
              className={cn(
                "h-5 w-5",
                sellerType === "dealer" ? "text-pulse-violet" : "text-ink-500"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium",
                sellerType === "dealer" ? "text-ink-100" : "text-ink-300"
              )}
            >
              I'm a Dealer
            </span>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={sellerType === "private"}
            onClick={() => setSellerType("private")}
            className={cn(
              "focus-ring flex flex-col items-center gap-2 rounded-xl2 border px-4 py-5 transition-all duration-200",
              sellerType === "private"
                ? "border-pulse-violet/60 bg-pulse-violet/10 shadow-[0_0_0_1px_rgba(139,92,246,0.35)]"
                : "border-white/10 bg-navy-900/60 hover:border-white/20"
            )}
          >
            <User
              className={cn(
                "h-5 w-5",
                sellerType === "private" ? "text-pulse-violet" : "text-ink-500"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium",
                sellerType === "private" ? "text-ink-100" : "text-ink-300"
              )}
            >
              Private Seller
            </span>
          </button>
        </div>

        <div className="mt-8 animate-rise" style={{ animationDelay: "0.34s" }}>
          <Button size="lg" className="group">
            Get Started Free
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </div>

        {/* stat cards */}
        <div
          className="mt-20 grid w-full animate-rise grid-cols-1 gap-4 sm:grid-cols-3"
          style={{ animationDelay: "0.42s" }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl2 border border-white/8 bg-navy-900/50 p-6 text-left backdrop-blur-sm transition-colors duration-200 hover:border-pulse-violet/30"
            >
              <stat.icon className="h-5 w-5 text-pulse-violet" />
              <div className="mt-4 font-display text-3xl font-semibold text-ink-100">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium text-ink-300">{stat.label}</div>
              <div className="mt-1 text-xs text-ink-500">{stat.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
