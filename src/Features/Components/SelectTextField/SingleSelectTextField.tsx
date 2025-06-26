import React, { useState, useEffect, useRef } from 'react';

export interface SelectOption {
  label: string;
  value: string;
}

interface SingleSelectTextFieldProps {
  data: SelectOption[];
  label?: string;
  placeholder?: string;
  value?: SelectOption | null;
  onChange?: (selected: SelectOption | null) => void;
}

const SingleSelectTextField: React.FC<SingleSelectTextFieldProps> = ({
  data,
  label = '',
  placeholder = 'Type to search...',
  value = null,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredData, setFilteredData] = useState<SelectOption[]>(data);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lower = inputValue.toLowerCase();
    setFilteredData(
      data.filter(item =>
        item.label.toLowerCase().includes(lower)
      )
    );
    setHighlightIndex(0);
  }, [inputValue, data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (dropdownRef.current && highlightIndex >= 0) {
      const items = dropdownRef.current.querySelectorAll('li');
      const highlightedItem = items[highlightIndex] as HTMLElement;
      if (highlightedItem) {
        highlightedItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightIndex]);

  const handleSelect = (item: SelectOption) => {
    onChange?.(item);
    setInputValue(item.label);
    setShowDropdown(false);
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

  return (
    <div className="w-full max-w-md relative" ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        type="text"
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowDropdown(true);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowDropdown(true)}
      />

      {showDropdown && filteredData.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-md dark:border-gray-600 dark:bg-gray-800"
        >
          {filteredData.map((item, index) => (
            <li
              key={item.value}
              onClick={() => handleSelect(item)}
              className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
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

export default SingleSelectTextField;
