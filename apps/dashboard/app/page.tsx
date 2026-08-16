import { Hero } from "@/components/sections/hero";
import { Onboarding } from "@/components/sections/onboarding";
import { Dashboard } from "@/components/sections/dashboard";
import { AgentSwarm } from "@/components/sections/agent-swarm";
import { Footer } from "@/components/sections/footer";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Onboarding />
      <Dashboard />
      <AgentSwarm />
      <Footer />
    </main>
  );
}
