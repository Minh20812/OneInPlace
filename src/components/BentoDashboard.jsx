import React, { useEffect, useState } from "react";
import {
  Youtube,
  Monitor,
  Beaker,
  TrendingUp,
  Film,
  Atom,
  Rocket,
  Leaf,
  FlaskConical,
  Briefcase,
  BarChart3,
  Brain,
  Map,
  Globe,
  Newspaper,
  BrainCircuit,
  Network,
  Dna,
  PawPrint,
} from "lucide-react";
import YouTubeBento from "./YouTubeBento";
import CategoryBento from "./CategoryBento";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../utils/firebase.js";
import { getTimeAgo } from "../utils/date.js";

// Helper functions để map icon và color cho từng category
const getIconByCategory = (categoryId) => {
  const iconMap = {
    vn_congnghe_ai: Brain,
    vn_vietnam: Map,
    vn_thegioi: Globe,
    vnexpress: Newspaper,

    en_technology_computing: Monitor,
    en_technology_internet: Network,
    en_technology_ai: BrainCircuit,

    en_science_genetics: Dna,
    en_science_physics: Atom,
    en_science_space: Rocket,
    en_science_environment: Leaf,
    en_science_wildlife: PawPrint,
    en_science_latest: FlaskConical,

    en_entertainment_movies: Film,

    en_business_entrepreneurship: Briefcase,
    en_business_markets: BarChart3,
    en_world: Globe,

    hackernews: TrendingUp,
  };
  return iconMap[categoryId] || Beaker;
};

const getColor = (categoryId) => {
  const colorMap = {
    // Vietnamese
    vn_congnghe_ai: "text-purple-600",
    vn_vietnam: "text-red-600",
    vn_thegioi: "text-blue-600",
    vnexpress: "text-neutral-600",

    // English - Technology
    en_technology_computing: "text-blue-600",
    en_technology_internet: "text-sky-600",
    en_technology_ai: "text-purple-600",

    // English - Science
    en_science_genetics: "text-green-600",
    en_science_physics: "text-cyan-600",
    en_science_space: "text-indigo-600",
    en_science_environment: "text-emerald-600",
    en_science_wildlife: "text-lime-600",
    en_science_latest: "text-teal-600",

    // Entertainment
    en_entertainment_movies: "text-red-600",

    // Business
    en_business_entrepreneurship: "text-orange-600",
    en_business_markets: "text-yellow-600",

    // World / News
    en_world: "text-blue-600",
    hackernews: "text-amber-600",
  };
  return colorMap[categoryId] || "text-gray-600";
};

const getBgColor = (categoryId) => {
  const bgColorMap = {
    // Vietnamese
    vn_congnghe_ai: "bg-purple-50",
    vn_vietnam: "bg-red-50",
    vn_thegioi: "bg-blue-50",
    vnexpress: "bg-neutral-50",

    // English - Technology
    en_technology_computing: "bg-blue-50",
    en_technology_internet: "bg-sky-50",
    en_technology_ai: "bg-purple-50",

    // English - Science
    en_science_genetics: "bg-green-50",
    en_science_physics: "bg-cyan-50",
    en_science_space: "bg-indigo-50",
    en_science_environment: "bg-emerald-50",
    en_science_wildlife: "bg-lime-50",
    en_science_latest: "bg-teal-50",

    // Entertainment
    en_entertainment_movies: "bg-red-50",

    // Business
    en_business_entrepreneurship: "bg-orange-50",
    en_business_markets: "bg-yellow-50",

    // World / News
    en_world: "bg-blue-50",
    hackernews: "bg-amber-50",
  };
  return bgColorMap[categoryId] || "bg-gray-50";
};

