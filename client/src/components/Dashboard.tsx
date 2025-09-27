import { KPICard } from "./KPICard";
import { CallVolumeChart, CampaignPerformanceChart, RegionalDistributionChart } from "./DashboardCharts";
import { Phone, MessageCircle, Target, Calendar, TrendingUp, DollarSign } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from "recharts";

// Mock data for KPI cards
const donutData = [
  { name: "Answered", value: 65, color: "#8b5cf6" },
  { name: "Unanswered", value: 35, color: "#e5e7eb" },
];

const barData = [
  { name: "Mon", value: 85 },
  { name: "Tue", value: 92 },
  { name: "Wed", value: 78 },
  { name: "Thu", value: 88 },
  { name: "Fri", value: 95 },
];

export function Dashboard() {
  return (
    <div className="space-y-6" data-testid="dashboard">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your AI Agent Platform. Monitor performance and manage your operations.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          title="Total Calls Today"
          value="1,247"
          description="Answered vs Unanswered"
          trend="up"
          trendValue="+12.5%"
          icon={<Phone className="h-5 w-5" />}
          variant="chart"
        >
          <ResponsiveContainer width="100%" height={80}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={35}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </KPICard>

        <KPICard
          title="Total Chats"
          value="892"
          description="Resolved vs Escalated"
          progress={78}
          progressLabel="Resolution Rate"
          icon={<MessageCircle className="h-5 w-5" />}
        />

        <KPICard
          title="Leads Captured"
          value="324"
          description="Real-time counter"
          trend="up"
          trendValue="+8.2%"
          icon={<Target className="h-5 w-5" />}
        />

        <KPICard
          title="Appointments Booked"
          value="156"
          description="Calendar integration"
          trend="neutral"
          trendValue="±0%"
          icon={<Calendar className="h-5 w-5" />}
        />

        <KPICard
          title="Conversion Rate"
          value="23.4%"
          description="Lead to customer"
          trend="up"
          trendValue="+2.1%"
          icon={<TrendingUp className="h-5 w-5" />}
        />

        <KPICard
          title="Revenue Impact"
          value="$52,840"
          description="ROI tracking"
          trend="up"
          trendValue="+15.3%"
          icon={<DollarSign className="h-5 w-5" />}
          variant="chart"
        >
          <ResponsiveContainer width="100%" height={60}>
            <BarChart data={barData}>
              <Bar dataKey="value" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </KPICard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <CallVolumeChart />
        </div>
        <CampaignPerformanceChart />
        <RegionalDistributionChart />
      </div>
    </div>
  );
}