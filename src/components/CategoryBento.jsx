import React from "react";

const CategoryBento = ({ category, isAnimating = false }) => {
  if (!category) return null;

  const handleClick = (link) => {
    if (link) window.open(link, "_blank");
  };

  // Function để get border color dựa trên category id
  const getBorderColor = (categoryId) => {
    const borderColorMap = {
      vn_congnghe_ai: "border-purple-500",
      en_technology_computing: "border-blue-500",
      en_science_genetics: "border-green-500",
      en_science_physics: "border-cyan-500",
      en_science_space: "border-indigo-500",
      en_science_environment: "border-emerald-500",
      en_science_latest: "border-teal-500",
      en_entertainment_movies: "border-red-500",
      en_business_entrepreneurship: "border-orange-500",
      en_business_markets: "border-yellow-500",
    };
    return borderColorMap[categoryId] || "border-gray-500";
  };

  return (
    <div
      className={`bg-white rounded-2xl p-6 h-full flex flex-col border-l-4 shadow-lg ${getBorderColor(
        category.id
      )}`}
    >
      <div
        className={`flex items-center gap-3 mb-6 transition-all duration-300 ${
          isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <category.icon className={`h-8 w-8 ${category.color}`} />
        <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
        <span className="text-sm text-gray-500 ml-auto">
          {category.content.length} articles
        </span>
      </div>

      {category.content.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <category.icon className="h-16 w-16 mx-auto opacity-50" />
            </div>
            <p className="text-gray-500">Không có dữ liệu</p>
            <p className="text-sm text-gray-400 mt-2">Vui lòng thử lại sau</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {category.content.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item.link)}
              className={`flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer group ${
                isAnimating
                  ? "opacity-0 translate-y-8"
                  : "opacity-100 translate-y-0"
              }`}
              style={{
                transitionDelay: isAnimating
                  ? `${(category.content.length - 1 - index) * 100}ms`
                  : "0ms",
              }}
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 line-clamp-3 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                  {item.title.includes(" - ")
                    ? item.title.split(" - ").slice(0, -1).join(" - ")
                    : item.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span>{item.source}</span>
                  {item.time && (
                    <>
                      <span>•</span>
                      <span>
                        {(() => {
                          const dateObj =
                            item.pubDate?.toDate?.() ||
                            (typeof item.pubDate === "string"
                              ? new Date(item.pubDate)
                              : null);
                          if (!dateObj || isNaN(dateObj)) return "—";

                          const diff = Date.now() - dateObj.getTime();

                          const minutes = Math.floor(diff / 60000);
                          if (minutes < 1) return "just now";
                          if (minutes < 60) return `${minutes} min ago`;

                          const hours = Math.floor(minutes / 60);
                          if (hours < 24)
                            return `${hours} hour${hours > 1 ? "s" : ""} ago`;

                          const days = Math.floor(hours / 24);
                          return `${days} day${days > 1 ? "s" : ""} ago`;
                        })()}
                      </span>
                    </>
                  )}
                </div>
                {(item.pubDate || item.createdAt) && (
                  <div className="text-xs text-gray-500">
                    {(() => {
                      const dateObj =
                        item.pubDate?.toDate?.() ||
                        (typeof item.pubDate === "string"
                          ? new Date(item.pubDate)
                          : null) ||
                        item.createdAt?.toDate?.() ||
                        null;

                      return dateObj
                        ? dateObj.toLocaleDateString("vi-VN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—";
                    })()}
                  </div>
                )}
              </div>

              {/* Indicator cho external link */}
              <div className="flex-shrink-0 self-start mt-1">
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBento;
