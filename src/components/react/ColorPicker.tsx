'use client';

import { useState, useRef, useEffect } from 'react';
import { Button, Dialog, DialogTrigger, Popover } from 'react-aria-components';
import {
  themeFromSourceColor,
  applyTheme,
  argbFromHex,
} from '@material/material-color-utilities';

const PRESET_COLORS = [
  { name: '蓝色', color: '#0066CC' },
  { name: '紫色', color: '#6750A4' },
  { name: '粉红', color: '#7D5260' },
  { name: '绿色', color: '#006D3B' },
  { name: '深蓝', color: '#0054A5' },
  { name: '橙色', color: '#BE4D25' },
  { name: '紫红', color: '#9C27B0' },
  { name: '青绿', color: '#00796B' },
];

function argbToRgb(argb: number): string {
  const r = (argb >> 16) & 255;
  const g = (argb >> 8) & 255;
  const b = argb & 255;
  return `${r}, ${g}, ${b}`;
}

function applyThemeColor(hexColor: string, isDark: boolean) {
  const sourceColor = argbFromHex(hexColor);
  const theme = themeFromSourceColor(sourceColor);

  applyTheme(theme, { target: document.body, dark: isDark });

  const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
  const schemeObj = scheme as unknown as Record<string, number>;

  const root = document.documentElement;

  const colorMappings: [string, string][] = [
    ['primary', 'primary'],
    ['onPrimary', 'on-primary'],
    ['primaryContainer', 'primary-container'],
    ['onPrimaryContainer', 'on-primary-container'],
    ['secondary', 'secondary'],
    ['onSecondary', 'on-secondary'],
    ['secondaryContainer', 'secondary-container'],
    ['onSecondaryContainer', 'on-secondary-container'],
    ['tertiary', 'tertiary'],
    ['onTertiary', 'on-tertiary'],
    ['tertiaryContainer', 'tertiary-container'],
    ['onTertiaryContainer', 'on-tertiary-container'],
    ['error', 'error'],
    ['onError', 'on-error'],
    ['errorContainer', 'error-container'],
    ['onErrorContainer', 'on-error-container'],
    ['surface', 'surface'],
    ['onSurface', 'on-surface'],
    ['surfaceVariant', 'surface-variant'],
    ['onSurfaceVariant', 'on-surface-variant'],
    ['surfaceTint', 'surface-tint'],
    ['background', 'background'],
    ['onBackground', 'on-background'],
    ['outline', 'outline'],
    ['outlineVariant', 'outline-variant'],
    ['inverseSurface', 'inverse-surface'],
    ['inverseOnSurface', 'inverse-on-surface'],
    ['inversePrimary', 'inverse-primary'],
  ];

  colorMappings.forEach(([schemeKey, varName]) => {
    const value = schemeObj[schemeKey];
    if (typeof value === 'number') {
      root.style.setProperty(`--md-sys-color-${varName}`, argbToRgb(value));
    }
  });

  root.style.setProperty('--md-source-color', argbToRgb(sourceColor));
}

function getSavedColor(): string {
  return localStorage.getItem('md3-primary-color') || '#0066CC';
}

function saveColor(color: string) {
  localStorage.setItem('md3-primary-color', color);
}

function isDarkMode(): boolean {
  return document.documentElement.classList.contains('dark');
}

interface ColorPickerProps {
  className?: string;
}

export function ColorPicker({ className = '' }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#0066CC');
  const [customColor, setCustomColor] = useState('#0066CC');
  const [isDark, setIsDark] = useState(false);
  const customInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedColor(getSavedColor());
    setCustomColor(getSavedColor());
    setIsDark(isDarkMode());

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          setIsDark(isDarkMode());
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setCustomColor(color);
    applyThemeColor(color, isDark);
    saveColor(color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    applyThemeColor(color, isDark);
    saveColor(color);
  };

  return (
    <DialogTrigger
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <Button
        className={`color-picker-trigger md-icon-button text-[var(--color-md-on-surface-variant)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-md-primary)] rounded-full transition-transform ${className}`}
        aria-label="选择主题颜色"
        onPress={() => setIsOpen(!isOpen)}
      >
        <span className="material-symbols-outlined" id="color-picker-icon">palette</span>
      </Button>
      <Popover className="color-picker-dropdown" placement="bottom end" offset={8}>
        <Dialog className="outline-none">
          <div className="color-picker-header">
            <span className="title-small">主题颜色</span>
            <Button
              className="color-picker-close md-icon-button"
              aria-label="关闭"
              onPress={() => setIsOpen(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </Button>
          </div>

          <div className="color-picker-presets">
            <p className="label-medium preset-label">预设颜色</p>
            <div className="preset-colors" role="listbox" aria-label="预设颜色">
              {PRESET_COLORS.map((preset) => (
                <button
                  key={preset.color}
                  role="option"
                  aria-selected={selectedColor === preset.color}
                  className={`preset-color ${selectedColor === preset.color ? 'selected' : ''}`}
                  style={{ backgroundColor: preset.color }}
                  aria-label={preset.name}
                  onClick={() => handleColorSelect(preset.color)}
                />
              ))}
            </div>
          </div>

          <div className="color-picker-custom">
            <p className="label-medium custom-label">自定义颜色</p>
            <div className="custom-color-wrapper">
              <input
                ref={customInputRef}
                type="color"
                value={customColor}
                onChange={handleCustomColorChange}
                className="custom-color-input"
                aria-label="自定义颜色"
              />
              <span className="custom-color-hex">{customColor.toUpperCase()}</span>
            </div>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
