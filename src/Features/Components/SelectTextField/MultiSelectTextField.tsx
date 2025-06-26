import React, { useState, useEffect, useRef } from 'react';

export interface SelectOption {
  label: string;
  value: string;
}

interface MultiSelectTextFieldProps {
  data: SelectOption[];
  label?: string;
  placeholder?: string;
  onChange?: (selected: SelectOption[]) => void;
}

const MultiSelectTextField: React.FC<MultiSelectTextFieldProps> = ({
  data,
  label = '',
  placeholder = 'Type to search...',
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<SelectOption[]>([]);
  const [filteredData, setFilteredData] = useState<SelectOption[]>(data);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredData(data.filter(item => !selectedItems.some(sel => sel.value === item.value)));
    } else {
      const lower = inputValue.toLowerCase();
      setFilteredData(
        data.filter(
          item =>
            item.label.toLowerCase().includes(lower) &&
            !selectedItems.some(sel => sel.value === item.value)
        )
      );
    }
    setHighlightIndex(0);
  }, [inputValue, data, selectedItems]);

  useEffect(() => {
    onChange?.(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: SelectOption) => {
    setSelectedItems(prev => [...prev, item]);
    setInputValue('');
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const handleRemove = (item: SelectOption) => {
    setSelectedItems(prev => prev.filter(i => i.value !== item.value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % filteredData.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev === 0 ? filteredData.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredData[highlightIndex]) {
        handleSelect(filteredData[highlightIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (dropdownRef.current && highlightIndex >= 0) {
      const items = dropdownRef.current.querySelectorAll('li');
      const highlightedItem = items[highlightIndex] as HTMLElement;
      if (highlightedItem) {
        highlightedItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightIndex]);

  return (
    <div className="w-full max-w-md relative" ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div
        className="flex flex-wrap items-center gap-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500"
        onClick={() => {
          setShowDropdown(true);
          inputRef.current?.focus();
        }}
      >
        {selectedItems.map((item) => (
          <span
            key={item.value}
            className="flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100"
          >
            {item.label}
            <button
              type="button"
              className="text-xs text-blue-700 dark:text-blue-300"
              onClick={() => handleRemove(item)}
            >
              ✕
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="flex-grow bg-transparent border-none focus:outline-none text-sm text-gray-800 dark:text-gray-200"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowDropdown(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
        />
      </div>

      {showDropdown && filteredData.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-md dark:border-gray-600 dark:bg-gray-800"
        >
          {filteredData.map((item, index) => (
            <li
              key={item.value}
              onClick={() => handleSelect(item)}
              className={`cursor-pointer px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                highlightIndex === index ? 'bg-blue-100 dark:bg-blue-600' : ''
              }`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectTextField;
