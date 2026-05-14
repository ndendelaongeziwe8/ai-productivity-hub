import { ReactNode } from "react";
import { AiDisclaimer } from "./AiDisclaimer";

export function ToolShell({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 md:p-8 animate-fade-in-up">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-bg text-primary-foreground glow">
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <AiDisclaimer />
      </header>
      <div className="glass rounded-3xl p-5 md:p-7 flex flex-col gap-5">{children}</div>
    </div>
  );
}
