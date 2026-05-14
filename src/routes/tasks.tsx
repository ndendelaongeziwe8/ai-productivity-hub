import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks, Wand2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { ToolShell } from "@/components/ToolShell";
import { AiOutput } from "@/components/AiOutput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { aiComplete } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "AI Task Planner" }] }),
  component: TasksPage,
});

function TasksPage() {
  const run = useServerFn(aiComplete);
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!goal.trim()) { toast.error("Describe your goal"); return; }
    setLoading(true);
    try {
      const res = await run({ data: {
        messages: [
          { role: "system", content: "You are a productivity coach. Break the user's goal into a prioritized, actionable task plan. Output markdown:\n\n## Plan overview\n(2 sentences)\n\n## Tasks (prioritized)\n1. [P1] Task — estimated effort\n2. [P2] Task — estimated effort\n...\n\n## Suggested schedule\n- Day 1: ...\n- Day 2: ...\n\n## Tips\n- ..." },
          { role: "user", content: `Goal: ${goal}\nDeadline: ${deadline || "(flexible)"}\nContext: ${context || "(none)"}` },
        ],
      }});
      setOutput(res.content);
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <ToolShell title="AI Task Planner" description="Turn any goal into a prioritized action plan." icon={<ListChecks className="h-5 w-5" />}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label>Goal</Label>
          <Input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g. Launch v2 of the mobile app" />
        </div>
        <div className="space-y-2">
          <Label>Deadline (optional)</Label>
          <Input value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="e.g. In 2 weeks" />
        </div>
        <div className="space-y-2">
          <Label>Context (optional)</Label>
          <Input value={context} onChange={(e) => setContext(e.target.value)} placeholder="Team size, constraints…" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Notes (optional)</Label>
          <Textarea rows={3} value={context} onChange={(e) => setContext(e.target.value)} placeholder="Anything else the planner should know" />
        </div>
      </div>
      <Button onClick={generate} disabled={loading} className="w-fit rounded-2xl gradient-bg text-primary-foreground glow hover:opacity-90">
        <Wand2 className="mr-2 h-4 w-4" /> {loading ? "Planning…" : "Generate plan"}
      </Button>
      <AiOutput value={output} onChange={setOutput} onRegenerate={generate} loading={loading} />
    </ToolShell>
  );
}
