import { Card, ProgressBar, StatBox, ChartHeader } from "../ui";

const SalesByCategory = () => {
  return (
    <Card className="col-span-12 lg:col-span-8 border-2 border-gray-100 shadow-xl overflow-hidden" hoverable={false}>
      <ChartHeader
        title="Category Insights"
        subtitle="Revenue distribution by product segment"
      />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <ProgressBar
            value={27}
            label="Electronics"
            showValue
            rightLabel="$12,450"
            color="indigo"
          />

          <ProgressBar
            value={21}
            label="Accessories"
            showValue
            rightLabel="$9,870"
            color="cyan"
          />

          <ProgressBar
            value={19}
            label="Home & Garden"
            showValue
            rightLabel="$8,920"
            color="emerald"
          />

          <ProgressBar
            value={17}
            label="Fashion"
            showValue
            rightLabel="$7,650"
            color="amber"
          />

          <ProgressBar
            value={13}
            label="Sports"
            showValue
            rightLabel="$5,900"
            color="rose"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBox
            label="TOP CATEGORY"
            value="Electronics"
            description="27% of total revenue"
          />
          <StatBox
            label="MONTHLY GROWTH"
            value="+14.2%"
            description="Vs previous month"
          />
          <StatBox
            label="AVERAGE MARGIN"
            value="32.8%"
            description="All categories"
          />
          <StatBox
            label="YEARLY FORECAST"
            value="$52k"
            description="Expected Q4 end"
            highlighted
          />
        </div>
      </div>
    </Card>
  );
};

export default SalesByCategory;
