'use client';

import type { SearchFieldProps } from 'react-aria-components';
import { SearchField as ReactAriaSearchField, Input } from 'react-aria-components';
import { forwardRef } from 'react';

interface SearchFieldPropsEx extends Omit<SearchFieldProps, 'children'> {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldPropsEx>(
  (
    {
      placeholder = '搜索...',
      value,
      onChange,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`header-search ${className}`}>
        <span className="material-symbols-outlined search-icon">search</span>
        <ReactAriaSearchField
          {...props}
          ref={ref}
          value={value}
          onChange={onChange}
          className="w-full"
        >
          <Input
            className="search-input"
            placeholder={placeholder}
          />
        </ReactAriaSearchField>
      </div>
    );
  }
);

SearchField.displayName = 'SearchField';
