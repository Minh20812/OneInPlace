import { useState, useEffect } from "react";
import {
  Settings,
  MessageCircle,
  Bitcoin,
  Coins,
  Newspaper,
  TrendingUp,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsModal } from "@/components/SettingsModal";

const tickerData = [
  {
    id: "1",
    icon: <DollarSign className="w-3 h-3" />,
    title: "Gold: $2,390",
    subtitle: "+0.8%",
    backgroundColor: "#FFF8DC",
    textColor: "#B8860B",
  },
  {
    id: "2",
    icon: <Bitcoin className="w-3 h-3" />,
    title: "BTC: $67,245",
    subtitle: "+2.1%",
    backgroundColor: "#FFE5B4",
    textColor: "#FF8C00",
  },
  {
    id: "3",
    icon: <Coins className="w-3 h-3" />,
    title: "ETH: $3,456",
    subtitle: "+1.5%",
    backgroundColor: "#E0F7FA",
    textColor: "#00ACC1",
  },
  {
    id: "4",
    icon: <Newspaper className="w-3 h-3" />,
    title: "Fed signals rate cuts",
    subtitle: "2m",
    backgroundColor: "#FFEBEE",
    textColor: "#E91E63",
  },
  {
    id: "5",
    icon: <TrendingUp className="w-3 h-3" />,
    title: "S&P: 4,567",
    subtitle: "+0.3%",
    backgroundColor: "#F3E5F5",
    textColor: "#9C27B0",
  },
  {
    id: "6",
    icon: <BarChart3 className="w-3 h-3" />,
    title: "NASDAQ: 14,234",
    subtitle: "+0.7%",
    backgroundColor: "#E3F2FD",
    textColor: "#2196F3",
  },
];

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Duplicate data for seamless loop
  const duplicatedData = [...tickerData, ...tickerData];

  return (
    <div className="bg-white border-b border-gray-200 px-2 mx-auto sm:px-4 lg:px-6 py-2 rounded-2xl mb-2">
      {/* Mobile Layout (< 640px) */}
      <div className="block sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-base font-medium text-gray-900 leading-tight">
                Chào Minh
              </h1>
              <p className="text-xs text-gray-500 leading-tight">
                {formatDate(currentTime)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-right mr-2">
              <div className="text-sm font-mono font-semibold text-gray-900 leading-tight">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-gray-500 leading-tight">VN</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <MessageCircle className="h-4 w-4 text-gray-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Mobile ticker - full width */}
        <div className="rounded-xl overflow-hidden relative">
          <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex animate-scroll-fast gap-1 py-1 px-2">
            {duplicatedData.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center gap-1 px-2 py-1 rounded-lg whitespace-nowrap flex-shrink-0 transition-all duration-200"
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
                    className="font-medium text-xs leading-tight"
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
      </div>

      {/* Tablet Layout (640px - 1023px) */}
      <div className="hidden sm:block lg:hidden">
        <div className="flex items-center justify-between gap-3">
          {/* Left side - Greeting and Time */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div>
              <h1 className="text-base font-medium text-gray-900 leading-tight">
                Chào Minh
              </h1>
              <p className="text-xs text-gray-500 leading-tight">
                {formatDate(currentTime)}
              </p>
            </div>

            <div className="h-6 w-px bg-gray-300"></div>

            <div className="text-right">
              <div className="text-sm font-mono font-semibold text-gray-900 leading-tight">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-gray-500 leading-tight">
                Việt Nam
              </div>
            </div>
          </div>

          {/* Center - Compact Ticker */}
          <div className="flex-1 max-w-md mx-3">
            <div className="rounded-xl overflow-hidden relative">
              <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div className="flex animate-scroll-fast gap-1 py-1 px-2">
                {duplicatedData.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg whitespace-nowrap flex-shrink-0 transition-all duration-200 hover:scale-105"
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
                        className="font-medium text-xs leading-tight"
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
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <MessageCircle className="h-4 w-4 text-gray-600" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout (>= 1024px) */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Greeting and Time */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div>
              <h1 className="text-lg font-medium text-gray-900 leading-tight">
                Chào Minh
              </h1>
              <p className="text-xs text-gray-500 leading-tight">
                {formatDate(currentTime)}
              </p>
            </div>

            <div className="h-6 w-px bg-gray-300"></div>

            <div className="text-right">
              <div className="text-sm font-mono font-semibold text-gray-900 leading-tight">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-gray-500 leading-tight">
                Việt Nam
              </div>
            </div>
          </div>

          {/* Center - Compact Ticker */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="rounded-xl overflow-hidden relative">
              <div className="absolute left-0 top-0 w-6 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 w-6 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div className="flex animate-scroll-fast gap-2 py-1 px-3">
                {duplicatedData.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0 transition-all duration-200 hover:scale-105"
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
                        className="font-medium text-xs leading-tight"
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
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <MessageCircle className="h-4 w-4 text-gray-600" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}
