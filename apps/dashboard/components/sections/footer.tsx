import { Twitter, Linkedin, Github, Mail, Sparkles } from "lucide-react";

const linkColumns = [
  {
    title: "Product",
    links: ["Inventory", "Agent Swarm", "Pricing", "Onboarding"],
  },
  {
    title: "Company",
    links: ["About", "Abuja HQ", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Data Processing"],
  },
];

const socials = [
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Github, label: "GitHub" },
  { icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-navy-950 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-pulse-violet to-pulse-purple text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="font-display text-sm font-semibold tracking-[0.14em] text-ink-100">
                AUTOCLAW
              </span>
            </div>
            <p className="mt-3 max-w-[16rem] text-sm text-ink-500">
              The AI sales engine built for Abuja's car dealers.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink-500 transition-colors duration-150 hover:border-pulse-violet/40 hover:text-ink-100"
                >
                  <s.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {linkColumns.map((col) => (
            <div key={col.title}>
              <div className="font-mono text-xs uppercase tracking-[0.15em] text-ink-500">
                {col.title}
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="focus-ring text-sm text-ink-300 transition-colors duration-150 hover:text-ink-100"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/8 pt-6 text-xs text-ink-500">
          © 2026 AUTOCLAW. Built for Abuja's dealers.
        </div>
      </div>
    </footer>
  );
}
