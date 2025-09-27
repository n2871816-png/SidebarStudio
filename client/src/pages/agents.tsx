import { AgentTable } from "@/components/AgentTable";

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Agents</h1>
        <p className="text-muted-foreground">
          Create, manage, and monitor your voice and chat AI agents
        </p>
      </div>
      <AgentTable />
    </div>
  );
}