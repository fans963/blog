'use client';

import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { ColorPicker } from './ColorPicker';

interface NavbarProps {
  active?: 'home' | 'blog' | 'about' | 'welcome' | string;
}

const navItems = [
  { href: '/blog', label: '首页', icon: 'home', key: 'home' },
  { href: '/about', label: '关于', icon: 'person', key: 'about' },
];

export function Navbar({ active = 'home' }: NavbarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="md-nav-bar sticky top-0 z-50">
      <div className="navbar-container">
        <nav className="navbar">
          {/* Logo */}
          <a href="/" className="navbar-logo">
            <div className="logo-icon">
              <span className="material-symbols-outlined text-sm">edit</span>
            </div>
            <span className="logo-text title-medium">My Blog</span>
          </a>

          {/* Nav Items - Hide on very small screens */}
          <div className="navbar-nav">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`nav-link ${
                  active === item.key ? 'nav-link-active' : ''
                }`}
              >
                <span className="material-symbols-outlined text-sm">{item.icon}</span>
                <span className="nav-label label-medium">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            <a
              href="/blog?focus=true"
              className="navbar-icon-btn"
              aria-label="搜索文章"
            >
              <span className="material-symbols-outlined">search</span>
            </a>

            {mounted && <ColorPicker />}
            {mounted && <ThemeToggle />}
          </div>
        </nav>
      </div>

      <style>{`
        .navbar-container {
          width: 100%;
          max-width: 100%;
          padding: 0 1rem;
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          height: 64px;
          width: 100%;
        }

        /* Logo */
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--color-md-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-md-on-primary);
          transition: transform 0.2s ease;
        }

        .navbar-logo:hover .logo-icon {
          transform: scale(1.05);
        }

        .logo-text {
          color: var(--color-md-on-surface);
          white-space: nowrap;
        }

        /* Nav Items */
        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex-shrink: 0;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.75rem;
          border-radius: 9999px;
          color: var(--color-md-on-surface-variant);
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          background: rgba(var(--md-sys-color-on-surface), 0.08);
        }

        .nav-link-active {
          background: var(--color-md-surface-variant);
          color: var(--color-md-on-surface-variant);
        }

        .nav-label {
          white-space: nowrap;
        }

        /* Actions */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex-shrink: 0;
        }

        .navbar-icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-md-on-surface-variant);
          transition: all 0.2s ease;
        }

        .navbar-icon-btn:hover {
          background: rgba(var(--md-sys-color-on-surface), 0.08);
        }

        .navbar-icon-btn:focus {
          outline: none;
        }

        .navbar-icon-btn:focus-visible {
          box-shadow: 0 0 0 2px var(--color-md-primary);
        }

        /* MD Nav Bar */
        .md-nav-bar {
          backdrop-filter: blur(8px);
          background-color: rgba(var(--md-sys-color-surface), 0.85);
        }

        /* Mobile: 360px - 479px */
        @media (max-width: 479px) {
          .navbar {
            gap: 0.375rem;
          }

          .nav-label {
            font-size: 11px;
          }

          .nav-link {
            padding: 0.375rem 0.625rem;
          }

          .navbar-icon-btn {
            width: 36px;
            height: 36px;
          }
        }

        /* Mobile: < 360px */
        @media (max-width: 359px) {
          .navbar {
            gap: 0.25rem;
          }

          .nav-label {
            display: none;
          }

          .nav-link {
            padding: 0.375rem;
          }

          .logo-text {
            display: none;
          }

          .navbar-icon-btn {
            width: 32px;
            height: 32px;
          }

          .navbar-icon-btn .material-symbols-outlined {
            font-size: 18px;
          }
        }

        /* Tablet */
        @media (min-width: 768px) and (max-width: 1023px) {
          .navbar {
            gap: 1rem;
          }
        }

        /* Desktop: >= 1280px */
        @media (min-width: 1280px) {
          .navbar {
            gap: 1.5rem;
          }

          .navbar-container {
            max-width: 1200px;
            margin: 0 auto;
          }
        }

        /* Color Picker Styles */
        .color-picker-trigger {
          position: relative;
        }

        .color-picker-trigger .material-symbols-outlined {
          transition: transform 0.2s ease;
        }

        .color-picker-trigger:hover .material-symbols-outlined {
          transform: scale(1.1);
        }

        .color-picker-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 280px;
          background: var(--color-md-surface);
          border-radius: 1rem;
          box-shadow:
            0 8px 30px rgba(0, 0, 0, 0.12),
            0 4px 12px rgba(0, 0, 0, 0.08),
            0 0 0 1px rgba(0, 0, 0, 0.05);
          padding: 1rem;
          z-index: 100;
          animation: slideIn 0.2s cubic-bezier(0.2, 0, 0, 1);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .color-picker-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--color-md-outline-variant);
        }

        .color-picker-close {
          width: 32px;
          height: 32px;
          color: var(--color-md-on-surface-variant);
        }

        .preset-label,
        .custom-label {
          color: var(--color-md-on-surface-variant);
          margin-bottom: 0.75rem;
        }

        .color-picker-presets {
          margin-bottom: 1.25rem;
        }

        .preset-colors {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }

        .preset-color {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 50%;
          border: 3px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .preset-color:hover {
          transform: scale(1.1);
        }

        .preset-color.selected {
          border-color: var(--color-md-primary);
        }

        .preset-color.selected::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 14px;
          font-weight: bold;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .custom-color-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .custom-color-input {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          padding: 0;
          overflow: hidden;
        }

        .custom-color-input::-webkit-color-swatch-wrapper {
          padding: 0;
        }

        .custom-color-input::-webkit-color-swatch {
          border: none;
          border-radius: 50%;
        }

        .custom-color-hex {
          font-family: 'MapleMono-NF-CN', monospace;
          font-size: 0.875rem;
          color: var(--color-md-on-surface);
          text-transform: uppercase;
        }
      `}</style>
    </header>
  );
}
