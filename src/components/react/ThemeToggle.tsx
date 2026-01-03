'use client';

import { useState, useEffect } from 'react';
import { ToggleButton } from 'react-aria-components';
import { dispatchThemeChanged } from './ColorPicker';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialIsDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDark(initialIsDark);
    document.documentElement.classList.toggle('dark', initialIsDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    // 通知 ColorPicker 重新应用颜色
    dispatchThemeChanged();
  };

  return (
    <ToggleButton
      isSelected={isDark}
      onPress={toggleTheme}
      className={`md-icon-button text-[var(--color-md-on-surface-variant)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-md-primary)] rounded-full transition-colors ${className}`}
      aria-label="切换主题"
    >
      <span className="material-symbols-outlined theme-icon transition-transform duration-200">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </ToggleButton>
  );
}
