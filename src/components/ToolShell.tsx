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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <AiDisclaimer />
      </header>
      {children}
    </div>
  );
}