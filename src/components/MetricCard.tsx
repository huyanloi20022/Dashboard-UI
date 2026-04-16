import React from "react";
import { Card, Badge, Icon } from "./ui";

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: string;
  iconBgClass?: string;
  iconTextClass?: string;
  groupHoverBgClass?: string;
  isHoverable?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  icon,
  iconBgClass = "bg-purple-50",
  iconTextClass = "text-purple-600",
  groupHoverBgClass = "group-hover:bg-purple-600",
  isHoverable = true,
}) => {
  const renderTrend = () => {
    if (!trend) return null;

    const trendValue = parseFloat(trend);
    if (trendValue === 0) return <Badge variant="default">{trend}</Badge>;

    const trendIcon = trendValue > 0 ? "trending_up" : "trending_down";
    const trendColor = trendValue > 0 ? "success" : "error";

    return (
      <Badge variant={trendColor} icon={<Icon name={trendIcon} size="sm" />}>
        {trend}
      </Badge>
    );
  };

  return (
    <Card
      hoverable={isHoverable}
      className="cursor-pointer shadow-xl border-gray-300"
    >
      <div className="flex justify-between items-start mb-3">
        <div
          className={`p-2 flex items-center ${iconBgClass} ${iconTextClass} rounded-full ${groupHoverBgClass} group-hover:text-white transition-colors`}
        >
          <Icon name={icon} size="md" />
        </div>
        {renderTrend()}
      </div>
      <p className="text-sm font-bold text-gray-500 mb-1">{`${title}: `}</p>
      <h3 className="text-2xl font-extrabold text-gray-900">{value}</h3>
    </Card>
  );
};

export default MetricCard;
