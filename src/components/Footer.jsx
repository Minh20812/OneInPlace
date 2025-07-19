import { useEffect, useState } from "react";
import {
  Bitcoin,
  Coins,
  Newspaper,
  TrendingUp,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";

export function Footer() {
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
    <>
      <div className="w-full flex justify-center mt-2">
        <div className="w-full max-w-7xl">
          <div className=" rounded-xl sm:rounded-2xl">
            <div className="flex items-center justify-center">
              <div className="w-full">
                <div className="rounded-lg sm:rounded-xl overflow-hidden relative">
                  <div className="absolute left-0 top-0 w-4 sm:w-6 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 w-4 sm:w-6 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                  <div
                    className="flex animate-scroll-smooth gap-1 sm:gap-2 py-1 px-2 sm:px-3"
                    style={{ animationDuration: `${animationDuration}s` }}
                  >
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
