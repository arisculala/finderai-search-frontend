import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface IconButtonProps {
  icon: IconDefinition;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  active = false,
  collapsed = false,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200
        ${active ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-white" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"}
      `}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className="h-5 w-5" />
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
};

export default IconButton;
