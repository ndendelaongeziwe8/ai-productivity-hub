import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { ToolShell } from "@/components/ToolShell";
import { AiOutput } from "@/components/AiOutput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { aiComplete } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator" }] }),
  component: EmailPage,
});

function EmailPage() {
  const run = useServerFn(aiComplete);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("Professional");
  const [intent, setIntent] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!intent.trim()) { toast.error("Describe what the email should say"); return; }
    setLoading(true);
    try {
      const res = await run({ data: {
        messages: [
          { role: "system", content: "You are an expert business email writer. Produce ready-to-send emails. Output only the email body (with greeting and sign-off). No preamble, no explanations, no markdown fences." },
          { role: "user", content: `Recipient: ${recipient || "(unspecified)"}\nSubject: ${subject || "(suggest one)"}\nTone: ${tone}\n\nGoal of the email:\n${intent}\n\nWrite the email now.` },
        ],
      }});
      setOutput(res.content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally { setLoading(false); }
  };

  return (
    <ToolShell title="Smart Email Generator" description="Describe the goal — get a polished draft." icon={<Mail className="h-5 w-5" />}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Recipient</Label>
          <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Sarah, Marketing Lead" />
        </div>
        <div className="space-y-2">
          <Label>Subject (optional)</Label>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Leave blank to auto-suggest" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Professional","Friendly","Concise","Persuasive","Apologetic","Formal"].map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>What do you want to say?</Label>
          <Textarea rows={5} value={intent} onChange={(e) => setIntent(e.target.value)} placeholder="e.g. Follow up on last week's proposal and propose a 30-min call next Tuesday." />
        </div>
      </div>
      <Button onClick={generate} disabled={loading} className="w-fit">
        <Send className="mr-2 h-4 w-4" /> {loading ? "Generating…" : "Generate email"}
      </Button>
      <AiOutput value={output} onChange={setOutput} onRegenerate={generate} loading={loading} />
    </ToolShell>
  );
}