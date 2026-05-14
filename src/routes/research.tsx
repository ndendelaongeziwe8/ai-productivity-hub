import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Wand2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { ToolShell } from "@/components/ToolShell";
import { AiOutput } from "@/components/AiOutput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { aiComplete } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const run = useServerFn(aiComplete);
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState("Standard");
  const [audience, setAudience] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim()) { toast.error("Enter a research topic"); return; }
    setLoading(true);
    try {
      const res = await run({ data: {
        messages: [
          { role: "system", content: "You are a senior research analyst. Produce a structured briefing in markdown:\n\n## Executive summary\n## Key findings\n- ...\n## Background\n## Players & landscape\n## Opportunities & risks\n## Recommended next steps\n\nBe specific and concise. Use bullet points where useful." },
          { role: "user", content: `Topic: ${topic}\nDepth: ${depth}\nAudience: ${audience || "general professional"}` },
        ],
      }});
      setOutput(res.content);
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <ToolShell title="AI Research Assistant" description="Get a structured briefing on any topic." icon={<Search className="h-5 w-5" />}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label>Topic</Label>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. AI agents in customer support" />
        </div>
        <div className="space-y-2">
          <Label>Depth</Label>
          <Select value={depth} onValueChange={setDepth}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Quick","Standard","Deep dive"].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Audience (optional)</Label>
          <Input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g. CTO, exec team" />
        </div>
      </div>
      <Button onClick={generate} disabled={loading} className="w-fit rounded-2xl gradient-bg text-primary-foreground glow hover:opacity-90">
        <Wand2 className="mr-2 h-4 w-4" /> {loading ? "Researching…" : "Research now"}
      </Button>
      <AiOutput value={output} onChange={setOutput} onRegenerate={generate} loading={loading} />
    </ToolShell>
  );
}
