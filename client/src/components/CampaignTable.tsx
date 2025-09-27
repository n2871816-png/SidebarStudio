import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Search, Calendar as CalendarIcon, Play, Pause, Edit, TrendingUp } from "lucide-react";
import type { Campaign } from "@shared/schema";
import { format } from "date-fns";

// Mock data
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Q4 Sales Blitz",
    type: "batch_calls",
    status: "running",
    callsAttempted: 1250,
    callsAnswered: 890,
    callsUnanswered: 360,
    roiPercentage: 245.8,
    createdAt: new Date("2024-01-01T00:00:00"),
  },
  {
    id: "2",
    name: "Product Launch Outreach", 
    type: "whatsapp",
    status: "completed",
    callsAttempted: 2100,
    callsAnswered: 1654,
    callsUnanswered: 446,
    roiPercentage: 156.3,
    createdAt: new Date("2023-12-15T00:00:00"),
  },
  {
    id: "3",
    name: "Customer Retention",
    type: "email",
    status: "paused",
    callsAttempted: 580,
    callsAnswered: 420,
    callsUnanswered: 160,
    roiPercentage: 89.2,
    createdAt: new Date("2024-01-10T00:00:00"),
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "running":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "paused":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
}

function CreateCampaignDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [campaignType, setCampaignType] = useState<string>("");
  const [scheduleDate, setScheduleDate] = useState<Date>();

  const handleCreate = () => {
    console.log("Creating campaign:", { type: campaignType, date: scheduleDate });
    setIsOpen(false);
    setCampaignType("");
    setScheduleDate(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-create-campaign" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
          <DialogDescription>
            Set up a new marketing campaign with scheduling and targeting options.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input
              id="campaign-name"
              placeholder="e.g., Q1 Lead Generation"
              data-testid="input-campaign-name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="campaign-type">Campaign Type</Label>
            <Select value={campaignType} onValueChange={setCampaignType}>
              <SelectTrigger data-testid="select-campaign-type">
                <SelectValue placeholder="Select campaign type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="batch_calls">Batch Calls</SelectItem>
                <SelectItem value="whatsapp">WhatsApp Campaign</SelectItem>
                <SelectItem value="email">Email Campaign</SelectItem>
                <SelectItem value="drip">Drip Workflow</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Schedule Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal"
                  data-testid="button-schedule-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {scheduleDate ? format(scheduleDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={scheduleDate}
                  onSelect={setScheduleDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} data-testid="button-save-campaign">
            Create Campaign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function CampaignTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [campaigns] = useState(mockCampaigns);

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: string, campaignId: string) => {
    console.log(`${action} triggered for campaign:`, campaignId);
  };

  return (
    <Card data-testid="card-campaign-table">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Campaign Manager</CardTitle>
            <CardDescription>
              Monitor and manage your marketing campaigns
            </CardDescription>
          </div>
          <CreateCampaignDialog />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-campaigns"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Calls Attempted</TableHead>
              <TableHead>Answered</TableHead>
              <TableHead>Unanswered</TableHead>
              <TableHead>ROI %</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCampaigns.map((campaign) => (
              <TableRow key={campaign.id} data-testid={`row-campaign-${campaign.id}`}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {campaign.type.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>{campaign.callsAttempted?.toLocaleString()}</TableCell>
                <TableCell className="text-green-600 font-medium">
                  {campaign.callsAnswered?.toLocaleString()}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {campaign.callsUnanswered?.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600">
                      {campaign.roiPercentage?.toFixed(1)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleAction("edit", campaign.id)}
                      data-testid={`button-edit-${campaign.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleAction(campaign.status === "running" ? "pause" : "start", campaign.id)}
                      data-testid={`button-toggle-${campaign.id}`}
                    >
                      {campaign.status === "running" ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
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