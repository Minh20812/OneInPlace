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
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);
  const [cryptoData, setCryptoData] = useState({});
  const [stockData, setStockData] = useState({});
  const [goldData, setGoldData] = useState({
    current_price: 2390,
    change_percent: 0.8,
    change: 0,
    symbol: "XAU/USD",
    name: "Spot Gold",
  });
  const [animationDuration, setAnimationDuration] = useState(60);

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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "crypto & finance", "commodities"),
      (doc) => {
        if (doc.exists()) {
          const docData = doc.data();
          if (docData?.data?.GOLD) {
            setGoldData({
              current_price: docData.data.GOLD.current_price,
              change_percent: docData.data.GOLD.change_percent,
              change: docData.data.GOLD.change,
              symbol: docData.data.GOLD.symbol,
              name: docData.data.GOLD.name,
            });
          }
        }
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "crypto & finance", "cryptocurrencies"),
      (doc) => {
        if (doc.exists()) {
          const docData = doc.data();
          if (docData?.data) {
            setCryptoData(docData.data);
          }
        }
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "crypto & finance", "stock_indices"),
      (doc) => {
        if (doc.exists()) {
          const docData = doc.data();
          if (docData?.data) {
            setStockData(docData.data);
          }
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const createTickerData = () => {
    const baseData = [
      {
        id: "1",
        icon: <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />,
        title: `Gold: ${goldData.current_price.toLocaleString()}`,
        subtitle: `${
          goldData.change_percent >= 0 ? "+" : ""
        }${goldData.change_percent.toFixed(2)}%`,
        backgroundColor: "#FFF8DC",
        textColor: "#B8860B",
      },
    ];

    Object.entries(cryptoData)
      .sort(([, a], [, b]) => a.rank - b.rank)
      .forEach(([key, coin]) => {
        baseData.push({
          id: key,
          icon: <Bitcoin className="w-3 h-3 sm:w-4 sm:h-4" />,
          title: `${coin.symbol}: $${coin.current_price.toLocaleString()}`,
          subtitle: `${
            coin.change_percent >= 0 ? "+" : ""
          }${coin.change_percent.toFixed(2)}%`,
          backgroundColor: coin.change_percent >= 0 ? "#E8F5E8" : "#FFE5E5",
          textColor: coin.change_percent >= 0 ? "#2E7D32" : "#D32F2F",
        });
      });

    Object.entries(stockData).forEach(([key, stock]) => {
      baseData.push({
        id: key,
        icon: <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />,
        title: `${stock.symbol}: ${stock.current_price.toLocaleString()}`,
        subtitle: `${
          stock.change_percent >= 0 ? "+" : ""
        }${stock.change_percent.toFixed(2)}%`,
        backgroundColor: stock.change_percent >= 0 ? "#E8F5E8" : "#FFE5E5",
        textColor: stock.change_percent >= 0 ? "#2E7D32" : "#D32F2F",
      });
    });
    return baseData;
  };

  const tickerData = createTickerData();

  const duplicatedData = [...tickerData];

  useEffect(() => {
    const itemCount = tickerData.length;
    const calculatedDuration = Math.max(20, Math.min(30, itemCount * 3));
    setAnimationDuration(calculatedDuration);
  }, [tickerData.length]);

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
          <div
            className="flex animate-scroll-fast gap-1 py-1 px-2"
            style={{ animationDuration: `${animationDuration}s` }}
          >
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
              <div
                className="flex animate-scroll-fast gap-1 py-1 px-2"
                style={{ animationDuration: `${animationDuration}s` }}
              >
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
              <div
                className="flex animate-scroll-fast gap-2 py-1 px-3"
                style={{ animationDuration: `${animationDuration}s` }}
              >
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
