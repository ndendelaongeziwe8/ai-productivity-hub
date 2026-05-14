import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";
import { ToolShell } from "@/components/ToolShell";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [name, setName] = useState("Alex Carter");
  const [email, setEmail] = useState("alex@workspace.ai");
  const [model, setModel] = useState("Balanced");
  const [notif, setNotif] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <ToolShell title="Settings" description="Manage your workspace, preferences, and AI defaults." icon={<SettingsIcon className="h-5 w-5" />}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Display name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Default AI model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Fast","Balanced","Most capable"].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Theme</Label>
          <Select defaultValue="Dark">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Dark","System"].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/30 p-4">
          <div>
            <div className="text-sm font-medium">Email notifications</div>
            <div className="text-xs text-muted-foreground">Weekly summary of AI usage.</div>
          </div>
          <Switch checked={notif} onCheckedChange={setNotif} />
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/30 p-4">
          <div>
            <div className="text-sm font-medium">Auto-save AI history</div>
            <div className="text-xs text-muted-foreground">Keep recent generations in your workspace.</div>
          </div>
          <Switch checked={autoSave} onCheckedChange={setAutoSave} />
        </div>
      </div>
    </ToolShell>
  );
}
