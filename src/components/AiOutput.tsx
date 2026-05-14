import { Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function AiOutput({
  value,
  onChange,
  onRegenerate,
  loading,
  minRows = 12,
}: {
  value: string;
  onChange: (v: string) => void;
  onRegenerate?: () => void;
  loading?: boolean;
  minRows?: number;
}) {
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">AI output (editable)</label>
        <div className="flex gap-2">
          {onRegenerate && (
            <Button variant="outline" size="sm" onClick={onRegenerate} disabled={loading}>
              <RotateCcw className="mr-1 h-3.5 w-3.5" /> Regenerate
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={copy} disabled={!value}>
            <Copy className="mr-1 h-3.5 w-3.5" /> Copy
          </Button>
        </div>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={minRows}
        placeholder={loading ? "Generating…" : "Output will appear here"}
        className="font-mono text-sm"
      />
    </div>
  );
}