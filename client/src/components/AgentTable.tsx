import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Mic, MessageCircle, Edit, Play, Pause, Trash2 } from "lucide-react";
import type { Agent } from "@shared/schema";

// Mock data
const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Sales Assistant Alpha",
    type: "voice",
    status: "active",
    languages: ["English", "Spanish"],
    campaignAssigned: "Q4 Outreach",
    lastActive: new Date("2024-01-15T10:30:00"),
    createdAt: new Date("2024-01-01T00:00:00"),
  },
  {
    id: "2", 
    name: "Support Chat Bot",
    type: "chat",
    status: "active",
    languages: ["English", "French"],
    campaignAssigned: "Customer Support",
    lastActive: new Date("2024-01-15T11:45:00"),
    createdAt: new Date("2024-01-02T00:00:00"),
  },
  {
    id: "3",
    name: "Lead Qualifier Beta",
    type: "voice",
    status: "training",
    languages: ["English"],
    campaignAssigned: null,
    lastActive: new Date("2024-01-14T16:20:00"),
    createdAt: new Date("2024-01-10T00:00:00"),
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "inactive":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    case "training":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
}

function CreateAgentDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [agentType, setAgentType] = useState<string>("");

  const handleCreate = () => {
    console.log("Creating agent of type:", agentType);
    setIsOpen(false);
    setAgentType("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-create-agent" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
          <DialogDescription>
            Set up a new AI agent for voice calls or chat interactions.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="agent-name">Agent Name</Label>
            <Input
              id="agent-name"
              placeholder="e.g., Sales Assistant"
              data-testid="input-agent-name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="agent-type">Agent Type</Label>
            <Select value={agentType} onValueChange={setAgentType}>
              <SelectTrigger data-testid="select-agent-type">
                <SelectValue placeholder="Select agent type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voice">
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    Voice Agent
                  </div>
                </SelectItem>
                <SelectItem value="chat">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Chat Agent
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="agent-description">Description</Label>
            <Textarea
              id="agent-description"
              placeholder="Describe the agent's purpose and behavior..."
              data-testid="textarea-agent-description"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} data-testid="button-save-agent">
            Create Agent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AgentTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [agents] = useState(mockAgents);

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: string, agentId: string) => {
    console.log(`${action} triggered for agent:`, agentId);
  };

  return (
    <Card data-testid="card-agent-table">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Agents</CardTitle>
            <CardDescription>
              Manage your voice and chat AI agents
            </CardDescription>
          </div>
          <CreateAgentDialog />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-agents"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Languages</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.map((agent) => (
              <TableRow key={agent.id} data-testid={`row-agent-${agent.id}`}>
                <TableCell className="font-medium">{agent.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {agent.type === "voice" ? (
                      <Mic className="h-4 w-4 text-primary" />
                    ) : (
                      <MessageCircle className="h-4 w-4 text-primary" />
                    )}
                    <span className="capitalize">{agent.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(agent.status)}>
                    {agent.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {agent.languages?.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{agent.campaignAssigned || "—"}</TableCell>
                <TableCell className="text-muted-foreground">
                  {agent.lastActive?.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleAction("edit", agent.id)}
                      data-testid={`button-edit-${agent.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleAction(agent.status === "active" ? "pause" : "start", agent.id)}
                      data-testid={`button-toggle-${agent.id}`}
                    >
                      {agent.status === "active" ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleAction("delete", agent.id)}
                      data-testid={`button-delete-${agent.id}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}