import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  PieChart,
  Pie,
  Cell
} from "recharts";

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`card-chart-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

// Mock data for charts
const callVolumeData = [
  { time: "00:00", calls: 45 },
  { time: "04:00", calls: 32 },
  { time: "08:00", calls: 89 },
  { time: "12:00", calls: 156 },
  { time: "16:00", calls: 234 },
  { time: "20:00", calls: 187 },
];

const campaignData = [
  { name: "Voice Outreach", performance: 85, calls: 1200 },
  { name: "WhatsApp Campaign", performance: 92, calls: 890 },
  { name: "Email Follow-up", performance: 78, calls: 560 },
  { name: "Drip Sequence", performance: 88, calls: 340 },
];

const regionalData = [
  { region: "North America", calls: 45, color: "#8b5cf6" },
  { region: "Europe", calls: 28, color: "#06d6a0" },
  { region: "Asia Pacific", calls: 18, color: "#f72585" },
  { region: "Others", calls: 9, color: "#ffbe0b" },
];

export function CallVolumeChart() {
  return (
    <ChartCard title="Call Volume Over Time" description="Real-time call activity">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={callVolumeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Line 
            type="monotone" 
            dataKey="calls" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function CampaignPerformanceChart() {
  return (
    <ChartCard title="Campaign Performance" description="Success rate by campaign type">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={campaignData} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            type="number" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            type="category"
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            width={120}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Bar 
            dataKey="performance" 
            fill="hsl(var(--primary))"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function RegionalDistributionChart() {
  return (
    <ChartCard title="Regional Call Distribution" description="Geographic call distribution">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={regionalData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="calls"
            label={({ region, calls }) => `${region}: ${calls}%`}
          >
            {regionalData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}