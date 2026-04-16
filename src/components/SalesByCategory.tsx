import { Card, ProgressBar, StatBox } from "./ui";

const SalesByCategory = () => {
  return (
    <Card className="col-span-12" hoverable={false}>
      <h4 className="text-lg font-bold text-gray-900 mb-8">
        Sales by Category
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <ProgressBar
            value={27}
            label="Electronics"
            showValue
            rightLabel="$12,450"
            color="purple"
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
            color="pink"
          />

          <ProgressBar
            value={17}
            label="Fashion"
            showValue
            rightLabel="$7,650"
            color="purple"
          />

          <ProgressBar
            value={13}
            label="Sports"
            showValue
            rightLabel="$5,900"
            color="cyan"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBox
            label="Top Cat"
            value="Electronics"
            description="27% of total revenue"
          />
          <StatBox
            label="Growth"
            value="+14.2%"
            description="Vs previous month"
          />
          <StatBox
            label="Avg Margin"
            value="32.8%"
            description="All categories"
          />
          <StatBox
            label="Forecast"
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
