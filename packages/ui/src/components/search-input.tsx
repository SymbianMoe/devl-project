'use client';

import { Search, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';

export interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  debounce?: number;
  className?: string;
}

export function SearchInput({
  value: controlledValue,
  onChange,
  onSearch,
  placeholder = 'Search...',
  debounce = 300,
  className,
}: SearchInputProps) {
  const [value, setValue] = useState(controlledValue || '');

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    if (!onSearch) return undefined;

    if (debounce > 0) {
      const timer = setTimeout(() => {
        onSearch(value);
      }, debounce);
      return () => clearTimeout(timer);
    }

    onSearch(value);
    return undefined;
  }, [value, debounce, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setValue('');
    onChange?.('');
    onSearch?.('');
  };

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

SearchInput.displayName = 'SearchInput';
