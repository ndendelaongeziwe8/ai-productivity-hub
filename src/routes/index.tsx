import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListChecks, Search, MessageSquare, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AiDisclaimer } from "@/components/AiDisclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      { name: "description", content: "Automate emails, meeting notes, planning, research, and chat with AI." },
    ],
  }),
  component: Index,
});

const tools = [
  { to: "/email", icon: Mail, title: "Smart Email Generator", desc: "Draft polished emails in seconds with the right tone." },
  { to: "/meetings", icon: FileText, title: "Meeting Notes Summarizer", desc: "Turn raw notes into a clean summary with action items." },
  { to: "/tasks", icon: ListChecks, title: "AI Task Planner", desc: "Break goals into prioritized, actionable steps." },
  { to: "/research", icon: Search, title: "AI Research Assistant", desc: "Get structured briefings on any topic, fast." },
  { to: "/chat", icon: MessageSquare, title: "AI Chatbot", desc: "Ask anything — a general-purpose work assistant." },
] as const;

function Index() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 p-4 md:p-8">
      <section className="flex flex-col gap-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3" /> Your workplace AI toolkit
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Automate the busywork. Focus on the work that matters.
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Five focused AI tools for everyday workplace tasks — drafting, summarizing, planning,
          researching, and chatting. Every output is editable.
        </p>
      </section>

      <AiDisclaimer />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.to} to={t.to} className="group">
            <Card className="h-full transition hover:border-primary/50 hover:shadow-md">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <t.icon className="h-5 w-5" />
                </div>
                <CardTitle className="mt-3 text-lg">{t.title}</CardTitle>
                <CardDescription>{t.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open tool <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
