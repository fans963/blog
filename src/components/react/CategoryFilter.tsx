'use client';

import type { TabListProps, TabPanelProps } from 'react-aria-components';
import { Tabs, TabList, Tab as ReactAriaTab } from 'react-aria-components';
import { forwardRef } from 'react';

interface Category {
  key: string;
  label: string;
  icon?: string;
}

interface CategoryFilterProps {
  categories: Category[];
  defaultSelectedKey?: string;
  selectedKey?: string;
  onSelectionChange?: (key: string) => void;
  className?: string;
}

interface TabProps {
  id?: string;
  children?: React.ReactNode;
  className?: string;
}

function Tab({ id, children, className = '' }: TabProps) {
  return (
    <ReactAriaTab
      id={id}
      className={`category-tab ${className}`}
    >
      {children}
    </ReactAriaTab>
  );
}

export const CategoryFilter = forwardRef<HTMLDivElement, CategoryFilterProps>(
  (
    {
      categories,
      defaultSelectedKey = 'all',
      selectedKey,
      onSelectionChange,
      className = '',
    },
    ref
  ) => {
    const allCategory: Category = {
      key: 'all',
      label: '全部',
      icon: 'apps',
    };

    const allCategories = [allCategory, ...categories];

    return (
      <div className={`category-filter ${className}`} ref={ref}>
        <Tabs
          defaultSelectedKey={defaultSelectedKey}
          selectedKey={selectedKey}
          onSelectionChange={(key) => onSelectionChange?.(key as string)}
        >
          <TabList className="flex flex-wrap gap-3">
            {allCategories.map((category) => (
              <Tab
                key={category.key}
                id={category.key}
                className="category-tab"
              >
                {category.icon && (
                  <span className="material-symbols-outlined">{category.icon}</span>
                )}
                {category.label}
              </Tab>
            ))}
          </TabList>
        </Tabs>

        <style>{`
          .category-filter {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
          }

          .category-tab {
            display: inline-flex;
            align-items: center;
            gap: 0.375rem;
            padding: 0.625rem 1.25rem;
            background: transparent;
            border: 1px solid var(--color-md-outline-variant);
            border-radius: 2rem;
            font-size: 0.875rem;
            color: var(--color-md-on-surface-variant);
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .category-tab .material-symbols-outlined {
            font-size: 18px;
          }

          .category-tab:hover {
            background: var(--color-md-surface-variant);
          }

          .category-tab[data-selected="true"] {
            background: var(--color-md-primary-container);
            border-color: var(--color-md-primary);
            color: var(--color-md-on-primary-container);
          }

          .category-tab[data-focused="true"] {
            outline: 2px solid var(--color-md-primary);
            outline-offset: 2px;
          }
        `}</style>
      </div>
    );
  }
);

CategoryFilter.displayName = 'CategoryFilter';
