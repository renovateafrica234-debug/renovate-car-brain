"use client";

import { useState } from "react";
import {
  TrendingUp,
  Smile,
  Workflow,
  Users,
  Database,
  Globe,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEP_LABELS = ["Goal", "Fleet size", "Brands", "Platforms"];

const goals = [
  { id: "close-rate", label: "Improve close rate", icon: TrendingUp },
  { id: "experience", label: "Better buyer experience", icon: Smile },
  { id: "digital", label: "Go fully digital", icon: Workflow },
  { id: "leads", label: "Increase leads", icon: Users },
  { id: "data", label: "Cleaner inventory data", icon: Database },
  { id: "presence", label: "Build online presence", icon: Globe },
];

const fleetSizes = [
  { id: "1-5", label: "1–5", sub: "vehicles" },
  { id: "6-20", label: "6–20", sub: "vehicles" },
  { id: "20-50", label: "20–50", sub: "vehicles" },
  { id: "50+", label: "50+", sub: "vehicles" },
];

const brands = [
  "Toyota",
  "Honda",
  "Lexus",
  "Mercedes",
  "BMW",
  "Hyundai",
  "Kia",
  "Nissan",
  "Ford",
  "VW",
  "Audi",
  "Other",
];

const platforms = ["WhatsApp", "Instagram", "Facebook", "Jiji.ng", "Cars45", "Excel", "None"];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-10">
      <div className="mb-3 flex items-center justify-between font-mono text-xs text-ink-500">
        <span>
          Step {step + 1} of {STEP_LABELS.length}
        </span>
        <span>{STEP_LABELS[step]}</span>
      </div>
      <div className="flex gap-1.5">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
            <div
              className={cn(
                "h-full rounded-full bg-gradient-to-r from-pulse-violet to-pulse-magenta transition-all duration-500",
                i <= step ? "w-full" : "w-0"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "focus-ring rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150",
        active
          ? "border-pulse-violet/60 bg-pulse-violet/15 text-ink-100"
          : "border-white/10 bg-navy-900/60 text-ink-300 hover:border-white/25 hover:text-ink-100"
      )}
    >
      {children}
    </button>
  );
}

export function Onboarding() {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<string | null>(null);
  const [fleetSize, setFleetSize] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [launched, setLaunched] = useState(false);

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));

  const togglePlatform = (p: string) =>
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );

  const canContinue =
    (step === 0 && !!goal) ||
    (step === 1 && !!fleetSize) ||
    (step === 2 && selectedBrands.length > 0) ||
    (step === 3 && selectedPlatforms.length > 0);

  const isLastStep = step === STEP_LABELS.length - 1;

  if (launched) {
    return (
      <section id="onboarding" className="bg-navy-950 px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pulse-violet to-pulse-purple">
            <Check className="h-7 w-7 text-white" />
          </div>
          <h3 className="mt-6 font-display text-2xl font-semibold text-ink-100">
            Your dashboard is warming up
          </h3>
          <p className="mt-2 text-sm text-ink-300">
            The agent swarm is indexing your {fleetSize} vehicle range across{" "}
            {selectedPlatforms.length} platform{selectedPlatforms.length === 1 ? "" : "s"}.
          </p>
          <Button
            variant="secondary"
            className="mt-8"
            onClick={() => {
              setLaunched(false);
              setStep(0);
            }}
          >
            Restart setup
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="onboarding" className="relative bg-navy-950 px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-pulse-violet">
            Setup
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink-100 sm:text-4xl">
            Tell the swarm what you need
          </h2>
          <p className="mt-2 text-sm text-ink-300">
            Four quick steps and your inventory starts working for you.
          </p>
        </div>

        <Card className="p-2">
          <CardContent>
            <ProgressBar step={step} />

            {step === 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGoal(g.id)}
                    className={cn(
                      "focus-ring flex flex-col items-center gap-2.5 rounded-xl2 border px-3 py-5 text-center transition-all duration-150",
                      goal === g.id
                        ? "border-pulse-violet/60 bg-pulse-violet/10"
                        : "border-white/8 bg-navy-900/50 hover:border-white/20"
                    )}
                  >
                    <g.icon
                      className={cn(
                        "h-5 w-5",
                        goal === g.id ? "text-pulse-violet" : "text-ink-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs font-medium leading-snug",
                        goal === g.id ? "text-ink-100" : "text-ink-300"
                      )}
                    >
                      {g.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {fleetSizes.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFleetSize(f.id)}
                    className={cn(
                      "focus-ring flex flex-col items-center gap-1 rounded-xl2 border px-3 py-6 transition-all duration-150",
                      fleetSize === f.id
                        ? "border-pulse-violet/60 bg-pulse-violet/10"
                        : "border-white/8 bg-navy-900/50 hover:border-white/20"
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-xl font-semibold",
                        fleetSize === f.id ? "text-ink-100" : "text-ink-300"
                      )}
                    >
                      {f.label}
                    </span>
                    <span className="text-[11px] text-ink-500">{f.sub}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-wrap gap-2.5">
                {brands.map((b) => (
                  <PillButton key={b} active={selectedBrands.includes(b)} onClick={() => toggleBrand(b)}>
                    {b}
                  </PillButton>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-wrap gap-2.5">
                {platforms.map((p) => (
                  <PillButton
                    key={p}
                    active={selectedPlatforms.includes(p)}
                    onClick={() => togglePlatform(p)}
                  >
                    {p}
                  </PillButton>
                ))}
              </div>
            )}

            <div className="mt-10 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className={cn(step === 0 && "invisible")}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              {isLastStep ? (
                <Button disabled={!canContinue} onClick={() => setLaunched(true)}>
                  Launch Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button disabled={!canContinue} onClick={() => setStep((s) => s + 1)}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
