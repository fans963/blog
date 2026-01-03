import {
  Hct,
  SchemeTonalSpot,
  argbFromHex,
  themeFromSourceColor,
  applyTheme,
  sourceColorFromImage,
} from '@material/material-color-utilities';

/**
 * 从十六进制颜色创建 Material Design 3 主题
 */
export function createThemeFromColor(hexColor: string, isDark: boolean = false) {
  const sourceColor = argbFromHex(hexColor);
  const scheme = new SchemeTonalSpot(Hct.fromInt(sourceColor), isDark, 0.0);

  return {
    colors: {
      // Primary
      primary: scheme.primary,
      onPrimary: scheme.onPrimary,
      primaryContainer: scheme.primaryContainer,
      onPrimaryContainer: scheme.onPrimaryContainer,

      // Secondary
      secondary: scheme.secondary,
      onSecondary: scheme.onSecondary,
      secondaryContainer: scheme.secondaryContainer,
      onSecondaryContainer: scheme.onSecondaryContainer,

      // Tertiary
      tertiary: scheme.tertiary,
      onTertiary: scheme.onTertiary,
      tertiaryContainer: scheme.tertiaryContainer,
      onTertiaryContainer: scheme.onTertiaryContainer,

      // Error
      error: scheme.error,
      onError: scheme.onError,
      errorContainer: scheme.errorContainer,
      onErrorContainer: scheme.onErrorContainer,

      // Surface
      surface: scheme.surface,
      onSurface: scheme.onSurface,
      surfaceVariant: scheme.surfaceVariant,
      onSurfaceVariant: scheme.onSurfaceVariant,
      surfaceTint: scheme.surfaceTint,

      // Background
      background: scheme.background,
      onBackground: scheme.onBackground,

      // Outline
      outline: scheme.outline,
      outlineVariant: scheme.outlineVariant,

      // Inverse
      inverseSurface: scheme.inverseSurface,
      inverseOnSurface: scheme.inverseOnSurface,
      inversePrimary: scheme.inversePrimary,
    },
    scheme,
  };
}

/**
 * 将 ARGB 颜色转换为 RGB 字符串
 */
export function argbToRgbString(argb: number): string {
  const r = (argb >> 16) & 255;
  const g = (argb >> 8) & 255;
  const b = argb & 255;
  return `${r}, ${g}, ${b}`;
}

/**
 * 将主题转换为 CSS 变量
 */
export function themeToCssVariables(theme: ReturnType<typeof createThemeFromColor>) {
  const { colors } = theme;
  const cssVars: Record<string, string> = {};

  // Map all colors to CSS custom properties
  for (const [key, value] of Object.entries(colors)) {
    cssVars[`--md-sys-color-${key}`] = `rgb(${argbToRgbString(value)})`;
  }

  // Add a custom property for the source color
  cssVars['--md-source-color'] = `rgb(${argbToRgbString(colors.primary)})`;

  return cssVars;
}

/**
 * 应用主题到 DOM
 */
export function applyThemeToDom(
  hexColor: string,
  target: HTMLElement = document.body,
  dark: boolean = false
) {
  const sourceColor = argbFromHex(hexColor);
  const theme = themeFromSourceColor(sourceColor);
  applyTheme(theme, { target, dark });
}

// 默认主题颜色（Material Design 3 的默认蓝色）
export const DEFAULT_PRIMARY_COLOR = '#0066CC';
export const DEFAULT_DARK_PRIMARY_COLOR = '#A0C4FF';
