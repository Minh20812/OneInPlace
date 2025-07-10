import React from "react";

const CategoryBento = ({
  category,
  isExpanded = false,
  isAnimating = false,
}) => {
  if (isExpanded) {
    return (
      <div
        className={`bento-shadow bg-white rounded-2xl p-6 h-full flex flex-col border-l-4 ${
          category.id === "tech"
            ? "border-blue-500"
            : category.id === "science"
            ? "border-green-500"
            : category.id === "gaming"
            ? "border-purple-500"
            : category.id === "business"
            ? "border-orange-500"
            : category.id === "education"
            ? "border-indigo-500"
            : "border-pink-500"
        }`}
      >
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-300 ${
            isAnimating
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          <category.icon className={`h-8 w-8 ${category.color}`} />
          <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {category.content.map((item, index) => (
            <div
              key={index}
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
              <div className="flex-shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-32 h-20 object-cover rounded-lg"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{item.source}</p>
                <div className="text-xs text-gray-500">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bento-shadow ${category.bgColor} rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bento-hover-shadow hover:scale-105`}
    >
      <div className="flex flex-col items-center justify-center h-full text-center">
        <category.icon className={`h-8 w-8 ${category.color} mb-3`} />
        <h3 className="text-lg font-semibold text-gray-900">
          {category.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {category.content.length} articles
        </p>
      </div>
    </div>
  );
};

export default CategoryBento;
