import React from "react";
import { Youtube, Play } from "lucide-react";

const YouTubeBento = ({ videos, isAnimating = false }) => {
  return (
    <div className="bento-shadow bg-white border-2 border-red-500 rounded-2xl p-6 h-full flex flex-col">
      <div
        className={`flex items-center gap-3 mb-6 transition-all duration-300 ${
          isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <Youtube className="h-8 w-8 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-900">
          Latest YouTube Videos
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer group ${
              isAnimating
                ? "opacity-0 translate-y-8"
                : "opacity-100 translate-y-0"
            }`}
            style={{
              transitionDelay: isAnimating
                ? `${(videos.length - 1 - index) * 100}ms`
                : "0ms",
            }}
          >
            <div className="relative flex-shrink-0">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-40 h-24 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
                <Play className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">{video.channel}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{video.views}</span>
                <span>•</span>
                <span>{video.uploadTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeBento;
