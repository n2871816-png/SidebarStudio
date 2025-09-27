import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  progress?: number;
  progressLabel?: string;
  icon?: React.ReactNode;
  variant?: "default" | "chart";
  children?: React.ReactNode;
}

export function KPICard({
  title,
  value,
  description,
  trend,
  trendValue,
  progress,
  progressLabel,
  icon,
  variant = "default",
  children,
}: KPICardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "neutral":
        return <Minus className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      case "neutral":
        return "text-gray-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="hover-elevate" data-testid={`card-kpi-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-primary">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground" data-testid={`text-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {value}
        </div>
        
        {description && (
          <p className="text-xs text-muted-foreground mt-1" data-testid={`text-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {description}
          </p>
        )}

        {(trend || trendValue) && (
          <div className="flex items-center space-x-1 mt-2">
            {getTrendIcon()}
            {trendValue && (
              <span className={`text-xs font-medium ${getTrendColor()}`}>
                {trendValue}
              </span>
            )}
          </div>
        )}

        {progress !== undefined && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{progressLabel}</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {variant === "chart" && children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}