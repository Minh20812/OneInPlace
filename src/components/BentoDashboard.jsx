import React, { useState } from "react";
import {
  Youtube,
  Monitor,
  Beaker,
  Gamepad2,
  TrendingUp,
  BookOpen,
  Music,
  Plane,
} from "lucide-react";
import YouTubeBento from "./YouTubeBento";
import CategoryBento from "./CategoryBento";

const categories = [
  {
    id: "tech",
    title: "Tech News",
    icon: Monitor,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    content: [
      {
        title: "OpenAI Launches GPT-5",
        source: "TechCrunch",
        time: "2 hours ago",
        thumbnail:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop",
      },
      {
        title: "Apple Vision Pro Update",
        source: "The Verge",
        time: "4 hours ago",
        thumbnail:
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
      },
      {
        title: "Meta AI Breakthrough",
        source: "Wired",
        time: "6 hours ago",
        thumbnail:
          "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: "science",
    title: "Science News",
    icon: Beaker,
    color: "text-green-600",
    bgColor: "bg-green-50",
    content: [
      {
        title: "New Mars Discovery",
        source: "NASA",
        time: "1 hour ago",
        thumbnail:
          "https://images.unsplash.com/photo-1614728894747-a83421adfc4e?w=300&h=200&fit=crop",
      },
      {
        title: "Quantum Computing Advance",
        source: "Nature",
        time: "3 hours ago",
        thumbnail:
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop",
      },
      {
        title: "Climate Change Study",
        source: "Science",
        time: "5 hours ago",
        thumbnail:
          "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: "gaming",
    title: "Game News",
    icon: Gamepad2,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    content: [
      {
        title: "New PlayStation Exclusive",
        source: "IGN",
        time: "30 minutes ago",
        thumbnail:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop",
      },
      {
        title: "Steam Deck Updates",
        source: "GameSpot",
        time: "2 hours ago",
        thumbnail:
          "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop",
      },
      {
        title: "Indie Game Awards",
        source: "Polygon",
        time: "4 hours ago",
        thumbnail:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: "business",
    title: "Business",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    content: [
      {
        title: "Stock Market Rally",
        source: "Bloomberg",
        time: "1 hour ago",
        thumbnail:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop",
      },
      {
        title: "Startup Funding Round",
        source: "TechCrunch",
        time: "3 hours ago",
        thumbnail:
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop",
      },
      {
        title: "Economic Forecast",
        source: "Forbes",
        time: "5 hours ago",
        thumbnail:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: "education",
    title: "Education",
    icon: BookOpen,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    content: [
      {
        title: "Online Learning Trends",
        source: "EdTech Hub",
        time: "2 hours ago",
        thumbnail:
          "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
      },
      {
        title: "University Rankings",
        source: "Times Higher Ed",
        time: "4 hours ago",
        thumbnail:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
      },
      {
        title: "STEM Education Reform",
        source: "Education Week",
        time: "6 hours ago",
        thumbnail:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: "music",
    title: "Music",
    icon: Music,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    content: [
      {
        title: "Grammy Winners 2024",
        source: "Rolling Stone",
        time: "1 hour ago",
        thumbnail:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
      },
      {
        title: "New Album Releases",
        source: "Pitchfork",
        time: "3 hours ago",
        thumbnail:
          "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=300&h=200&fit=crop",
      },
      {
        title: "Concert Tour Dates",
        source: "Billboard",
        time: "5 hours ago",
        thumbnail:
          "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=300&h=200&fit=crop",
      },
    ],
  },
];

const youtubeVideos = [
  {
    id: "1",
    title: "Building Beautiful UIs with React and Tailwind CSS",
    channel: "WebDev Pro",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=320&h=180&fit=crop",
    duration: "15:24",
    views: "125K views",
    uploadTime: "2 days ago",
  },
  {
    id: "2",
    title: "The Future of AI in Web Development",
    channel: "Tech Insights",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=320&h=180&fit=crop",
    duration: "22:18",
    views: "89K views",
    uploadTime: "1 week ago",
  },
  {
    id: "3",
    title: "Advanced TypeScript Patterns You Should Know",
    channel: "Code Masters",
    thumbnail:
      "https://images.unsplash.com/photo-1607970875431-593687d8a28f?w=320&h=180&fit=crop",
    duration: "18:47",
    views: "203K views",
    uploadTime: "3 days ago",
  },
  {
    id: "4",
    title: "Creating Smooth Animations with Framer Motion",
    channel: "Animation Hub",
    thumbnail:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=320&h=180&fit=crop",
    duration: "12:35",
    views: "67K views",
    uploadTime: "5 days ago",
  },
  {
    id: "5",
    title: "Next.js 14: Complete Guide to App Router",
    channel: "React Academy",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=320&h=180&fit=crop",
    duration: "28:12",
    views: "156K views",
    uploadTime: "1 week ago",
  },
];

const BentoDashboard = () => {
  const [activeCategory, setActiveCategory] = useState("youtube");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === activeCategory || isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setActiveCategory(categoryId);
      setIsAnimating(false);
    }, 300);
  };

  const activeData =
    activeCategory === "youtube"
      ? {
          title: "Latest YouTube Videos",
          content: youtubeVideos,
          isYoutube: true,
        }
      : categories.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6 h-[calc(100vh-3rem)]">
          {/* Left Side - Main Content */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              isAnimating
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
            style={{ width: "50%" }}
          >
            {activeCategory === "youtube" ? (
              <YouTubeBento videos={youtubeVideos} isAnimating={isAnimating} />
            ) : (
              <CategoryBento
                category={
                  categories.find((c) => c.id === activeCategory) ||
                  categories[0]
                }
                isExpanded={true}
                isAnimating={isAnimating}
              />
            )}
          </div>

          {/* Right Side - Category Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 auto-rows-fr">
            {activeCategory !== "youtube" && (
              <div
                className={`bento-shadow bg-white border-2 border-red-500 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bento-hover-shadow hover:scale-105 ${
                  isAnimating ? "opacity-50" : "opacity-100"
                }`}
                onClick={() => handleCategoryClick("youtube")}
              >
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Youtube className="h-8 w-8 text-red-500 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    YouTube
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Latest Videos</p>
                </div>
              </div>
            )}

            {categories
              .filter((category) => category.id !== activeCategory)
              .map((category) => (
                <div
                  key={category.id}
                  className={`bento-shadow ${
                    category.bgColor
                  } rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bento-hover-shadow hover:scale-105 ${
                    isAnimating ? "opacity-50" : "opacity-100"
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <category.icon
                      className={`h-8 w-8 ${category.color} mb-3`}
                    />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {category.content.length} articles
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoDashboard;
