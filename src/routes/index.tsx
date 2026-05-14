import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListChecks, Search, MessageSquare, Sparkles, ArrowUpRight, TrendingUp, Clock, Zap, CheckCircle2, Brain } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity" },
      { name: "description", content: "Your premium AI workspace: emails, meetings, planning, research, and chat." },
    ],
  }),
  component: Index,
});

const tools = [
  { to: "/email", icon: Mail, title: "Smart Email", desc: "Draft polished emails in seconds.", tint: "from-blue-500/20 to-indigo-500/10" },
  { to: "/meetings", icon: FileText, title: "Meeting Notes", desc: "Summaries with action items.", tint: "from-purple-500/20 to-fuchsia-500/10" },
  { to: "/tasks", icon: ListChecks, title: "Task Planner", desc: "Prioritized step-by-step plans.", tint: "from-cyan-500/20 to-sky-500/10" },
  { to: "/research", icon: Search, title: "Research", desc: "Structured briefings, fast.", tint: "from-emerald-500/20 to-teal-500/10" },
  { to: "/chat", icon: MessageSquare, title: "AI Chatbot", desc: "Your general work assistant.", tint: "from-amber-500/20 to-orange-500/10" },
] as const;

const metrics = [
  { label: "Hours saved", value: "42.3", delta: "+12%", icon: Clock },
  { label: "AI generations", value: "1,284", delta: "+38%", icon: Zap },
  { label: "Tasks completed", value: "97", delta: "+8%", icon: CheckCircle2 },
  { label: "Productivity", value: "94%", delta: "+5%", icon: TrendingUp },
];

const activity = [
  { tool: "Smart Email", title: "Follow-up to Acme proposal", time: "2m ago", icon: Mail },
  { tool: "Meeting Notes", title: "Q4 planning sync — summary", time: "1h ago", icon: FileText },
  { tool: "Research", title: "Competitor landscape: AI CRMs", time: "3h ago", icon: Search },
  { tool: "Task Planner", title: "Launch checklist for v2.4", time: "Yesterday", icon: ListChecks },
];

const upcoming = [
  { title: "Send revised proposal to Acme", due: "Today, 4:00 PM", priority: "High" },
  { title: "Review design QA on dashboard", due: "Tomorrow", priority: "Med" },
  { title: "Prep talking points for board call", due: "Thu", priority: "High" },
  { title: "Sync with marketing on launch", due: "Fri", priority: "Low" },
];

function Index() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-4 md:p-8 animate-fade-in-up">
      {/* Hero */}
      <section className="glass relative overflow-hidden rounded-3xl p-6 md:p-10">
        <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-aurora)" }} />
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3" /> Welcome back
        </div>
        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
          Your <span className="gradient-text">AI workspace</span>,<br className="hidden md:block" /> ready when you are.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          Automate emails, meetings, planning, research, and chat — one elegant operating system for modern work.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link to="/chat" className="inline-flex items-center gap-1.5 rounded-2xl gradient-bg px-4 py-2.5 text-sm font-medium text-primary-foreground glow transition hover:opacity-90">
            <Brain className="h-4 w-4" /> Ask AI
          </Link>
          <Link to="/email" className="inline-flex items-center gap-1.5 rounded-2xl border border-border/70 bg-background/40 px-4 py-2.5 text-sm font-medium hover:bg-accent/40">
            New email <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Metrics */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="glass group rounded-3xl p-5 transition hover:-translate-y-0.5 hover:glow">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <m.icon className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400">{m.delta}</span>
            </div>
            <div className="mt-4 text-3xl font-bold tracking-tight">{m.value}</div>
            <div className="text-xs text-muted-foreground">{m.label}</div>
          </div>
        ))}
      </section>

      {/* Tools */}
      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-xl font-semibold">AI tools</h2>
          <span className="text-xs text-muted-foreground">5 tools</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.to} to={t.to} className="group glass relative overflow-hidden rounded-3xl p-5 transition hover:-translate-y-0.5 hover:glow">
              <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${t.tint} blur-2xl`} />
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <t.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Activity + Upcoming */}
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-3xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent AI activity</h2>
            <span className="text-xs text-muted-foreground">Last 24h</span>
          </div>
          <ul className="divide-y divide-border/60">
            {activity.map((a) => (
              <li key={a.title} className="flex items-center gap-3 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/60 text-foreground/80">
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.tool}</div>
                </div>
                <div className="text-xs text-muted-foreground">{a.time}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-3xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Upcoming tasks</h2>
            <Link to="/tasks" className="text-xs text-primary">View all</Link>
          </div>
          <ul className="space-y-3">
            {upcoming.map((u) => (
              <li key={u.title} className="rounded-2xl border border-border/60 bg-background/30 p-3">
                <div className="text-sm font-medium">{u.title}</div>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{u.due}</span>
                  <span className={`rounded-full px-2 py-0.5 ${u.priority === "High" ? "bg-rose-500/15 text-rose-300" : u.priority === "Med" ? "bg-amber-500/15 text-amber-300" : "bg-emerald-500/15 text-emerald-300"}`}>
                    {u.priority}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* AI suggestions */}
      <section className="glass rounded-3xl p-5 md:p-7">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold">AI suggestions</h2>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            "Summarize yesterday's standup transcript",
            "Draft a status update for stakeholders",
            "Plan next week's product launch checklist",
          ].map((s) => (
            <Link key={s} to="/chat" className="rounded-2xl border border-border/60 bg-background/30 p-4 text-sm transition hover:border-primary/50 hover:bg-accent/30">
              {s}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
