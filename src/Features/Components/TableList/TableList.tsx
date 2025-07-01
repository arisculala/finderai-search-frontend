import React, { useState, useEffect, type JSX } from "react";
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  TableCellsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

interface TableAction {
  label: string;
  icon?: JSX.Element;
  onClick: () => void;
  className?: string;
}

interface TableRow {
  [key: string]: any;
  actions?: TableAction[];
}

interface TableProps {
  data: TableRow[];
  headers: string[];
  showHeaderTitle?: boolean;
  headerTitle?: string;
  showHeaderSearch?: boolean;
  icon?: JSX.Element;
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  showActionInEllipses?: boolean;
  showSNo?: boolean;
  showActions?: boolean;
  headerButtonText?: string;
  onHeaderButtonClick?: () => void;
}

const TableList: React.FC<TableProps> = ({
  data = [],
  headers = [],
  showHeaderTitle = true,
  headerTitle,
  showHeaderSearch = true,
  icon = <TableCellsIcon className="w-4 h-4" />,
  currentPage = 1,
  itemsPerPage = 8,
  onPageChange = () => {},
  showActionInEllipses = false,
  showSNo = true,
  showActions = true,
  headerButtonText,
  onHeaderButtonClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedActions, setExpandedActions] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState<TableRow[]>(data);

  useEffect(() => {
    const filtered = data.filter((row) =>
      headers.some((header) => {
        const value = row[header];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
    setFilteredData(filtered);
  }, [data, headers, searchTerm]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, totalItems);
  const paginatedData = filteredData.slice(startIdx, endIdx);

  const toggleActions = (index: number) => {
    setExpandedActions(expandedActions === index ? null : index);
  };

  const formatHeader = (header: string) =>
    header.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  const renderPageNumbers = () => {
    const pagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    if (endPage - startPage + 1 < pagesToShow) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`cursor-pointer px-3 py-1 rounded-md text-sm ${
          currentPage === page
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        }`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="border rounded-lg overflow-visible bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
      {(showHeaderTitle || showHeaderSearch) && (
        <div className="p-4 flex justify-between items-center bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center gap-4">
            {showHeaderTitle && (
              <div className="flex items-center gap-2 font-medium text-gray-800 dark:text-gray-200">
                {icon}
                <span>{headerTitle || "Table List"}</span>
              </div>
            )}
            {headerButtonText && onHeaderButtonClick && (
              <button
                onClick={onHeaderButtonClick}
                className="cursor-pointer px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                {headerButtonText}
              </button>
            )}
          </div>
          {showHeaderSearch && (
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500"
              />
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto relative">
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {showSNo && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  #
                </th>
              )}
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {formatHeader(header)}
                </th>
              ))}
              {showActions && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  {showSNo && (
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {startIdx + idx + 1}
                    </td>
                  )}
                  {headers.map((header) => (
                    <td
                      key={header}
                      className="px-6 py-4 whitespace-normal text-sm text-gray-700 dark:text-gray-300"
                    >
                      {header === "status" ? (
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            row[header]?.toLowerCase() === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {row[header]}
                        </span>
                      ) : (
                        row[header]
                      )}
                    </td>
                  ))}
                  {showActions && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                      {showActionInEllipses ? (
                        <div className="relative">
                          <button
                            onClick={() => toggleActions(idx)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          >
                            <EllipsisVerticalIcon className="h-5 w-5" />
                          </button>
                          {expandedActions === idx && (
                            <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-700 dark:ring-gray-600">
                              {row.actions?.map((action, i) => (
                                <button
                                  key={i}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick();
                                    setExpandedActions(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                  <div className="flex items-center gap-2">
                                    {action.icon}
                                    {action.label}
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex space-x-2 flex-wrap">
                          {row.actions?.map((action, i) => (
                            <button
                              key={i}
                              onClick={action.onClick}
                              className={`px-3 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
                                action.className ||
                                "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                              }`}
                            >
                              {action.icon}
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length + (showSNo ? 1 : 0) + (showActions ? 1 : 0)}
                  className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalItems > 0 && (
        <div className="px-4 py-3 flex items-center justify-between border-t bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{startIdx + 1}</span> to{" "}
            <span className="font-medium">{endIdx}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="cursor-pointer px-3 py-1 border rounded-md text-sm disabled:opacity-50 bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="cursor-pointer px-3 py-1 border rounded-md text-sm disabled:opacity-50 bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableList;
