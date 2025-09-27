import { CallVolumeChart, CampaignPerformanceChart, RegionalDistributionChart } from '../DashboardCharts';

export default function DashboardChartsExample() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-background">
      <div className="lg:col-span-2">
        <CallVolumeChart />
      </div>
      <CampaignPerformanceChart />
      <RegionalDistributionChart />
    </div>
  );
}