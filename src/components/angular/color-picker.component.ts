import { Component, OnInit, OnDestroy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {
  themeFromSourceColor,
  applyTheme,
  argbFromHex,
} from '@material/material-color-utilities';

interface PresetColor {
  name: string;
  color: string;
}

const PRESET_COLORS: PresetColor[] = [
  { name: '蓝色', color: '#0066CC' },
  { name: '紫色', color: '#6750A4' },
  { name: '粉红', color: '#7D5260' },
  { name: '绿色', color: '#006D3B' },
  { name: '深蓝', color: '#0054A5' },
  { name: '橙色', color: '#BE4D25' },
  { name: '紫红', color: '#9C27B0' },
  { name: '青绿', color: '#00796B' },
];

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule],
  template: `
    <button
      mat-icon-button
      [matMenuTriggerFor]="colorMenu"
      aria-label="选择主题颜色"
      class="color-picker-btn"
    >
      <span class="material-symbols-outlined">palette</span>
    </button>

    <mat-menu #colorMenu="matMenu" class="color-picker-menu">
      <div class="color-picker-content" (click)="$event.stopPropagation()">
        <div class="color-picker-header">
          <h3 class="color-picker-title">选择主题颜色</h3>
        </div>

        <!-- Preset Colors -->
        <div class="preset-colors">
          <button
            *ngFor="let preset of presetColors"
            class="preset-color-btn"
            [style.background-color]="preset.color"
            [attr.aria-label]="preset.name"
            [class.active]="currentColor() === preset.color"
            (click)="selectColor(preset.color)"
            mat-button
          >
            <span *ngIf="currentColor() === preset.color" class="material-symbols-outlined check-icon">
              check
            </span>
          </button>
        </div>

        <!-- Custom Color Picker -->
        <div class="custom-color-section">
          <label class="custom-color-label">自定义颜色</label>
          <div class="custom-color-input-wrapper">
            <input
              type="color"
              [value]="currentColor()"
              (input)="onCustomColorInput($event)"
              class="custom-color-input"
            />
            <input
              type="text"
              [value]="currentColor()"
              (input)="onCustomColorTextInput($event)"
              class="custom-color-text"
              placeholder="#0066CC"
              maxlength="7"
            />
          </div>
        </div>
      </div>
    </mat-menu>
  `,
  styles: [`
    .color-picker-btn {
      transition: transform 0.2s;
    }

    .color-picker-btn:hover {
      transform: scale(1.1);
    }

    .color-picker-content {
      padding: 1rem;
      min-width: 280px;
    }

    .color-picker-header {
      margin-bottom: 1rem;
    }

    .color-picker-title {
      font-size: 1rem;
      font-weight: 500;
      margin: 0;
    }

    .preset-colors {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .preset-color-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 48px !important;
      padding: 0 !important;
    }

    .preset-color-btn:hover {
      transform: scale(1.1);
      border-color: rgba(0, 0, 0, 0.2);
    }

    .preset-color-btn.active {
      border-color: rgba(0, 0, 0, 0.4);
      box-shadow: 0 0 0 2px white, 0 0 0 4px currentColor;
    }

    .check-icon {
      color: white;
      font-size: 24px;
      width: 24px;
      height: 24px;
      filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
    }

    .custom-color-section {
      border-top: 1px solid rgba(0, 0, 0, 0.12);
      padding-top: 1rem;
    }

    .custom-color-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .custom-color-input-wrapper {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .custom-color-input {
      width: 48px;
      height: 48px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    .custom-color-text {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid rgba(0, 0, 0, 0.12);
      border-radius: 8px;
      font-family: monospace;
      font-size: 0.875rem;
    }
  `]
})
export class ColorPickerComponent implements OnInit, OnDestroy {
  presetColors = PRESET_COLORS;
  
  // Using signals for reactive state
  currentColor = signal('#0066CC');
  
  private themeChangeListener?: () => void;

  constructor() {
    // Use effect to apply theme when color changes
    effect(() => {
      const color = this.currentColor();
      if (typeof window !== 'undefined') {
        const isDark = document.documentElement.classList.contains('dark');
        this.applyThemeColor(color, isDark);
      }
    });
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      // Load saved color
      const savedColor = localStorage.getItem('themeColor') || '#0066CC';
      this.currentColor.set(savedColor);

      // Listen to theme changes
      this.themeChangeListener = () => {
        const isDark = document.documentElement.classList.contains('dark');
        this.applyThemeColor(this.currentColor(), isDark);
      };
      window.addEventListener('md3-theme-changed', this.themeChangeListener);
    }
  }

  ngOnDestroy() {
    if (this.themeChangeListener && typeof window !== 'undefined') {
      window.removeEventListener('md3-theme-changed', this.themeChangeListener);
    }
  }

  selectColor(color: string) {
    this.currentColor.set(color);
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeColor', color);
    }
  }

  onCustomColorInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectColor(input.value);
  }

  onCustomColorTextInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const color = input.value;
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      this.selectColor(color);
    }
  }

  private applyThemeColor(hexColor: string, isDark?: boolean) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    if (isDark === undefined) {
      isDark = document.documentElement.classList.contains('dark');
    }

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
      ['background', 'background'],
      ['onBackground', 'on-background'],
      ['surface', 'surface'],
      ['onSurface', 'on-surface'],
      ['surfaceVariant', 'surface-variant'],
      ['onSurfaceVariant', 'on-surface-variant'],
      ['outline', 'outline'],
      ['outlineVariant', 'outline-variant'],
      ['shadow', 'shadow'],
      ['scrim', 'scrim'],
      ['inverseSurface', 'inverse-surface'],
      ['inverseOnSurface', 'inverse-on-surface'],
      ['inversePrimary', 'inverse-primary'],
    ];

    colorMappings.forEach(([schemeKey, cssVar]) => {
      const argb = schemeObj[schemeKey];
      if (argb !== undefined) {
        const rgb = this.argbToRgb(argb);
        root.style.setProperty(`--md-sys-color-${cssVar}`, rgb);
      }
    });
  }

  private argbToRgb(argb: number): string {
    const r = (argb >> 16) & 255;
    const g = (argb >> 8) & 255;
    const b = argb & 255;
    return `${r}, ${g}, ${b}`;
  }
}
