'use client';

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface CollapsibleContainerProps {
  headerText: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
  className?: string;
}

const CollapsibleContainer: React.FC<CollapsibleContainerProps> = ({
  headerText,
  icon,
  children,
  initiallyExpanded = true,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`border rounded-lg shadow-sm bg-white border-gray-200 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 ${className}`}
    >
      <div
        onClick={toggleExpand}
        className="flex items-center justify-between px-4 py-2 cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        <div className="flex items-center gap-2">
          {icon && <span>{icon}</span>}
          <h3 className="font-medium">{headerText}</h3>
        </div>
        {isExpanded ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        )}
      </div>

      {isExpanded && (
        <div className="px-4 py-3 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleContainer;
