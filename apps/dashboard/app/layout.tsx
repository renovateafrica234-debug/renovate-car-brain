import "./globals.css";

export const metadata = {
  title: "Renovate Car Brain Dashboard",
  description: "Real-time marketplace operations dashboard for car agents"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
