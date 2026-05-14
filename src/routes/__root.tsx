import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Toaster } from "@/components/ui/sonner";
import { Bell, Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-10 text-center">
        <h1 className="text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-2xl gradient-bg px-5 py-2.5 text-sm font-medium text-primary-foreground glow transition hover:opacity-90">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-10 text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-2xl gradient-bg px-5 py-2.5 text-sm font-medium text-primary-foreground glow"
          >
            Try again
          </button>
          <a href="/" className="rounded-2xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent/40">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AI Workplace Productivity Assistant" },
      { name: "description", content: "A premium AI operating system for modern workplace productivity." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      { property: "og:description", content: "Automate emails, meetings, planning, research, and chat with AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border/60 glass-strong px-3 md:px-6">
              <SidebarTrigger className="shrink-0" />
              <div className="relative hidden flex-1 max-w-xl md:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tools, history, anything…"
                  className="h-10 rounded-2xl border-border/60 bg-background/40 pl-9 placeholder:text-muted-foreground/70"
                />
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="hidden rounded-2xl gradient-bg text-primary-foreground glow hover:opacity-90 sm:inline-flex">
                  <Sparkles className="mr-1.5 h-4 w-4" /> Quick action
                </Button>
                <Button variant="ghost" size="icon" className="rounded-2xl">
                  <Bell className="h-4 w-4" />
                </Button>
                <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full gradient-bg text-xs font-semibold text-primary-foreground glow">
                  AI
                </div>
              </div>
            </header>
            <main className="flex-1">
              <Outlet />
            </main>
            <footer className="border-t border-border/60 px-4 py-3 text-center text-[11px] text-muted-foreground md:px-8">
              AI-generated content may contain inaccuracies. Please review outputs before professional use.
            </footer>
          </div>
        </div>
        <Toaster />
      </SidebarProvider>
    </QueryClientProvider>
  );
}
