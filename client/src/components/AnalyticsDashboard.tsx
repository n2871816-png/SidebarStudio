import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
  Cell
} from "recharts";
import { Download, TrendingUp, MessageCircle, Mic, Target, DollarSign } from "lucide-react";
import { KPICard } from "./KPICard";

// Mock data for analytics
const voiceMetrics = {
  callsPlaced: 15840,
  successRate: 67.3,
  avgDuration: 245, // seconds
  dropOffRate: 8.5,
};

const chatMetrics = {
  messagesHandled: 24560,
  avgResponseTime: 2.3, // seconds
  csatScore: 8.2,
  resolutionRate: 89.4,
};

const funnelData = [
  { name: "Leads", value: 5000, fill: "#8b5cf6" },
  { name: "Qualified", value: 3200, fill: "#06d6a0" },
  { name: "Meetings", value: 1800, fill: "#ffd23f" },
  { name: "Deals", value: 650, fill: "#f72585" },
];

const performanceData = [
  { month: "Jan", voice: 65, chat: 78, whatsapp: 45, email: 23 },
  { month: "Feb", voice: 72, chat: 85, whatsapp: 52, email: 28 },
  { month: "Mar", voice: 78, chat: 82, whatsapp: 58, email: 35 },
  { month: "Apr", voice: 85, chat: 89, whatsapp: 63, email: 42 },
  { month: "May", voice: 88, chat: 92, whatsapp: 68, email: 38 },
  { month: "Jun", voice: 92, chat: 88, whatsapp: 72, email: 45 },
];

const revenueData = [
  { quarter: "Q1", revenue: 125000, roi: 245 },
  { quarter: "Q2", revenue: 178000, roi: 312 },
  { quarter: "Q3", revenue: 203000, roi: 289 },
  { quarter: "Q4", revenue: 245000, roi: 356 },
];

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export function AnalyticsDashboard() {
  const handleExport = (format: string) => {
    console.log(`Exporting analytics as ${format}`);
  };

  return (
    <div className="space-y-6" data-testid="analytics-dashboard">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive insights across all your AI agent channels
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="last-30-days">
            <SelectTrigger className="w-[180px]" data-testid="select-time-period">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => handleExport("pdf")}
            data-testid="button-export-pdf"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport("csv")}
            data-testid="button-export-csv"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Voice AI Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Mic className="h-5 w-5 text-primary" />
          Voice AI Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Calls Placed"
            value={voiceMetrics.callsPlaced.toLocaleString()}
            trend="up"
            trendValue="+12.5%"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <KPICard
            title="Success Rate"
            value={`${voiceMetrics.successRate}%`}
            progress={voiceMetrics.successRate}
            progressLabel="Answer Rate"
            icon={<Target className="h-5 w-5" />}
          />
          <KPICard
            title="Avg Call Duration"
            value={formatDuration(voiceMetrics.avgDuration)}
            trend="neutral"
            trendValue="±0%"
            icon={<Mic className="h-5 w-5" />}
          />
          <KPICard
            title="Drop-off Rate"
            value={`${voiceMetrics.dropOffRate}%`}
            trend="down"
            trendValue="-2.1%"
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>
      </div>

      {/* Chat AI Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          Chat AI Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Messages Handled"
            value={chatMetrics.messagesHandled.toLocaleString()}
            trend="up"
            trendValue="+8.3%"
            icon={<MessageCircle className="h-5 w-5" />}
          />
          <KPICard
            title="Avg Response Time"
            value={`${chatMetrics.avgResponseTime}s`}
            trend="down"
            trendValue="-0.8s"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <KPICard
            title="CSAT Score"
            value={`${chatMetrics.csatScore}/10`}
            progress={chatMetrics.csatScore * 10}
            progressLabel="Customer Satisfaction"
            icon={<Target className="h-5 w-5" />}
          />
          <KPICard
            title="Resolution Rate"
            value={`${chatMetrics.resolutionRate}%`}
            progress={chatMetrics.resolutionRate}
            progressLabel="First Contact Resolution"
            icon={<MessageCircle className="h-5 w-5" />}
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Omnichannel Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Omnichannel Performance</CardTitle>
            <CardDescription>Performance across all channels over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Line type="monotone" dataKey="voice" stroke="#8b5cf6" strokeWidth={2} name="Voice" />
                <Line type="monotone" dataKey="chat" stroke="#06d6a0" strokeWidth={2} name="Chat" />
                <Line type="monotone" dataKey="whatsapp" stroke="#f72585" strokeWidth={2} name="WhatsApp" />
                <Line type="monotone" dataKey="email" stroke="#ffbe0b" strokeWidth={2} name="Email" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Funnel</CardTitle>
            <CardDescription>Lead progression through the sales process</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <FunnelChart>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Funnel dataKey="value" data={funnelData}>
                  <LabelList position="center" fill="#fff" fontSize={14} />
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue & ROI */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Revenue & ROI Tracking
          </CardTitle>
          <CardDescription>Quarterly revenue performance and return on investment</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis yAxisId="revenue" orientation="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis yAxisId="roi" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Bar yAxisId="revenue" dataKey="revenue" fill="#8b5cf6" name="Revenue ($)" />
              <Bar yAxisId="roi" dataKey="roi" fill="#06d6a0" name="ROI (%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}