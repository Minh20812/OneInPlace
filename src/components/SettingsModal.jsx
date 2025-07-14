import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function SettingsModal({ isOpen, onClose, darkMode, toggleDarkMode }) {
  const audioRef = useRef(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Cài đặt</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Other Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Khác</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Tự động phát nhạc</span>
                <Button variant="outline" size="sm">
                  Bật
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Hiệu ứng âm thanh</span>
                <Button variant="outline" size="sm">
                  Tắt
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Chế độ tối</span>
                <Button variant="outline" size="sm" onClick={toggleDarkMode}>
                  {darkMode ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <Button onClick={onClose} className="w-full">
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
}
