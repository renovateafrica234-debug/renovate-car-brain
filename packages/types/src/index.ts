export type AgentRole =
  | "scraper"
  | "social"
  | "content"
  | "leads"
  | "followup"
  | "whatsapp"
  | "brain";

export interface Listing {
  id: string;
  title: string;
  description?: string;
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  leadId?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  status: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  leadId: string;
  messages?: string;
  startedAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsEvent {
  id: string;
  event: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface WebhookPayload {
  type: string;
  data: Record<string, unknown>;
  timestamp: string;
}

export interface JobSchedule {
  name: string;
  cron: string;
  description: string;
}
