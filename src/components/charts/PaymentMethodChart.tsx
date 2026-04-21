import React, { useRef } from "react";
import "chart.js/auto";
import { PolarArea } from "react-chartjs-2";
import { Card, ChartHeader, Icon } from "../ui";
import { Chart as ChartJS } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";

const PaymentMethodChart: React.FC = () => {
  const chartRef = useRef<ChartJS<"polarArea">>(null);
  const [hiddenIndices, setHiddenIndices] = React.useState<number[]>([]);

  const data: ChartData<"polarArea"> = {
    labels: ["COD", "Credit Card", "Bank Transfer", "Momo", "ShopeePay", "ZaloPay", "VNPAY", "Crypto"],
    datasets: [
      {
        data: [25, 20, 15, 12, 10, 8, 8, 2],
        backgroundColor: [
          "rgba(124, 58, 237, 0.7)", // Purple (COD)
          "rgba(6, 182, 212, 0.7)",  // Cyan (Credit)
          "rgba(236, 72, 153, 0.7)", // Pink (Bank)
          "rgba(59, 130, 246, 0.7)", // Blue (Momo)
          "rgba(238, 77, 45, 0.7)",  // Orange (ShopeePay)
          "rgba(16, 185, 129, 0.7)", // Green (ZaloPay)
          "rgba(0, 90, 170, 0.7)",   // Dark Blue (VNPAY)
          "rgba(247, 147, 26, 0.7)",  // Gold (Crypto)
        ],
        borderColor: [
          "#7C3AED",
          "#06B6D4",
          "#EC4899",
          "#3B82F6",
          "#EE4D2D",
          "#10B981",
          "#005AAA",
          "#F7931A",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"polarArea"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        grid: {
          color: "rgba(0, 0, 0, 0.03)",
        },
        angleLines: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          display: false,
        },
        pointLabels: {
          display: false,
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1500,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#1f2937",
        titleFont: { size: 13, weight: "bold" },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            return ` ${label}: ${value}%`;
          },
        },
      },
    },
  };

  const toggleDataset = (index: number) => {
    const chart = chartRef.current;
    if (chart) {
      chart.toggleDataVisibility(index);
      chart.update();

      setHiddenIndices(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    }
  };

  const methodIcons: Record<string, string> = {
    "COD": "account_balance_wallet",
    "Credit Card": "credit_card",
    "Bank Transfer": "account_balance",
    "Momo": "smartphone",
    "ZaloPay": "qr_code_2",
    "ShopeePay": "local_mall",
    "VNPAY": "account_balance_wallet",
    "Crypto": "currency_bitcoin"
  };

  return (
    <Card className="col-span-12 lg:col-span-4 row-span-2 flex flex-col border-2 border-gray-200 shadow-xl" hoverable={false}>
      <ChartHeader
        title="Payment Pulse"
        actions={
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase">
            Unique View
          </span>
        }
      />

      {/* Chart Display Area */}
      <div className="relative h-64 w-full mb-6 flex items-center justify-center p-4">
        <PolarArea ref={chartRef} data={data} options={options} />
      </div>

      {/* Custom Interactive Legend */}
      <div className="flex-1 px-2 pb-4">
        <div className="grid grid-cols-1 gap-2">
          {data.labels?.map((label, i) => {
            const isHidden = hiddenIndices.includes(i);
            const bgColor = (data.datasets[0].backgroundColor as string[])[i];
            const borderColor = (data.datasets[0].borderColor as string[])[i];
            const value = data.datasets[0].data[i];

            return (
              <button
                key={label as string}
                onClick={() => toggleDataset(i)}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-300 group ${isHidden
                  ? "grayscale opacity-50 border-transparent bg-gray-50/50"
                  : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md active:scale-95 shadow-sm"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}
                    style={{ backgroundColor: isHidden ? "#d1d5db" : borderColor }}
                  >
                    <Icon name={methodIcons[label as string]} size="sm" />
                  </div>
                  <div className="text-left">
                    <span className={`block text-sm font-bold transition-colors ${isHidden ? "line-through text-gray-400" : "text-gray-800"
                      }`}>
                      {label as string}
                    </span>
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
                      Processing
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className={`text-sm font-black ${isHidden ? "text-gray-400" : "text-gray-900"}`}>
                    {value}%
                  </span>
                  <div className={`w-full h-1 rounded-full bg-gray-100 overflow-hidden`}>
                    <div
                      className="h-full transition-all duration-1000"
                      style={{
                        width: isHidden ? "0%" : `${value}%`,
                        backgroundColor: borderColor
                      }}
                    ></div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default PaymentMethodChart;
