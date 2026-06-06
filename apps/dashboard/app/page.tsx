"use client";

import { useMemo, useState } from "react";
import type { Lead, Listing } from "@renovate-car/types";

const tabs = ["Overview", "Listings", "Leads", "Conversations", "AI Brain"] as const;

type TabName = (typeof tabs)[number];

const sampleListings: Listing[] = [
  { id: "1", title: "2019 Toyota Corolla", description: "Well maintained sedan.", price: 18000000, status: "available", createdAt: "2026-06-06T00:00:00.000Z", updatedAt: "2026-06-06T00:00:00.000Z" },
  { id: "2", title: "2020 Honda Civic", description: "Low mileage, premium interior.", price: 22000000, status: "available", createdAt: "2026-06-05T00:00:00.000Z", updatedAt: "2026-06-05T00:00:00.000Z" }
];

const sampleLeads: Lead[] = [
  { id: "L-100", name: "Emeka Johnson", phone: "+2348012345678", email: "emeka@example.com", status: "hot", score: 92, createdAt: "2026-06-05T09:00:00.000Z", updatedAt: "2026-06-06T10:00:00.000Z" },
  { id: "L-101", name: "Chioma Ibe", phone: "+2348098765432", email: "chioma@example.com", status: "warm", score: 76, createdAt: "2026-06-04T12:00:00.000Z", updatedAt: "2026-06-06T09:45:00.000Z" }
];

const metrics = [
  { label: "New leads", value: "24" },
  { label: "Hot leads", value: "8" },
  { label: "Listings live", value: "68" },
  { label: "Avg response time", value: "12m" }
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabName>("Overview");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "Listings":
        return (
          <section className="card grid">
            <h2>Recent marketplace listings</h2>
            <div className="table">
              {sampleListings.map((listing) => (
                <div key={listing.id} className="table-row">
                  <span>{listing.title}</span>
                  <span>{listing.status}</span>
                  <span>₦{listing.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </section>
        );
      case "Leads":
        return (
          <section className="card grid">
            <h2>Active leads</h2>
            <div className="table">
              {sampleLeads.map((lead) => (
                <button key={lead.id} className="table-row button-row" onClick={() => setSelectedLead(lead)}>
                  <span>{lead.name}</span>
                  <span>{lead.status}</span>
                  <span>{lead.score}</span>
                </button>
              ))}
            </div>
          </section>
        );
      case "Conversations":
        return (
          <section className="card">
            <h2>Conversation activity</h2>
            <p>Real-time customer messaging status is being tracked across WhatsApp and chat channels.</p>
          </section>
        );
      case "AI Brain":
        return (
          <section className="card">
            <h2>AI brain insights</h2>
            <p>Generated predictions for pricing, buyer intent, and campaign recommendations.</p>
          </section>
        );
      case "Overview":
      default:
        return (
          <section className="card grid">
            <h2>Overview</h2>
            <div className="metrics-grid">
              {metrics.map((metric) => (
                <div key={metric.label} className="metric-card">
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
            <div className="hot-leads-panel">
              <h3>Hot leads</h3>
              {sampleLeads.filter((lead) => lead.status === "hot").map((lead) => (
                <div key={lead.id} className="lead-card">
                  <div>
                    <h4>{lead.name}</h4>
                    <p>{lead.phone}</p>
                  </div>
                  <span className="badge">Hot</span>
                </div>
              ))}
            </div>
          </section>
        );
    }
  }, [activeTab]);

  return (
    <main className="page-shell">
      <header className="topbar">
        <div>
          <h1>Renovate Car Brain Dashboard</h1>
          <p>Monitor listings, leads, conversations, and AI performance in real time.</p>
        </div>
      </header>
      <nav className="tabs">
        {tabs.map((tab) => (
          <button key={tab} className={tab === activeTab ? "tab active" : "tab"} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </nav>
      <div className="content-grid">
        <div className="main-panel">{tabContent}</div>
        <aside className="side-panel">
          <div className="card">
            <h3>Hot lead detail</h3>
            {selectedLead ? (
              <>
                <p><strong>{selectedLead.name}</strong></p>
                <p>{selectedLead.email}</p>
                <p>{selectedLead.phone}</p>
                <p>Status: {selectedLead.status}</p>
                <button className="primary">Take Over</button>
              </>
            ) : (
              <p>Select a lead to view details and take over the conversation.</p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
