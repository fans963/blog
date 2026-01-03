'use client';

import { useState, useEffect } from 'react';
import { ToggleButton } from 'react-aria-components';

interface ThemeToggleProps {
  className?: string;
}

// 发送消息给 Giscus
function sendGiscusMessage(message: object) {
  const iframe = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement;
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
  }
}

// 派发主题变化事件，供其他组件监听
function dispatchThemeChanged() {
  window.dispatchEvent(new CustomEvent('md3-theme-changed'));
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialIsDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDark(initialIsDark);
    document.documentElement.classList.toggle('dark', initialIsDark);

    // 通知 Giscus 主题变化（延迟执行确保 iframe 已加载）
    const notifyGiscus = () => {
      const theme = initialIsDark ? 'dark' : 'light';
      sendGiscusMessage({
        setConfig: { theme }
      });
    };

    // 尝试多次通知，因为 Giscus iframe 可能还没加载
    notifyGiscus();
    const timeout = setTimeout(notifyGiscus, 500);
    const timeout2 = setTimeout(notifyGiscus, 1500);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    
    // 通知 Giscus 主题变化
    const theme = newIsDark ? 'dark' : 'light';
    sendGiscusMessage({
      setConfig: { theme }
    });
    
    // 派发主题变化事件，让其他组件（如 ColorPicker）可以响应
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
