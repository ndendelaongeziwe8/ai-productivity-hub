import { AlertTriangle } from "lucide-react";

export function AiDisclaimer() {
  return (
    <div className="flex items-start gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <p>
        AI-generated content can be inaccurate or biased. Review and edit outputs before sharing.
        Avoid entering confidential or personal data.
      </p>
    </div>
  );
}