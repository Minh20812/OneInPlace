import { useEffect } from "react";
import {
  Bitcoin,
  Coins,
  Newspaper,
  TrendingUp,
  DollarSign,
  BarChart3,
} from "lucide-react";

const tickerData = [
  {
    id: "1",
    icon: <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />,
    title: "Gold: $2,390",
    subtitle: "+0.8%",
    backgroundColor: "#FFF8DC",
    textColor: "#B8860B",
  },
  {
    id: "2",
    icon: <Bitcoin className="w-3 h-3 sm:w-4 sm:h-4" />,
    title: "BTC: $67,245",
    subtitle: "+2.1%",
    backgroundColor: "#FFE5B4",
    textColor: "#FF8C00",
  },
  {
    id: "3",
    icon: <Coins className="w-3 h-3 sm:w-4 sm:h-4" />,
    title: "ETH: $3,456",
    subtitle: "+1.5%",
    backgroundColor: "#E0F7FA",
    textColor: "#00ACC1",
  },
  {
    id: "4",
    icon: <Newspaper className="w-3 h-3 sm:w-4 sm:h-4" />,
    title: "Fed signals rate cuts",
    subtitle: "2m",
    backgroundColor: "#FFEBEE",
    textColor: "#E91E63",
  },
  {
    id: "5",
    icon: <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />,
    title: "S&P: 4,567",
    subtitle: "+0.3%",
    backgroundColor: "#F3E5F5",
    textColor: "#9C27B0",
  },
  {
    id: "6",
    icon: <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />,
    title: "NASDAQ: 14,234",
    subtitle: "+0.7%",
    backgroundColor: "#E3F2FD",
    textColor: "#2196F3",
  },
];

export function Footer() {
  const duplicatedData = [...tickerData, ...tickerData];

  return (
    <>
      <div className="w-full flex justify-center mt-2">
        <div className="w-full max-w-7xl">
          <div className=" rounded-xl sm:rounded-2xl">
            <div className="flex items-center justify-center">
              <div className="w-full">
                <div className="rounded-lg sm:rounded-xl overflow-hidden relative">
                  <div className="absolute left-0 top-0 w-4 sm:w-6 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 w-4 sm:w-6 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                  <div className="flex animate-scroll-fast gap-1 sm:gap-2 py-1 px-2 sm:px-3">
                    {duplicatedData.map((item, index) => (
                      <div
                        key={`${item.id}-${index}`}
                        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg whitespace-nowrap flex-shrink-0 transition-all duration-200 hover:scale-105"
                        style={{ backgroundColor: item.backgroundColor }}
                      >
                        <div
                          className="flex-shrink-0"
                          style={{ color: item.textColor }}
                        >
                          {item.icon}
                        </div>
                        <div className="flex items-center gap-1">
                          <span
                            className="font-medium text-xs sm:text-sm leading-tight"
                            style={{ color: item.textColor }}
                          >
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span
                              className="text-xs sm:text-sm opacity-75 leading-tight"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
