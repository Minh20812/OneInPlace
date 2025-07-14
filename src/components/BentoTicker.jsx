import {
  Bitcoin,
  Coins,
  Newspaper,
  TrendingUp,
  Zap,
  Globe,
  DollarSign,
  BarChart3,
  Smartphone,
  Cpu,
} from "lucide-react";

const tickerData = [
  {
    id: "1",
    icon: <DollarSign className="w-4 h-4" />,
    title: "Gold: $2,390.50",
    subtitle: "+0.8%",
    backgroundColor: "#FFF8DC",
    textColor: "#B8860B",
  },
  {
    id: "2",
    icon: <Bitcoin className="w-4 h-4" />,
    title: "BTC: $67,245",
    subtitle: "+2.1%",
    backgroundColor: "#FFE5B4",
    textColor: "#FF8C00",
  },
  {
    id: "3",
    icon: <Coins className="w-4 h-4" />,
    title: "ETH: $3,456",
    subtitle: "+1.5%",
    backgroundColor: "#E0F7FA",
    textColor: "#00ACC1",
  },
  {
    id: "4",
    icon: <Newspaper className="w-4 h-4" />,
    title: "Breaking: Fed signals rate cuts ahead",
    subtitle: "2 min ago",
    backgroundColor: "#FFEBEE",
    textColor: "#E91E63",
  },
  {
    id: "5",
    icon: <TrendingUp className="w-4 h-4" />,
    title: "S&P 500: 4,567.89",
    subtitle: "+0.3%",
    backgroundColor: "#F3E5F5",
    textColor: "#9C27B0",
  },
  {
    id: "6",
    icon: <Smartphone className="w-4 h-4" />,
    title: "Apple unveils new iPhone features",
    subtitle: "15 min ago",
    backgroundColor: "#E8F5E8",
    textColor: "#4CAF50",
  },
  {
    id: "7",
    icon: <Coins className="w-4 h-4" />,
    title: "SOL: $145.67",
    subtitle: "+4.2%",
    backgroundColor: "#F0E6FF",
    textColor: "#7C4DFF",
  },
  {
    id: "8",
    icon: <BarChart3 className="w-4 h-4" />,
    title: "NASDAQ: 14,234.56",
    subtitle: "+0.7%",
    backgroundColor: "#E3F2FD",
    textColor: "#2196F3",
  },
  {
    id: "9",
    icon: <Cpu className="w-4 h-4" />,
    title: "NVIDIA reports record AI chip sales",
    subtitle: "32 min ago",
    backgroundColor: "#FFF3E0",
    textColor: "#FF9800",
  },
  {
    id: "10",
    icon: <Globe className="w-4 h-4" />,
    title: "Oil: $78.45/barrel",
    subtitle: "-1.2%",
    backgroundColor: "#EFEBE9",
    textColor: "#795548",
  },
  {
    id: "11",
    icon: <Zap className="w-4 h-4" />,
    title: "Tesla stock surges on delivery numbers",
    subtitle: "45 min ago",
    backgroundColor: "#E0F2F1",
    textColor: "#009688",
  },
  {
    id: "12",
    icon: <Coins className="w-4 h-4" />,
    title: "ADA: $0.67",
    subtitle: "+3.8%",
    backgroundColor: "#FCE4EC",
    textColor: "#E91E63",
  },
];

export function BentoTicker() {
  // Duplicate the data to create seamless loop
  const duplicatedData = [...tickerData, ...tickerData];

  return (
    <div className="w-full px-6 py-4 bg-gray-50">
      {/* Main Bento Container */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden relative">
        {/* Bento Header */}
        <div className="px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="font-semibold text-gray-800 text-sm">
              Live Market Data
            </h3>
            <span className="text-xs text-gray-500 ml-auto">
              Real-time updates
            </span>
          </div>
        </div>

        {/* Scrolling Content Area */}
        <div className="relative py-4 bg-white">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="flex animate-scroll gap-3 px-6">
            {duplicatedData.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-sm border border-gray-100 whitespace-nowrap flex-shrink-0 transition-all duration-200 hover:shadow-md hover:scale-105 hover:-translate-y-0.5"
                style={{ backgroundColor: item.backgroundColor }}
              >
                <div
                  className="flex-shrink-0 p-1 rounded-lg bg-white/50"
                  style={{ color: item.textColor }}
                >
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span
                    className="font-semibold text-sm leading-tight"
                    style={{ color: item.textColor }}
                  >
                    {item.title}
                  </span>
                  {item.subtitle && (
                    <span
                      className="text-xs opacity-75 leading-tight"
                      style={{ color: item.textColor }}
                    >
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Footer with Stats */}
        <div className="px-6 py-2 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>12 active feeds</span>
            <span>Last updated: just now</span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