const getCategoryTitle = (categoryId) => {
  const titleMap = {
    // 🇻🇳 Vietnamese categories
    vn_congnghe_ai: "🤖 AI VN",
    vn_vietnam: "🇻🇳 Việt Nam",
    vn_thegioi: "🌍 Thế giới",
    vnexpress: "📰 VnExpress",

    // 💻 Tech
    en_technology_computing: "💻 Computing",
    en_technology_internet: "🌐 Internet",
    en_technology_ai: "🧠 AI",

    // 🔬 Science
    en_science_genetics: "🧬 Genetics",
    en_science_physics: "⚛️ Physics",
    en_science_space: "🚀 Space",
    en_science_environment: "🌱 Enviro",
    en_science_wildlife: "🐾 Wildlife",
    en_science_latest: "🧪 Science+",

    // 🎬 Entertainment
    en_entertainment_movies: "🎬 Movies",

    // 💼 Business
    en_business_entrepreneurship: "💡 Startup",
    en_business_markets: "📈 Markets",

    // 🌐 General
    en_world: "🌍 World",
    hackernews: "💻 HackerNews",
  };
  return titleMap[categoryId] || "📁 Mục khác";
};

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === activeCategory || isAnimating) return;

    setIsAnimating(true);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      setActiveCategory(categoryId);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoryIds = [
          "vn_congnghe_ai",
          "vn_vietnam",
          "vn_thegioi",
          "vnexpress",
          "en_technology_computing",
          "en_technology_internet",
          "en_technology_ai",
          "en_science_genetics",
          "en_science_physics",
          "en_science_space",
          "en_science_environment",
          "en_science_wildlife",
          "en_science_latest",
          "en_entertainment_movies",
          "en_business_entrepreneurship",
          "en_business_markets",
          "en_world",
          "hackernews",
        ];

        const promises = categoryIds.map(async (id) => {
          try {
            const q = query(
              collection(db, id),
              orderBy("pubDate", "desc")
              // limit(10)
            );
            const snapshot = await getDocs(q);
            const content = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                title: data.title,
                time: getTimeAgo(data.pubDate),
                link: data.link,
                source: data.source || "Unknown Source",
                pubDate: data.pubDate,
              };
            });

            return {
              id,
              title: getCategoryTitle(id),
              icon: getIconByCategory(id),
              color: getColor(id),
              bgColor: getBgColor(id),
              content,
            };
          } catch (error) {
            console.error(`Error fetching data for ${id}:`, error);
            return {
              id,
              title: getCategoryTitle(id),
              icon: getIconByCategory(id),
              color: getColor(id),
              bgColor: getBgColor(id),
              content: [],
            };
          }
        });

        const results = await Promise.all(promises);
        setCategoriesData(results);
      } catch (error) {
        console.error("Error fetching categories data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Tìm category data từ Firestore hoặc fallback
  const getActiveData = () => {
    if (activeCategory === "youtube") {
      return {
        title: "Latest YouTube Videos",
        content: youtubeVideos,
        isYoutube: true,
      };
    }

    const firestoreCategory = categoriesData.find(
      (c) => c.id === activeCategory
    );
    if (firestoreCategory) {
      return firestoreCategory;
    }

    // Fallback nếu không tìm thấy data
    return {
      id: activeCategory,
      title: getCategoryTitle(activeCategory),
      icon: getIconByCategory(activeCategory),
      color: getColor(activeCategory),
      bgColor: getBgColor(activeCategory),
      content: [],
    };
  };

  const activeData = getActiveData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Header />

        {/* Mobile Category Selector */}
        <div className="lg:hidden mb-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            <div className="flex items-center justify-center mb-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="font-semibold text-gray-900"
              >
                {isMobileMenuOpen ? "Hide" : "Show"} Categories
              </button>
            </div>

            {isMobileMenuOpen && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeCategory !== "youtube" && (
                  <div
                    className="bg-red-50 border-2 border-red-200 rounded-xl p-3 cursor-pointer transition-all duration-200 hover:shadow-md"
                    onClick={() => handleCategoryClick("youtube")}
                  >
                    <div className="flex flex-col items-center text-center">
                      <Youtube className="h-6 w-6 text-red-500 mb-2" />
                      <span className="text-sm font-medium text-gray-900">
                        YouTube
                      </span>
                    </div>
                  </div>
                )}

                {categoriesData
                  .filter((category) => category.id !== activeCategory)
                  .map((category) => (
                    <div
                      key={category.id}
                      className={`${category.bgColor} rounded-xl p-3 cursor-pointer transition-all duration-200 hover:shadow-md`}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <div className="flex flex-col items-center text-center">
                        <category.icon
                          className={`h-6 w-6 ${category.color} mb-2`}
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {category.title}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden lg:flex gap-6 h-[calc(100vh-9rem)]">
          {/* Left Side - Main Content */}
          <div
            className={`flex-1 transition-all duration-500 ease-in-out ${
              isAnimating
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
          >
            {activeCategory === "youtube" ? (
              <YouTubeBento videos={youtubeVideos} isAnimating={isAnimating} />
            ) : (
              <CategoryBento category={activeData} isAnimating={isAnimating} />
            )}
          </div>

          {/* Right Side - Category Grid */}
          <div className="w-120 grid grid-cols-3 gap-4 auto-rows-fr">
            {activeCategory !== "youtube" && (
              <div
                className={`bg-white border-2 border-red-500 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  isAnimating ? "opacity-50" : "opacity-100"
                }`}
                onClick={() => handleCategoryClick("youtube")}
              >
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Youtube className="h-8 w-8 text-red-500 mb-3" />
                  <h3 className="text-base font-semibold text-gray-900">
                    YouTube
                  </h3>
                </div>
              </div>
            )}

            {categoriesData
              .filter((category) => category.id !== activeCategory)
              .map((category) => (
                <div
                  key={category.id}
                  className={`${
                    category.bgColor
                  } rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    isAnimating ? "opacity-50" : "opacity-100"
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <category.icon
                      className={`h-8 w-8 ${category.color} mb-3`}
                    />
                    <h3 className="text-base font-semibold text-gray-900">
                      {category.title}
                    </h3>
                    {/* <p className="text-sm text-gray-500 mt-1">
                      {category.content.length} articles
                    </p> */}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Mobile/Tablet Content */}
        <div className="lg:hidden">
          <div
            className={`transition-all duration-500 ease-in-out ${
              isAnimating
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
          >
            {activeCategory === "youtube" ? (
              <YouTubeBento videos={youtubeVideos} isAnimating={isAnimating} />
            ) : (
              <CategoryBento category={activeData} isAnimating={isAnimating} />
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default BentoDashboard;
