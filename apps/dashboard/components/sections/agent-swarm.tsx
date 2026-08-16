"use client";

import { useState } from "react";
import { Brain, PenTool, Target, Radio, Shield, Activity, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AgentStatus, AgentWorker } from "@/types";

const agentIcons: Record<string, React.ElementType> = {
  pricing: Brain,
  description: PenTool,
  lead: Target,
  syndication: Radio,
  fraud: Shield,
  market: Activity,
};

const agents: AgentWorker[] = [
  {
    id: "pricing",
    name: "Pricing Agent",
    role: "pricing",
    status: "active",
    queueDepth: 12,
    throughputPerHour: 340,
    errorRatePct: 0.4,
    lastProcessed: "4s ago",
    workerPid: "pid-7741",
    description: "Benchmarks every listing against live market comps and adjusts asking price.",
  },
  {
    id: "description",
    name: "Description Agent",
    role: "description",
    status: "processing",
    queueDepth: 8,
    throughputPerHour: 210,
    errorRatePct: 0.9,
    lastProcessed: "1s ago",
    workerPid: "pid-7742",
    description: "Writes and rewrites listing copy tuned for each syndication channel.",
  },
  {
    id: "lead",
    name: "Lead Agent",
    role: "lead",
    status: "active",
    queueDepth: 24,
    throughputPerHour: 588,
    errorRatePct: 0.2,
    lastProcessed: "2s ago",
    workerPid: "pid-7743",
    description: "Scores and routes inbound leads, then opens the first WhatsApp reply.",
  },
  {
    id: "syndication",
    name: "Syndication Agent",
    role: "syndication",
    status: "processing",
    queueDepth: 6,
    throughputPerHour: 155,
    errorRatePct: 1.1,
    lastProcessed: "6s ago",
    workerPid: "pid-7744",
    description: "Pushes listings to Facebook, Instagram, Jiji.ng, and Cars45 in parallel.",
  },
  {
    id: "fraud",
    name: "Fraud Agent",
    role: "fraud",
    status: "idle",
    queueDepth: 0,
    throughputPerHour: 0,
    errorRatePct: 0,
    lastProcessed: "11m ago",
    workerPid: "pid-7745",
    description: "Flags suspicious buyer messages and duplicate listing attempts.",
  },
  {
    id: "market",
    name: "Market Agent",
    role: "market",
    status: "active",
    queueDepth: 3,
    throughputPerHour: 64,
    errorRatePct: 0.1,
    lastProcessed: "18s ago",
    workerPid: "pid-7746",
    description: "Tracks Abuja market velocity and surfaces underpriced trade-in opportunities.",
  },
];

const statusDot: Record<AgentStatus, string> = {
  active: "bg-mint",
  processing: "bg-ember",
  idle: "bg-ink-500",
};

const statusLabel: Record<AgentStatus, string> = {
  active: "Active",
  processing: "Processing",
  idle: "Idle",
};

function AgentCard({ agent }: { agent: AgentWorker }) {
  const [open, setOpen] = useState(false);
  const Icon = agentIcons[agent.role] ?? Brain;

  return (
    <Card className="overflow-hidden transition-colors duration-200 hover:border-pulse-violet/30">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="focus-ring flex w-full items-start justify-between gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pulse-violet/10 text-pulse-violet">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-semibold text-ink-100">
                {agent.name}
              </span>
              <span className={cn("h-1.5 w-1.5 rounded-full", statusDot[agent.status])} />
            </div>
            <p className="mt-1 text-xs leading-relaxed text-ink-500">{agent.description}</p>
            <div className="mt-3 flex items-center gap-3 font-mono text-[11px] text-ink-500">
              <span>{statusLabel[agent.status]}</span>
              <span className="text-white/15">·</span>
              <span>{agent.queueDepth} queued</span>
              <span className="text-white/15">·</span>
              <span>{agent.lastProcessed}</span>
            </div>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "mt-1 h-4 w-4 shrink-0 text-ink-500 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="border-t border-white/8 bg-navy-950/40 px-5 py-4">
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-ink-500">
            <span>Queue depth</span>
            <span className="font-mono">{agent.queueDepth} / 30</span>
          </div>
          <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pulse-violet to-pulse-magenta"
              style={{ width: `${Math.min(100, (agent.queueDepth / 30) * 100)}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 font-mono text-xs">
            <div>
              <div className="text-ink-500">Throughput</div>
              <div className="mt-0.5 text-ink-100">{agent.throughputPerHour}/hr</div>
            </div>
            <div>
              <div className="text-ink-500">Error rate</div>
              <div className="mt-0.5 text-ink-100">{agent.errorRatePct}%</div>
            </div>
            <div>
              <div className="text-ink-500">Worker</div>
              <div className="mt-0.5 text-ink-100">{agent.workerPid}</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export function AgentSwarm() {
  const activeCount = agents.filter((a) => a.status === "active").length;
  const processingCount = agents.filter((a) => a.status === "processing").length;
  const totalQueue = agents.reduce((sum, a) => sum + a.queueDepth, 0);

  return (
    <section id="agents" className="relative overflow-hidden bg-navy-950 px-6 py-24">
      <div className="swarm-field opacity-60">
        <div className="swarm-node h-72 w-72 bg-pulse-purple/25 top-10 right-10" />
        <div
          className="swarm-node h-64 w-64 bg-pulse-deep/30 bottom-0 left-0"
          style={{ animationDelay: "1.8s" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3.5 py-1.5 font-mono text-xs text-mint">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
            </span>
            6 BullMQ Workers Active
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold text-ink-100 sm:text-4xl">
            Agent Swarm Status
          </h2>
          <p className="mt-2 max-w-md text-sm text-ink-300">
            Six specialized workers run continuously against your inventory and lead queue.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-3 sm:mx-auto sm:max-w-lg">
          {[
            { label: "Active Agents", value: activeCount },
            { label: "Processing Now", value: processingCount },
            { label: "Queue Depth", value: totalQueue },
          ].map((s) => (
            <div key={s.label} className="rounded-xl2 border border-white/8 bg-navy-900/50 p-4 text-center">
              <div className="font-display text-2xl font-semibold text-ink-100">{s.value}</div>
              <div className="mt-0.5 text-[11px] text-ink-500">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  );
}
