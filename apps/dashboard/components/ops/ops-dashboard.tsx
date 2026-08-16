"use client";

import { useState } from "react";
import {
  LayoutGrid,
  Car,
  Users,
  MessageSquare,
  Brain,
  Phone,
  Zap,
  TrendingUp,
  Clock,
  Flame,
  Send,
  PenTool,
  Target,
  Radio,
  Shield,
  Activity,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TabId = "overview" | "listings" | "leads" | "conversations" | "brain";

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "listings", label: "Listings", icon: Car },
  { id: "leads", label: "Leads", icon: Users },
  { id: "conversations", label: "Conversations", icon: MessageSquare },
  { id: "brain", label: "AI Brain", icon: Brain },
];

const hotLeads = [
  { name: "Emeka Johnson", phone: "+2348012345678", interest: "2022 Toyota Land Cruiser Prado", score: 94 },
  { name: "Amina Bello", phone: "+2348023456789", interest: "2023 BMW X5", score: 88 },
  { name: "Chidi Okafor", phone: "+2348034567890", interest: "2021 Honda CR-V", score: 81 },
];

const vehicles = [
  { year: 2022, make: "Toyota", model: "Land Cruiser Prado", price: "₦28,500,000", status: "listed" },
  { year: 2021, make: "Honda", model: "CR-V", price: "₦18,500,000", status: "pending" },
  { year: 2023, make: "BMW", model: "X5", price: "₦52,000,000", status: "listed" },
  { year: 2022, make: "Lexus", model: "RX 350", price: "₦35,000,000", status: "sold" },
];

const conversations = [
  { name: "Emeka Johnson", preview: "Is the Prado still available? Can I see more photos?", time: "2m ago", unread: true },
  { name: "Amina Bello", preview: "What's your best price on the X5?", time: "18m ago", unread: true },
  { name: "Chidi Okafor", preview: "Thanks, I'll come by Saturday to view it.", time: "1h ago", unread: false },
];

const agents = [
  { name: "Pricing Agent", icon: Brain, status: "active", queued: 12 },
  { name: "Description Agent", icon: PenTool, status: "processing", queued: 8 },
  { name: "Lead Agent", icon: Target, status: "active", queued: 24 },
  { name: "Syndication Agent", icon: Radio, status: "processing", queued: 6 },
  { name: "Fraud Agent", icon: Shield, status: "idle", queued: 0 },
  { name: "Market Agent", icon: Activity, status: "active", queued: 3 },
];

const statusStyles: Record<string, string> = {
  listed: "bg-mint/15 text-mint border-mint/30",
  pending: "bg-ember/15 text-ember border-ember/30",
  sold: "bg-ink-500/15 text-ink-300 border-ink-500/30",
};

const agentStatusDot: Record<string, string> = {
  active: "bg-mint",
  processing: "bg-ember",
  idle: "bg-ink-500",
};

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl2 border border-white/8 bg-navy-900/60 p-5">
      <Icon className="h-4 w-4 text-pulse-violet" />
      <div className="mt-3 font-display text-2xl font-semibold text-ink-100">{value}</div>
      <div className="mt-0.5 text-xs text-ink-500">{label}</div>
    </div>
  );
}

function OverviewTab() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
      <div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard icon={Users} label="New leads" value="24" />
          <StatCard icon={Flame} label="Hot leads" value="8" />
          <StatCard icon={Car} label="Listings live" value="68" />
          <StatCard icon={Clock} label="Avg response time" value="12m" />
        </div>

        <div className="mt-6">
          <h3 className="mb-3 font-display text-lg font-semibold text-ink-100">Hot leads</h3>
          <div className="flex flex-col gap-2.5">
            {hotLeads.map((lead, i) => (
              <button
                key={lead.name}
                onClick={() => setSelected(i)}
                className={cn(
                  "focus-ring flex items-center justify-between rounded-xl2 border px-5 py-4 text-left transition-colors duration-150",
                  selected === i
                    ? "border-pulse-violet/50 bg-pulse-violet/10"
                    : "border-white/8 bg-navy-900/50 hover:border-white/20"
                )}
              >
                <div>
                  <div className="font-medium text-ink-100">{lead.name}</div>
                  <div className="mt-0.5 font-mono text-xs text-ink-500">{lead.phone}</div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-ember/30 bg-ember/10 px-2.5 py-1 text-[11px] font-medium text-ember">
                  <Flame className="h-3 w-3" />
                  Hot
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Card className="h-fit p-6">
        {selected === null ? (
          <>
            <div className="font-display text-base font-semibold text-ink-100">Hot lead detail</div>
            <p className="mt-2 text-sm text-ink-500">
              Select a lead to view details and take over the conversation.
            </p>
          </>
        ) : (
          <div>
            <div className="font-display text-base font-semibold text-ink-100">
              {hotLeads[selected].name}
            </div>
            <div className="mt-1 font-mono text-xs text-ink-500">{hotLeads[selected].phone}</div>
            <div className="mt-4 rounded-lg border border-white/8 bg-navy-950/50 p-3 text-xs text-ink-300">
              Interested in <span className="text-ink-100">{hotLeads[selected].interest}</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-ink-500">Lead score</span>
              <span className="font-mono text-ember">{hotLeads[selected].score}/100</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pulse-violet to-pulse-purple"
                style={{ width: `${hotLeads[selected].score}%` }}
              />
            </div>
            <Button size="sm" className="mt-5 w-full">
              <Phone className="h-3.5 w-3.5" />
              Take over conversation
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

function ListingsTab() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((v) => (
        <Card key={`${v.make}-${v.model}`} className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-ink-500">{v.year}</div>
              <div className="mt-0.5 font-display text-base font-semibold text-ink-100">
                {v.make} {v.model}
              </div>
            </div>
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide",
                statusStyles[v.status]
              )}
            >
              {v.status}
            </span>
          </div>
          <div className="mt-4 font-mono text-lg font-semibold text-ink-100">{v.price}</div>
        </Card>
      ))}
    </div>
  );
}

