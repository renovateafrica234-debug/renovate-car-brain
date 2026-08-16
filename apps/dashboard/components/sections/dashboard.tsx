"use client";

import { useMemo, useState } from "react";
import { Search, Plus, Zap, Facebook, Instagram, Globe2, Car } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Vehicle, VehicleStatus, SyndicationChannel } from "@/types";

const vehicles: Vehicle[] = [
  {
    id: "v1",
    year: 2022,
    make: "Toyota",
    model: "Land Cruiser Prado",
    priceNaira: 28_500_000,
    status: "listed",
    aiOptimized: true,
    syndicatedTo: ["facebook", "instagram", "jiji", "cars45"],
  },
  {
    id: "v2",
    year: 2021,
    make: "Honda",
    model: "CR-V",
    priceNaira: 18_500_000,
    status: "pending",
    aiOptimized: true,
    syndicatedTo: ["facebook", "jiji"],
  },
  {
    id: "v3",
    year: 2023,
    make: "BMW",
    model: "X5",
    priceNaira: 52_000_000,
    status: "listed",
    aiOptimized: true,
    syndicatedTo: ["facebook", "instagram", "cars45"],
  },
  {
    id: "v4",
    year: 2022,
    make: "Lexus",
    model: "RX 350",
    priceNaira: 35_000_000,
    status: "sold",
    aiOptimized: true,
    syndicatedTo: ["instagram", "jiji"],
  },
  {
    id: "v5",
    year: 2023,
    make: "Hyundai",
    model: "Tucson",
    priceNaira: 22_000_000,
    status: "draft",
    aiOptimized: false,
    syndicatedTo: [],
  },
];

const statusStyles: Record<VehicleStatus, string> = {
  listed: "bg-mint/15 text-mint border-mint/30",
  pending: "bg-ember/15 text-ember border-ember/30",
  sold: "bg-ink-500/15 text-ink-300 border-ink-500/30",
  draft: "bg-blush/15 text-blush border-blush/30",
};

const filterTabs: (VehicleStatus | "all")[] = ["all", "listed", "pending", "sold", "draft"];

const channelIcon: Record<SyndicationChannel, React.ElementType> = {
  facebook: Facebook,
  instagram: Instagram,
  jiji: Globe2,
  cars45: Car,
};

const channelColor: Record<SyndicationChannel, string> = {
  facebook: "text-[#4C8DFF]",
  instagram: "text-[#E1478E]",
  jiji: "text-ember",
  cars45: "text-mint",
};

function formatNaira(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}

export function Dashboard() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filterTabs)[number]>("all");

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesFilter = filter === "all" || v.status === filter;
      const label = `${v.year} ${v.make} ${v.model}`.toLowerCase();
      const matchesQuery = label.includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  const totals = useMemo(() => {
    const inventoryValue = vehicles.reduce((sum, v) => sum + v.priceNaira, 0);
    return {
      total: vehicles.length,
      listed: vehicles.filter((v) => v.status === "listed").length,
      pending: vehicles.filter((v) => v.status === "pending").length,
      sold: vehicles.filter((v) => v.status === "sold").length,
      aiOptimized: vehicles.filter((v) => v.aiOptimized).length,
      inventoryValue,
    };
  }, []);

  const statCards = [
    { label: "Total Vehicles", value: totals.total.toString() },
    { label: "Listed", value: totals.listed.toString() },
    { label: "Pending", value: totals.pending.toString() },
    { label: "Sold", value: totals.sold.toString() },
    { label: "AI Optimized", value: totals.aiOptimized.toString() },
    { label: "Inventory Value", value: formatNaira(totals.inventoryValue) },
  ];

  return (
    <section id="dashboard" className="bg-navy-900 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-pulse-violet">
              Inventory
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink-100 sm:text-4xl">
              Your floor, live
            </h2>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Button>
        </div>

        {/* stats row */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {statCards.map((s) => (
            <div
              key={s.label}
              className="rounded-xl2 border border-white/8 bg-navy-950/60 p-4"
            >
              <div className="font-display text-lg font-semibold text-ink-100 sm:text-xl">
                {s.value}
              </div>
              <div className="mt-0.5 text-[11px] text-ink-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* search + filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search make or model…"
              className="focus-ring w-full rounded-xl border border-white/10 bg-navy-950/60 py-2.5 pl-9 pr-3 text-sm text-ink-100 placeholder:text-ink-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={cn(
                  "focus-ring rounded-full border px-3.5 py-1.5 text-xs font-medium capitalize transition-all duration-150",
                  filter === tab
                    ? "border-pulse-violet/60 bg-pulse-violet/15 text-ink-100"
                    : "border-white/10 bg-navy-950/50 text-ink-300 hover:border-white/25"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* vehicle grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <Card key={v.id} className="group p-5 transition-colors duration-200 hover:border-pulse-violet/30">
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

              <div className="mt-4 font-mono text-lg font-semibold text-ink-100">
                {formatNaira(v.priceNaira)}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
                <div
                  className={cn(
                    "flex items-center gap-1.5 text-xs",
                    v.aiOptimized ? "text-mint" : "text-ink-500"
                  )}
                >
                  <Zap className="h-3.5 w-3.5" fill={v.aiOptimized ? "currentColor" : "none"} />
                  {v.aiOptimized ? "AI optimized" : "Not optimized"}
                </div>
                <div className="flex items-center gap-1.5">
                  {v.syndicatedTo.length === 0 ? (
                    <span className="text-[11px] text-ink-500">Not syndicated</span>
                  ) : (
                    v.syndicatedTo.map((ch) => {
                      const Icon = channelIcon[ch];
                      return (
                        <span
                          key={ch}
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-full bg-white/5",
                            channelColor[ch]
                          )}
                          title={ch}
                        >
                          <Icon className="h-3 w-3" />
                        </span>
                      );
                    })
                  )}
                </div>
              </div>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-xl2 border border-dashed border-white/10 py-14 text-center text-sm text-ink-500">
              No vehicles match "{query || filter}". Try another search or filter.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
