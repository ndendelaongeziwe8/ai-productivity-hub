import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Wand2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { ToolShell } from "@/components/ToolShell";
import { AiOutput } from "@/components/AiOutput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { aiComplete } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/meetings")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer" }] }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const run = useServerFn(aiComplete);
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!notes.trim()) { toast.error("Paste some meeting notes"); return; }
    setLoading(true);
    try {
      const res = await run({ data: {
        messages: [
          { role: "system", content: "You summarize meeting notes for busy professionals. Always output in this exact markdown structure:\n\n## TL;DR\n(2-3 sentence overview)\n\n## Key Decisions\n- ...\n\n## Action Items\n- [ ] Owner — task — due date (if mentioned)\n\n## Open Questions\n- ...\n\nBe specific, no fluff." },
          { role: "user", content: `Meeting notes:\n\n${notes}` },
        ],
      }});
      setOutput(res.content);
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <ToolShell title="Meeting Notes Summarizer" description="Paste raw notes — get a structured summary with action items." icon={<FileText className="h-5 w-5" />}>
      <div className="space-y-2">
        <Label>Raw meeting notes / transcript</Label>
        <Textarea rows={10} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste your meeting notes or transcript here..." />
      </div>
      <Button onClick={generate} disabled={loading} className="w-fit">
        <Wand2 className="mr-2 h-4 w-4" /> {loading ? "Summarizing…" : "Summarize"}
      </Button>
      <AiOutput value={output} onChange={setOutput} onRegenerate={generate} loading={loading} />
    </ToolShell>
  );
}