function LeadsTab() {
  return (
    <div className="flex flex-col gap-2.5">
      {[...hotLeads, { name: "Funmi Adeyemi", phone: "+2348045678901", interest: "2023 Hyundai Tucson", score: 62 }].map(
        (lead) => (
          <div
            key={lead.name}
            className="flex items-center justify-between rounded-xl2 border border-white/8 bg-navy-900/50 px-5 py-4"
          >
            <div>
              <div className="font-medium text-ink-100">{lead.name}</div>
              <div className="mt-0.5 text-xs text-ink-500">{lead.interest}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm text-ink-100">{lead.score}</div>
              <div className="text-[11px] text-ink-500">score</div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

function ConversationsTab() {
  return (
    <div className="flex flex-col gap-2">
      {conversations.map((c) => (
        <button
          key={c.name}
          className="focus-ring flex items-center justify-between rounded-xl2 border border-white/8 bg-navy-900/50 px-5 py-4 text-left transition-colors duration-150 hover:border-white/20"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pulse-violet/10 text-pulse-violet">
              <MessageSquare className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-ink-100">{c.name}</span>
                {c.unread && <span className="h-1.5 w-1.5 rounded-full bg-pulse-violet" />}
              </div>
              <div className="mt-0.5 max-w-sm truncate text-xs text-ink-500">{c.preview}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-500">
            <Send className="h-3 w-3" />
            {c.time}
          </div>
        </button>
      ))}
    </div>
  );
}

function AiBrainTab() {
  return (
    <div>
      <div className="mb-6 grid grid-cols-3 gap-3 sm:max-w-lg">
        <StatCard icon={Zap} label="Active agents" value="4" />
        <StatCard icon={TrendingUp} label="Processing now" value="2" />
        <StatCard icon={Activity} label="Queue depth" value="53" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Card key={agent.name} className="p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pulse-violet/10 text-pulse-violet">
                <agent.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-semibold text-ink-100">
                    {agent.name}
                  </span>
                  <span className={cn("h-1.5 w-1.5 rounded-full", agentStatusDot[agent.status])} />
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-ink-500">
                  {agent.queued} queued
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function OpsDashboard() {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <main className="relative min-h-screen bg-navy-950 bg-pulse-radial px-6 py-10">
      <div className="swarm-field opacity-40">
        <div className="swarm-node h-96 w-96 bg-pulse-violet/15 -top-32 -left-32" />
        <div
          className="swarm-node h-80 w-80 bg-pulse-deep/25 bottom-0 right-0"
          style={{ animationDelay: "2s" }}
        />
      </div>
      <div className="grain-overlay" />

      <div className="relative mx-auto max-w-6xl">
        <h1 className="font-display text-3xl font-semibold text-ink-100 sm:text-4xl">
          Renovate Car Brain Dashboard
        </h1>
        <p className="mt-2 text-sm text-ink-300">
          Monitor listings, leads, conversations, and AI performance in real time.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "focus-ring flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150",
                tab === t.id
                  ? "chrome-sweep border-pulse-violet/50 bg-pulse-violet/15 text-ink-100"
                  : "border-white/10 bg-navy-900/50 text-ink-300 hover:border-white/25 hover:text-ink-100"
              )}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8 animate-rise">
          {tab === "overview" && <OverviewTab />}
          {tab === "listings" && <ListingsTab />}
          {tab === "leads" && <LeadsTab />}
          {tab === "conversations" && <ConversationsTab />}
          {tab === "brain" && <AiBrainTab />}
        </div>
      </div>
    </main>
  );
}
