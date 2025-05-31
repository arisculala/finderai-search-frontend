import React from "react";
import { useTheme } from "@/Context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

interface ThemeSwitcherButtonProps {
  collapsed?: boolean;
  className?: string;
}

const ThemeSwitcherButton: React.FC<ThemeSwitcherButtonProps> = ({ collapsed = false, className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`cursor-pointer flex items-center gap-2 rounded-full p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
      {!collapsed && (
        <span className="text-sm font-medium">
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
};

export default ThemeSwitcherButton;
